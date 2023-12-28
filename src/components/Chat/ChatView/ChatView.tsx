/* eslint-disable @typescript-eslint/no-explicit-any */

import { collection, doc, orderBy, query, updateDoc } from "firebase/firestore";
import { Fragment, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { useCollectionQuery, useTheme, useUserStore } from "../../../hooks";

import { Grow, Text, MiniWrapper, StylesChatView } from "./Style";
import {
  ConversationInfoType,
  MessageItemType,
  ReplyInfoType,
} from "../../../library";
import { firebaseFirestore } from "../../../firebase/firebaseConfig";
import { Spinner } from "../../Core";
import { AvatarFromId, ChatRightMessage, LeftMessage } from "..";

type ChatViewProps = {
  conversation: ConversationInfoType;
  replyInfo: ReplyInfoType | null;
  setReplyInfo: (value: ReplyInfoType | null) => void;
};

export function ChatView({
  conversation,
  replyInfo,
  setReplyInfo,
}: ChatViewProps) {
  const { id: conversationId } = useParams();

  const { currentUser } = useUserStore();
  const { theme } = useTheme();
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useCollectionQuery(
    `conversation-data-${conversationId}`,
    query(
      collection(
        firebaseFirestore,
        "conversations",
        conversationId as string,
        "messages"
      ),
      orderBy("createdAt")
    )
  );

  const dataRef = useRef(data);
  const conversationIdRef = useRef(conversationId);
  const isWindowFocus = useRef(true);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    conversationIdRef.current = conversationId;
  }, [conversationId]);

  useEffect(() => {
    if (isWindowFocus.current) updateSeenStatus();

    scrollBottomRef.current?.scrollIntoView();

    setTimeout(() => {
      scrollBottomRef.current?.scrollIntoView();
    }, 100);
  }, [data?.docs?.slice(-1)?.[0]?.id || ""]);

  const updateSeenStatus = () => {
    if (dataRef.current?.empty) return;

    const lastDoc = dataRef.current?.docs?.slice(-1)?.[0];

    if (!lastDoc) return;

    updateDoc(
      doc(
        firebaseFirestore,
        "conversations",
        conversationIdRef.current as string
      ),
      {
        [`seen.${currentUser?.uid}`]: lastDoc.id,
      }
    );
  };

  useEffect(() => {
    const focusHandler = () => {
      isWindowFocus.current = true;

      updateSeenStatus();
    };

    const blurHandler = () => {
      isWindowFocus.current = false;
    };

    addEventListener("focus", focusHandler);
    addEventListener("blur", blurHandler);

    return () => {
      removeEventListener("focus", focusHandler);
      removeEventListener("blur", blurHandler);
    };
  }, []);

  if (loading)
    return (
      <Grow>
        <Spinner />
      </Grow>
    );

  if (error)
    return (
      <Grow>
        <Text theme={theme}>Something went wrong</Text>
      </Grow>
    );

  if (data?.empty)
    return (
      <Grow>
        <Text theme={theme}>No message recently. Start chatting now.</Text>
      </Grow>
    );

  return (
    <StylesChatView theme={theme}>
      {data?.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as MessageItemType))
        .map((item, index) => (
          <Fragment key={item.id}>
            {item.sender === currentUser?.uid ? (
              <ChatRightMessage
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
                message={item}
              />
            ) : (
              <LeftMessage
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
                message={item}
                index={index}
                docs={data?.docs}
                conversation={conversation}
              />
            )}
            {Object.entries(conversation.seen).filter(
              ([key, value]) => key !== currentUser?.uid && value === item.id
            ).length > 0 && (
              <MiniWrapper>
                {Object.entries(conversation.seen)
                  .filter(
                    ([key, value]) =>
                      key !== currentUser?.uid && value === item.id
                  )
                  .map(([key]) => (
                    <AvatarFromId key={key} uid={key} size={20} />
                  ))}
              </MiniWrapper>
            )}
          </Fragment>
        ))}
      <div ref={scrollBottomRef} />
    </StylesChatView>
  );
}
