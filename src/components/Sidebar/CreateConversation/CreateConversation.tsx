import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useCollectionQuery } from "../../../hooks/useCollectionQuery";
import { firebaseFirestore } from "../../../firebase/firebaseConfig";
import {
  ActionButton,
  CloseButton,
  LoadingMessage,
  ModalContainer,
  ModalHeader,
  UserButton,
  UserList,
  UserName,
  UserProfilePicture,
  ModalBackdrop,
  CheckBox,
} from "./Style";
import { useUserStore } from "../../../hooks";
import { Spinner } from "../../Core";
type CreateConversationProps = {
  theme: string;
  setConversationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateConversation({
  setConversationModalOpen,
  theme,
}: CreateConversationProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { currentUser } = useUserStore();

  const { data, error, loading } = useCollectionQuery(
    "all-users",
    collection(firebaseFirestore, "users")
  );

  const navigate = useNavigate();

  const handleToggle = (uid: string) => {
    if (selected.includes(uid)) {
      setSelected(selected.filter((item) => item !== uid));
    } else {
      setSelected([...selected, uid]);
    }
  };

  const handleCreateConversation = async () => {
    setIsCreating(true);

    const sorted = [...selected, currentUser?.uid].sort();

    const QUERY = query(
      collection(firebaseFirestore, "conversations"),
      where("users", "==", sorted)
    );

    const querySnapshot = await getDocs(QUERY);

    if (querySnapshot.empty) {
      const created = await addDoc(
        collection(firebaseFirestore, "conversations"),
        {
          users: sorted,
          group:
            sorted.length > 2
              ? {
                  admins: [currentUser?.uid],
                  groupName: null,
                  groupImage: null,
                }
              : {},
          updatedAt: serverTimestamp(),
          seen: {},
        }
      );

      setIsCreating(false);

      setConversationModalOpen(false);

      navigate(`/${created.id}`);
    } else {
      setConversationModalOpen(false);

      navigate(`/${querySnapshot.docs[0].id}`);

      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setConversationModalOpen(false);
  };
  return (
    <ModalBackdrop>
      <ModalContainer theme={theme}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <p>Something went wrong</p>
        ) : (
          <div>
            {isCreating && (
              <LoadingMessage>Creating conversation...</LoadingMessage>
            )}

            <ModalHeader theme={theme}>New Conversation</ModalHeader>
            <UserList theme={theme}>
              {data?.docs
                .filter((doc) => doc.data().uid !== currentUser?.uid)
                .map((doc) => (
                  <UserButton
                    theme={theme}
                    key={doc.data().uid}
                    onClick={() => handleToggle(doc.data().uid)}
                  >
                    <CheckBox
                      type="checkbox"
                      style={{ cursor: "pointer" }}
                      checked={selected.includes(doc.data().uid)}
                      readOnly
                    />
                    <UserProfilePicture
                      theme={theme}
                      src={doc.data().profilePicture}
                      alt=""
                    />
                    <UserName theme={theme}>{doc.data().username}</UserName>
                  </UserButton>
                ))}
            </UserList>
            <ActionButton
              theme={theme}
              disabled={selected.length === 0}
              onClick={handleCreateConversation}
            >
              Start conversation
            </ActionButton>
            <CloseButton theme={theme} aria-label="close" onClick={handleClose}>
              <FiX />
            </CloseButton>
          </div>
        )}
      </ModalContainer>
    </ModalBackdrop>
  );
}
