import { doc } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useDocumentQuery } from "../../hooks";

import { ConversationInfoType, ReplyInfoType } from "../../library";
import { firebaseFirestore } from "../../firebase/firebaseConfig";
import { useTheme, useUserStore } from "../../hooks";
import { Grow } from "@mui/material";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Wrapper, MobileHide, ChatWrapper, Text } from "./Style";
import { Spinner } from "../../components/Core";
import { ChatHeader, ChatInputSection, ChatView } from "../../components/Chat";

export default function Chat() {
  const { id } = useParams();
  const { data, loading, error } = useDocumentQuery(
    `conversation-${id}`,
    doc(firebaseFirestore, "conversations", id as string)
  );

  const conversation = data?.data() as ConversationInfoType;
  const { theme } = useTheme();
  const { currentUser } = useUserStore();
  const [replyInfo, setReplyInfo] = useState<ReplyInfoType | null>(null);

  return (
    <Wrapper theme={theme}>
      <MobileHide>
        <Sidebar />
      </MobileHide>
      <ChatWrapper>
        {loading ? (
          <Grow>
            <Spinner />
          </Grow>
        ) : !conversation ||
          error ||
          !conversation.users.includes(currentUser?.uid as string) ? (
          <Text theme={theme}>Conversation does not exist.</Text>
        ) : (
          <>
            <ChatHeader conversation={conversation} />
            <ChatView
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              conversation={conversation}
            />
            <ChatInputSection
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
            />
          </>
        )}
      </ChatWrapper>
    </Wrapper>
  );
}
