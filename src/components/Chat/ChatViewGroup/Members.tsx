import { updateDoc, doc, arrayRemove, arrayUnion } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { firebaseFirestore } from "../../../firebase/firebaseConfig";
import { useUserStore, useUsersInfo } from "../../../hooks";
import {
  ConversationInfoType,
  IMAGE_PROXY,
  SavedUserType,
} from "../../../library";
import { Spinner } from "../../Core";
import toast from "react-hot-toast";
import { UserProfilePicture } from "../../Sidebar/CreateConversation/Style";
import {
  KickGroupButton,
  LeaveGroupButton,
  MakeAdminButton,
  MemberContainer,
  MemberItem,
  MemberWrapper,
  MembersButtons,
} from "./Style";

type MembersProps = {
  theme: string;
  conversation: ConversationInfoType;
};

export const Members = ({ conversation, theme }: MembersProps) => {
  const { id: conversationId } = useParams();

  const currentUser = useUserStore((state) => state.currentUser);

  const { data, loading, error } = useUsersInfo(conversation.users);

  const navigate = useNavigate();

  const handleRemoveFromGroup = (uid: string) => {
    if (
      conversation.group?.admins.length === 1 &&
      conversation.group.admins[0] === uid
    ) {
      toast.error("You can't remove the last admin");
    } else {
      updateDoc(
        doc(firebaseFirestore, "conversations", conversationId as string),
        {
          users: arrayRemove(uid),
          "group.admins": arrayRemove(uid),
          "group.groupImage": conversation.group?.groupImage,
          "group.groupName": conversation.group?.groupName,
        }
      );

      if (currentUser?.uid === uid) {
        navigate("/");
      }

      toast.success("Done removing from group");
    }
  };

  const handleMakeAdmin = (uid: string) => {
    updateDoc(
      doc(firebaseFirestore, "conversations", conversationId as string),
      {
        "group.admins": arrayUnion(uid),
        "group.groupImage": conversation.group?.groupImage,
        "group.groupName": conversation.group?.groupName,
      }
    );
    toast.success("Done making admin");
  };

  if (loading || error) return <Spinner />;

  return (
    <div>
      <MemberContainer>
        {data
          ?.map((item) => item.data() as SavedUserType)
          .map((user) => (
            <MemberWrapper key={user.uid}>
              <MemberItem theme={theme}>
                <UserProfilePicture src={IMAGE_PROXY(user.photoURL)} alt="" />
                <p>{user.displayName}</p>
              </MemberItem>

              {conversation.group?.admins?.includes(
                currentUser?.uid as string
              ) && (
                <MembersButtons theme={theme}>
                  {conversation.users.length > 3 &&
                    (user.uid === currentUser?.uid ? (
                      <LeaveGroupButton
                        theme={theme}
                        onClick={() => handleRemoveFromGroup(user.uid)}
                      >
                        Leave group
                      </LeaveGroupButton>
                    ) : (
                      <KickGroupButton
                        theme={theme}
                        onClick={() => handleRemoveFromGroup(user.uid)}
                      >
                        Kick from group
                      </KickGroupButton>
                    ))}
                  {user.uid !== currentUser?.uid && (
                    <MakeAdminButton
                      theme={theme}
                      onClick={() => handleMakeAdmin(user.uid)}
                    >
                      Make an admin
                    </MakeAdminButton>
                  )}
                </MembersButtons>
              )}
            </MemberWrapper>
          ))}
      </MemberContainer>
    </div>
  );
};
