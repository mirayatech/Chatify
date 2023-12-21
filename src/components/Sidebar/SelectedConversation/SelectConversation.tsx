import { Skeleton } from "@mui/material";
import { BsCircleFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

import { useLastMessage, useUserStore, useUsersInfo } from "../../../hooks";
import { ConversationInfoType, IMAGE_PROXY } from "../../../library";
import {
  Flex,
  Name,
  LastMessage,
  Notify,
  Relative,
  ImagePrimary,
  ImageSecondary,
  Image,
} from "./Style";

type SelectConversationProps = {
  theme: string | null;
  conversation: ConversationInfoType;
  conversationId: string;
};

export function SelectConversation({
  theme,
  conversation,
  conversationId,
}: SelectConversationProps) {
  const { data: users, loading } = useUsersInfo(conversation.users);
  const currentUser = useUserStore((state) => state.currentUser);

  const filtered = users?.filter((user) => user.id !== currentUser?.uid);

  const { id } = useParams();

  const { data: lastMessage, loading: lastMessageLoading } =
    useLastMessage(conversationId);

  if (loading && theme)
    return (
      <Flex theme={theme}>
        <Skeleton variant="circular" width={65} height={65} sx={{ mr: 1.5 }} />
        <div>
          <Skeleton
            width={100}
            height={15}
            sx={{ mb: 1 }}
            variant="rectangular"
          />
          <Skeleton variant="rectangular" width={140} height={15} />
        </div>
      </Flex>
    );

  // Duo Conversation
  if (conversation.users.length === 2 && theme)
    return (
      <Link to={`/${conversationId}`} style={{ textDecoration: "none" }}>
        <Flex
          theme={theme}
          className={conversationId === id ? "active" : "not-active"}
        >
          <Image src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)} alt="" />
          <div>
            <Name theme={theme}>{filtered?.[0].data()?.displayName}</Name>
            {lastMessageLoading ? (
              <Skeleton width={100} height={15} variant="rectangular" />
            ) : (
              <LastMessage theme={theme}>{lastMessage?.message}</LastMessage>
            )}
          </div>
          {!lastMessageLoading && (
            <>
              {lastMessage?.lastMessageId !== null &&
                lastMessage?.lastMessageId !==
                  conversation.seen[currentUser?.uid as string] && (
                  <Notify>
                    <BsCircleFill />
                  </Notify>
                )}
            </>
          )}
        </Flex>
      </Link>
    );

  // Group Conversation
  return (
    <Link to={`/${conversationId}`} style={{ textDecoration: "none" }}>
      {theme && (
        <Flex
          theme={theme}
          className={conversationId === id ? "active" : "not-active"}
        >
          {conversation?.group?.groupImage ? (
            <Image src={conversation.group.groupImage} alt="" />
          ) : (
            <Relative>
              <ImagePrimary
                className={
                  conversationId === id ? "not-active-border" : "active-border"
                }
                src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)}
                alt=""
              />
              <ImageSecondary
                src={IMAGE_PROXY(filtered?.[1]?.data()?.photoURL)}
                alt=""
              />
            </Relative>
          )}
          <div>
            <Name theme={theme}>
              {conversation?.group?.groupName ||
                filtered
                  ?.map((user) => user.data()?.displayName)
                  .slice(0, 3)
                  .join(", ")}
            </Name>
            {lastMessageLoading ? (
              <Skeleton width={100} height={15} variant="rectangular" />
            ) : (
              <LastMessage theme={theme}> {lastMessage?.message}</LastMessage>
            )}
          </div>
          {!lastMessageLoading && (
            <>
              {lastMessage?.lastMessageId !== null &&
                lastMessage?.lastMessageId !==
                  conversation.seen[currentUser?.uid as string] && (
                  <Notify>
                    <BsCircleFill />
                  </Notify>
                )}
            </>
          )}
        </Flex>
      )}
    </Link>
  );
}
