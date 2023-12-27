import type { ChangeEvent, FormEvent } from "react";

import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import {
  FiChevronDown,
  FiEdit,
  FiFile,
  FiLogOut,
  FiCamera,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Button, Form, NameInput, NameButton } from "./Style";
import { ConversationInfoType, formatFileName } from "../../../library";
import { useUserStore } from "../../../hooks";
import {
  firebaseFirestore,
  firebaseStorage,
} from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { Modal } from "../../Core";

type ConversationSettingsProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setMediaViewOpen: (value: boolean) => void;
  conversation: ConversationInfoType;
  theme: string;
};
export function ChatConversationSettings({
  isOpen,
  setIsOpen,
  setMediaViewOpen,
  conversation,
  theme,
}: ConversationSettingsProps) {
  const { id: conversationId } = useParams();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const [isChangeChatNameOpen, setIsChangeChatNameOpen] = useState(false);
  const [chatNameInputValue, setChatNameInputValue] = useState(
    conversation?.group?.groupName || ""
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!chatNameInputValue.trim()) return;
    setIsOpen(false);
    updateDoc(
      doc(firebaseFirestore, "conversations", conversationId as string),
      {
        "group.groupName": chatNameInputValue.trim(),
      }
    );
  };

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;
    if (!file.type.startsWith("image")) {
      toast.error("Only images are allowed");
      return;
    }
    const FIVE_MB = 1024 * 1024 * 5;
    if (file.size > FIVE_MB) {
      toast.error("File size should be less than 5MB");
      return;
    }
    const fileReference = ref(firebaseStorage, formatFileName(file.name));
    await uploadBytes(fileReference, file);
    const downloadURL = await getDownloadURL(fileReference);
    updateDoc(
      doc(firebaseFirestore, "conversations", conversationId as string),
      {
        "group.groupImage": downloadURL,
      }
    );
  };

  const leaveGroup = () => {
    updateDoc(
      doc(firebaseFirestore, "conversations", conversationId as string),
      {
        users: arrayRemove(currentUser?.uid as string),
        "group.admins": arrayRemove(currentUser?.uid as string),
        "group.groupImage": conversation.group?.groupImage,
        "group.groupName": conversation.group?.groupName,
      }
    );

    navigate("/");
  };

  const onSingleMediaClick = () => {
    setMediaViewOpen(true);
    setIsOpen(false);
  };

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      theme={theme}
      title="Conversation settings"
      isOpen={isOpen}
    >
      <Container>
        {conversation.users.length > 2 && (
          <>
            <Button
              theme={theme}
              onClick={() => setIsChangeChatNameOpen((prev) => !prev)}
            >
              <FiEdit />
              Change chat name
              {isChangeChatNameOpen ? (
                <FiChevronDown className="chevron" />
              ) : (
                <FiChevronRight className="chevron" />
              )}
            </Button>
            {isChangeChatNameOpen && (
              <Form onSubmit={handleFormSubmit}>
                <NameInput
                  theme={theme}
                  value={chatNameInputValue}
                  onChange={(event) =>
                    setChatNameInputValue(event.target.value)
                  }
                  type="text"
                  placeholder="Chat name"
                />
                <NameButton
                  theme={theme}
                  disabled={chatNameInputValue.trim().length === 0}
                >
                  Change
                </NameButton>
              </Form>
            )}

            <Button theme={theme} onClick={() => fileInputRef.current?.click()}>
              <FiCamera />
              Change group photo
            </Button>

            <input
              hidden
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </>
        )}

        <Button theme={theme} onClick={onSingleMediaClick}>
          <FiFile /> View images & files
        </Button>

        {conversation.users.length > 2 && (
          <Button theme={theme} onClick={() => leaveGroup()}>
            <FiLogOut /> Leave group
          </Button>
        )}
      </Container>
    </Modal>
  );
}
