/* eslint-disable @typescript-eslint/no-explicit-any */

import { updateDoc, doc } from "firebase/firestore";
import { useState, Fragment } from "react";
import { BsReply } from "react-icons/bs";
import { FiSmile, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useTheme, useUserStore } from "../../../../hooks";
import {
  MessageItemType,
  ReplyInfoType,
  formatDate,
  formatFileSize,
  splitLinkFromMessage,
} from "../../../../library";
import { firebaseFirestore } from "../../../../firebase/firebaseConfig";
import { FileIcon } from "../../../Media/FileIcon";
import { ChatReplyBadge } from "../../ChatReplyBadge";
import { ChatReactionPopUp, ChatReactionStatus } from "../..";
import {
  RightMessageActions,
  RightMessageContainer,
  RightMessageFile,
  RightMessageImage,
  RightMessageRemoved,
  RightMessageTextLink,
  RightReplyMessage,
} from "./Style";
import { IoMdDownload } from "react-icons/io";
type RightMessageProps = {
  message: MessageItemType;
  replyInfo: ReplyInfoType | null;
  setReplyInfo: (value: ReplyInfoType | null) => void;
};

export function ChatRightMessage({ message, setReplyInfo }: RightMessageProps) {
  const [isSelectReactionOpen, setIsSelectReactionOpen] = useState(false);

  const { id: conversationId } = useParams();

  const { currentUser } = useUserStore();
  const { theme } = useTheme();
  const removeMessage = (messageId: string) => {
    updateDoc(
      doc(
        firebaseFirestore,
        "conversations",
        conversationId as string,
        "messages",
        messageId
      ),
      {
        type: "removed",
        file: null,
        content: "",
        reactions: [],
      }
    );
  };

  const formattedDate = formatDate(
    message.createdAt?.seconds ? message.createdAt?.seconds * 1000 : Date.now()
  );
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          translateY: "20px",
          opacity: 0,
        },
        visible: {
          translateY: "0px",
          opacity: 1,
          transition: {
            delay: 0.2,
            type: "spring",
            duration: 0.8,
          },
        },
      }}
    >
      <RightReplyMessage theme={theme} className="rightMessage__reply--badge">
        {!!message.replyTo && (
          <ChatReplyBadge messageId={message.replyTo as string} />
        )}
      </RightReplyMessage>
      <RightMessageContainer
        onClick={(event) => {
          if (event.detail === 2 && message.type !== "removed") {
            setReplyInfo(message as ReplyInfoType);
          }
        }}
      >
        {message.type === "text" ? (
          <RightMessageTextLink
            theme={theme}
            onClick={(event) => event.stopPropagation()}
          >
            {splitLinkFromMessage(message.content).map((item, index) => (
              <Fragment key={index}>
                {typeof item === "string" ? (
                  <span>{item}</span>
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                )}
              </Fragment>
            ))}
          </RightMessageTextLink>
        ) : message.type === "image" ? (
          <RightMessageImage>
            <img
              className="image"
              title={formattedDate}
              src={message.content}
              alt=""
            />
          </RightMessageImage>
        ) : message.type === "file" ? (
          <RightMessageFile
            href={message.content}
            download
            target="_blank"
            rel="noopener noreferrer"
            theme={theme}
            onClick={(event) => event.stopPropagation()}
          >
            <FileIcon
              extension={message.file?.name.split(".").slice(-1)[0] as string}
            />
            <div>
              <p>{message.file?.name}</p>
              <p>{formatFileSize(message.file?.size as number)}</p>{" "}
            </div>
            <IoMdDownload />
          </RightMessageFile>
        ) : (
          <RightMessageRemoved
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
          >
            Message has been removed
          </RightMessageRemoved>
        )}
        {message.type !== "removed" && (
          <RightMessageActions theme={theme}>
            <button
              onClick={(event) => {
                setReplyInfo(message as ReplyInfoType);
                event.stopPropagation();
              }}
            >
              <BsReply />
            </button>

            <button
              onClick={() => setIsSelectReactionOpen(!isSelectReactionOpen)}
            >
              <FiSmile />
            </button>

            <button
              onClick={(event) => {
                removeMessage(message.id as string);
                event.stopPropagation();
              }}
            >
              <FiTrash2 />
            </button>
          </RightMessageActions>
        )}
        {isSelectReactionOpen && theme && (
          <ChatReactionPopUp
            theme={theme}
            position="right"
            isOpen={isSelectReactionOpen}
            setIsOpen={setIsSelectReactionOpen}
            messageId={message.id as string}
            currentReaction={
              message.reactions?.[currentUser?.uid as string] || 0
            }
          />
        )}
        {Object.keys(message.reactions || {}).length > 0 && (
          <ChatReactionStatus message={message} position="right" />
        )}
      </RightMessageContainer>
    </motion.div>
  );
}
