import { lazy } from "react";

export * from "./ChatInputSection/ChatInputSection";
export * from "./ChatReplyBadge";
export * from "./ChatView/ChatView";
export * from "./ChatMessage/ChatRightMessage/ChatRightMessage";
export * from "./ChatMessage/ChatLeftMessage/ChatLeftMessage";
export * from "./ChatAvatarFormId/ChatAvatarFormId";
export * from "./ChatReactionStatus/ChatReactionStatus";
export * from "./ChatConversationSettings/ChatConversationSettings";
export * from "./ChatHeader/ChatHeader";

export const ChatReactionPopUp = lazy(
  () => import("./ChatReactPopUp/ChatReactPopUp")
);
