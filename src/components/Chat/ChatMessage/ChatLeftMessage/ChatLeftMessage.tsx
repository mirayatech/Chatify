/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, Fragment } from "react";
import { BsReply } from "react-icons/bs";
import { FiSmile } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import { useTheme, useUserStore } from "../../../../hooks";

import {
  ConversationInfoType,
  MessageItemType,
  ReplyInfoType,
  formatDate,
  formatFileSize,
  splitLinkFromMessage,
} from "../../../../library";
import { FileIcon } from "../../../Media/FileIcon";
import { motion } from "framer-motion";
import {
  AvatarFromId,
  ChatReactionPopUp,
  ChatReactionStatus,
  ChatReplyBadge,
} from "../..";

import {
  LeftMessageActions,
  LeftMessageContainer,
  LeftMessageFile,
  LeftMessageImage,
  LeftMessageRemoved,
  LeftMessageTextLink,
  LeftReplyMessage,
  MessageAvatar,
} from "./Style";

type LeftMessageProps = {
  message: MessageItemType;
  conversation: ConversationInfoType;
  index: number;
  docs: any[];
  replyInfo: ReplyInfoType | null;
  setReplyInfo: (value: ReplyInfoType | null) => void;
};

export function LeftMessage({
  message,
  conversation,
  index,
  docs,
  setReplyInfo,
}: LeftMessageProps) {
  const [isSelectReactionOpen, setIsSelectReactionOpen] = useState(false);
  const { currentUser } = useUserStore();
  const { theme } = useTheme();
  const formattedDate = formatDate(
    message.createdAt.seconds ? message.createdAt.seconds * 1000 : Date.now()
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
      <LeftReplyMessage theme={theme}>
        {!!message.replyTo && (
          <ChatReplyBadge messageId={message.replyTo as string} />
        )}
      </LeftReplyMessage>
      <LeftMessageContainer
        onClick={(event) => {
          if (event.detail === 2 && message.type !== "removed") {
            setReplyInfo(message as ReplyInfoType);
          }
        }}
      >
        {conversation.users.length > 2 && (
          <MessageAvatar onClick={(event) => event.stopPropagation()}>
            {docs[index - 1]?.data()?.sender !== message.sender && (
              <AvatarFromId uid={message.sender} />
            )}
          </MessageAvatar>
        )}
        {message.type === "text" ? (
          <LeftMessageTextLink
            onClick={(event) => event.stopPropagation()}
            title={formattedDate}
            theme={theme}
          >
            {splitLinkFromMessage(message.content).map((item, index) => (
              <Fragment key={index}>
                {typeof item === "string" ? (
                  <p>{item}</p>
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                )}
              </Fragment>
            ))}
          </LeftMessageTextLink>
        ) : message.type === "image" ? (
          <LeftMessageImage>
            <img
              className="image"
              onClick={(event) => {
                event.stopPropagation();
              }}
              title={formattedDate}
              src={message.content}
              alt="image"
            />
          </LeftMessageImage>
        ) : message.type === "file" ? (
          <LeftMessageFile
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
          </LeftMessageFile>
        ) : (
          <LeftMessageRemoved title={formattedDate}>
            Message has been removed
          </LeftMessageRemoved>
        )}
        {message.type !== "removed" && (
          <LeftMessageActions theme={theme}>
            <button
              onClick={(event) => {
                event.preventDefault();
                setIsSelectReactionOpen(true);
              }}
            >
              <FiSmile />
            </button>
            <button
              onClick={(event) => {
                setReplyInfo(message as ReplyInfoType);
                event.stopPropagation();
              }}
            >
              <BsReply />
            </button>
          </LeftMessageActions>
        )}
        {isSelectReactionOpen && theme && (
          <ChatReactionPopUp
            position="left"
            theme={theme}
            isOpen={isSelectReactionOpen}
            setIsOpen={setIsSelectReactionOpen}
            messageId={message.id as string}
            currentReaction={
              message.reactions?.[currentUser?.uid as string] || 0
            }
          />
        )}
        {Object.keys(message.reactions || {}).length > 0 && (
          <ChatReactionStatus message={message} position="left" />
        )}
      </LeftMessageContainer>
    </motion.div>
  );
}
