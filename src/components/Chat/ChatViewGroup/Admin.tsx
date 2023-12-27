import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useUserStore, useUsersInfo } from "../../../hooks";
import {
  ConversationInfoType,
  IMAGE_PROXY,
  SavedUserType,
} from "../../../library";

import { firebaseFirestore } from "../../../firebase/firebaseConfig";
import { Spinner } from "../../Core";
import toast from "react-hot-toast";
import {
  AdminBadge,
  MemberContainer,
  MemberItem,
  MemberWrapper,
  RemooveAdminButton,
} from "./Style";
import { UserProfilePicture } from "../../Sidebar/CreateConversation/Style";

type AdminProps = {
  theme: string;
  conversation: ConversationInfoType;
};
export function Admin({ conversation, theme }: AdminProps) {
  const { id: conversationId } = useParams();

  const currentUser = useUserStore((state) => state.currentUser);

  const { data, loading, error } = useUsersInfo(
    conversation.group?.admins as string[]
  );

  const handleRemoveAdminPosition = (uid: string) => {
    updateDoc(
      doc(firebaseFirestore, "conversations", conversationId as string),
      {
        "group.admins": arrayRemove(uid),
        "group.groupImage": conversation.group?.groupImage,
        "group.groupName": conversation.group?.groupName,
      }
    );

    toast.success(
      `Done removing ${currentUser?.displayName} from admin position`
    );
  };

  if (loading || error) return <Spinner />;
  return (
    <MemberContainer>
      {data
        ?.map((item) => item.data() as SavedUserType)
        .map((user) => (
          <MemberWrapper key={user.uid}>
            <MemberItem theme={theme}>
              <UserProfilePicture src={IMAGE_PROXY(user.photoURL)} alt="" />
              <p>{user.displayName}</p>
            </MemberItem>

            {conversation.group?.admins?.includes(currentUser?.uid as string) &&
            user.uid !== currentUser?.uid ? (
              <RemooveAdminButton
                onClick={() => handleRemoveAdminPosition(user.uid)}
              >
                Remove admin position
              </RemooveAdminButton>
            ) : (
              <AdminBadge>Admin</AdminBadge>
            )}
          </MemberWrapper>
        ))}
    </MemberContainer>
  );
}
