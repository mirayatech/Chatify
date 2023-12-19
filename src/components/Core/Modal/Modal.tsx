import {
  CloseButton,
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
} from "./Style";
import ClickAwayListener from "react-click-away-listener";
import { FiX } from "react-icons/fi";

type CoreModalProps = {
  theme: string;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const Modal = ({ theme, onClose, title, children }: CoreModalProps) => {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <ModalBackdrop>
        <ModalContainer
          theme={theme}
          onClick={(event) => event.stopPropagation()}
        >
          <ModalHeader theme={theme}>{title}</ModalHeader>
          {children}
          <CloseButton theme={theme} onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalContainer>
      </ModalBackdrop>
    </ClickAwayListener>
  );
};
