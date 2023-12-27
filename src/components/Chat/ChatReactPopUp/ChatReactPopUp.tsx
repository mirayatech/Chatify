import { updateDoc, doc } from "firebase/firestore";
import ClickAwayListener from "react-click-away-listener";
import { useParams } from "react-router-dom";

import "./style.css";
import { useUserStore } from "../../../hooks";
import { firebaseFirestore } from "../../../firebase/firebaseConfig";
import { REACTIONS_UI } from "../../../library";
import { ChatReactPopUpContainer } from "./Style";

type ReactionPopupProps = {
  isOpen: boolean;
  position: "left" | "right";
  setIsOpen: (value: boolean) => void;
  messageId: string;
  currentReaction: number;
  theme: string;
};

export default function ChatReactionPopUp({
  isOpen,
  position,
  setIsOpen,
  messageId,
  currentReaction,
  theme,
}: ReactionPopupProps) {
  const { id: conversationId } = useParams();

  const currentUser = useUserStore((state) => state.currentUser);

  const updateReaction = (value: number) => {
    updateDoc(
      doc(
        firebaseFirestore,
        "conversations",
        conversationId as string,
        "messages",
        messageId
      ),
      {
        [`reactions.${currentUser?.uid}`]: value,
      }
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <ChatReactPopUpContainer
        theme={theme}
        id="popup"
        className={position === "left" ? "popup__left" : "popup__right"}
      >
        {Object.entries(REACTIONS_UI).map(([key, value], index) => (
          <button
            key={key}
            onClick={() => {
              if (index + 1 === currentReaction) updateReaction(0);
              else updateReaction(index + 1);
              setIsOpen(!isOpen);
            }}
            className={index + 1 === currentReaction ? "current-reaction" : ""}
          >
            <img title={key} src={value.gif} alt="" />
          </button>
        ))}
      </ChatReactPopUpContainer>
    </ClickAwayListener>
  );
}
