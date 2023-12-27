import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCollectionQuery, useUserStore } from "../../../hooks";
import { firebaseFirestore } from "../../../firebase/firebaseConfig";
import { IMAGE_PROXY } from "../../../library";
import { Wrapper, Text } from "../Style";
import {
  ActionButton,
  CheckBox,
  UserButton,
  UserList,
  UserName,
  UserProfilePicture,
} from "./Style";
import { Modal, Spinner } from "../../Core";

type CreateConversationProps = {
  theme: string;
  isOpen: boolean;
  setConversationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateConversation({
  theme,
  isOpen,
  setConversationModalOpen,
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

  return (
    <Modal
      theme={theme}
      isOpen={isOpen}
      onClose={() => setConversationModalOpen(false)}
      title="Create Conversation"
    >
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <>
          {isCreating && <Spinner />}
          <UserList>
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
                    src={IMAGE_PROXY(doc.data().photoURL)}
                    alt=""
                  />
                  <UserName>{doc.data().displayName}</UserName>
                </UserButton>
              ))}
          </UserList>
          <Wrapper>
            <ActionButton
              theme={theme}
              disabled={selected.length === 0}
              onClick={handleCreateConversation}
            >
              Start conversation
            </ActionButton>
          </Wrapper>
        </>
      )}
    </Modal>
  );
}
