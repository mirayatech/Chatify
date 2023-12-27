import {
  arrayUnion,
  collection,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

import { useCollectionQuery } from "../../../hooks";
import {
  ConversationInfoType,
  IMAGE_PROXY,
  SavedUserType,
} from "../../../library";
import { firebaseFirestore } from "../../../firebase/firebaseConfig";
import { Spinner } from "../../Core";

import {
  AddMemberButton,
  Info,
  MemberContainer,
  MemberItem,
  MemberWrapper,
} from "./Style";
import { UserProfilePicture } from "../../Sidebar/CreateConversation/Style";

type AddMembersProps = {
  theme: string;
  conversations: ConversationInfoType;
};

export function AddMembers({ conversations, theme }: AddMembersProps) {
  const { id: conversationId } = useParams();

  const { data, loading, error } = useCollectionQuery(
    `all-users-except-${JSON.stringify(conversations.users)}`,
    query(
      collection(firebaseFirestore, "users"),
      where("uid", "not-in", conversations.users.slice(0, 10))
    )
  );

  const handleAddMember = (uid: string) => {
    updateDoc(
      doc(firebaseFirestore, "conversations", conversationId as string),
      {
        users: arrayUnion(uid),
      }
    );
  };

  if (loading || error) return <Spinner />;

  return (
    <MemberContainer>
      {data?.docs
        ?.map((item) => item.data() as SavedUserType)
        .map((user) => (
          <MemberWrapper key={user.uid}>
            <MemberItem theme={theme}>
              <UserProfilePicture
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                src={IMAGE_PROXY(user.photoURL)}
                alt=""
              />
              <p>{user.displayName}</p>
            </MemberItem>
            <AddMemberButton onClick={() => handleAddMember(user.uid)}>
              Add participants
            </AddMemberButton>
          </MemberWrapper>
        ))}
      {data?.empty && <Info theme={theme}>No more user to add</Info>}
    </MemberContainer>
  );
}
