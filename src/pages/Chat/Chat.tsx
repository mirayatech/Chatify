import { doc } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useDocumentQuery } from "../../hooks";

import { ConversationInfoType } from "../../library";
import { firebaseFirestore } from "../../firebase/firebaseConfig";
import { useTheme, useUserStore } from "../../hooks";
import { Grow } from "@mui/material";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Wrapper, MobileHide, ChatWrapper, Text } from "./Style";
import { Spinner } from "../../components/Core";
import { ChatInputSection, ChatView } from "../../components/Chat";

export default function Chat() {
  const { id } = useParams();
  const { data, loading, error } = useDocumentQuery(
    `conversation-${id}`,
    doc(firebaseFirestore, "conversations", id as string)
  );

  const conversation = data?.data() as ConversationInfoType;
  const { theme } = useTheme();
  const { currentUser } = useUserStore();
  const [replyInfo, setReplyInfo] = useState(null);

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
          <Text>Conversation does not exist.</Text>
        ) : (
          <>
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
