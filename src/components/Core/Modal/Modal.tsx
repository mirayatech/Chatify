import { Dialog } from "@mui/material";
import { CloseButton, ModalHeader } from "./Style";
import { FiX } from "react-icons/fi";
import { color } from "../../../library";

type CoreModalProps = {
  theme: string;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
};

export const Modal = ({
  theme,
  isOpen,
  onClose,
  title,
  children,
}: CoreModalProps) => {
  const closeModal = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Dialog
      onClose={closeModal}
      open={isOpen}
      PaperProps={{
        style: {
          backgroundColor:
            theme === "light"
              ? color.lightMode.background
              : color.darkMode.background,

          padding: "30px 10px 10px",
          minWidth: "320px",
          maxWidth: "500px",
          maxHeight: "500px",
          margin: "0 5px",
          borderRadius: "10px",
        },
      }}
    >
      <ModalHeader theme={theme}>{title}</ModalHeader>
      {children}
      <CloseButton theme={theme} onClick={onClose}>
        <FiX />
      </CloseButton>
    </Dialog>
  );
};
