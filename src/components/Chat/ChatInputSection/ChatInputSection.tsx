import type {
  ChangeEvent,
  ClipboardEventHandler,
  FormEvent,
  SetStateAction,
} from "react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { ImAttachment } from "react-icons/im";
import { RiImageAddFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  Container,
  Form,
  ImageButton,
  FileButton,
  InputWrapper,
  Input,
  SendButton,
  DragFile,
  Title,
  ReplyContainer,
  ReplyTitle,
  ReplyText,
  CloseButton,
  EmojiButton,
  EmojiPicker,
} from "./Style";
import { useTheme, useUserStore } from "../../../hooks";
import {
  firebaseFirestore,
  firebaseStorage,
} from "../../../firebase/firebaseConfig";
import { ReplyInfoType, formatFileName } from "../../../library";
import { Spinner } from "../../Core";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

type InputHeaderProps = {
  replyInfo: ReplyInfoType | null;
  setReplyInfo: (value: ReplyInfoType | null) => void;
};
export function ChatInputSection({
  replyInfo,
  setReplyInfo,
}: InputHeaderProps) {
  const [inputValue, setInputValue] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const { currentUser } = useUserStore();
  const { id: conversationId } = useParams();
  const { theme } = useTheme();

  const textInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileDragging, setFileDragging] = useState(false);

  type EmojiEvent = {
    unified: string;
  };

  const addEmoji = (emojiEvent: EmojiEvent) => {
    const unicodeSymbols = emojiEvent.unified.split("_");
    const codePoints: number[] = [];
    unicodeSymbols.forEach((symbol) =>
      codePoints.push(parseInt("0x" + symbol))
    );
    const emojiChar = String.fromCodePoint(...codePoints);
    setInputValue(inputValue + emojiChar);
  };

  const updateTimestamp = () => {
    updateDoc(
      doc(firebaseFirestore, "conversations", conversationId as string),
      {
        updatedAt: serverTimestamp(),
      }
    );
  };

  useEffect(() => {
    const handler = () => {
      textInputRef.current?.focus();
    };
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  useEffect(() => {
    textInputRef.current?.focus();
  }, [conversationId]);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (previewFiles.length > 0) {
      setPreviewFiles([]);
      for (let i = 0; i < previewFiles.length; i++) {
        const url = previewFiles[i];
        const res = await fetch(url);
        const blob = await res.blob();
        const file = new File([blob], "image.png", {
          type: res.headers.get("content-type") as string,
        });
        await uploadFile(file);
      }
    } else {
      if (fileUploading) return;
    }

    if (!inputValue.trim()) return;

    setInputValue("");

    const replacedInputValue = ` ${inputValue} `;

    setReplyInfo && setReplyInfo(null);

    addDoc(
      collection(
        firebaseFirestore,
        "conversations",
        conversationId as string,
        "messages"
      ),
      {
        sender: currentUser?.uid,
        content: replacedInputValue.trim(),
        type: "text",
        createdAt: serverTimestamp(),
        replyTo: replyInfo?.id || null,
      }
    );

    updateTimestamp();
  };

  const uploadFile = async (file: File) => {
    try {
      const TWENTY_MB = 1024 * 1024 * 20;

      if (file.size > TWENTY_MB) {
        toast.error("Upload too big. Max 20MB.");
        return;
      }

      setFileUploading(true);

      const fileReference = ref(firebaseStorage, formatFileName(file.name));

      await uploadBytes(fileReference, file);

      const downloadURL = await getDownloadURL(fileReference);

      addDoc(
        collection(
          firebaseFirestore,
          "conversations",
          conversationId as string,
          "messages"
        ),
        {
          sender: currentUser?.uid,
          content: downloadURL,
          type: file.type.startsWith("image") ? "image" : "file",
          file: file.type.startsWith("image")
            ? null
            : {
                name: file.name,
                size: file.size,
              },
          createdAt: serverTimestamp(),
        }
      );

      setFileUploading(false);
      updateTimestamp();
    } catch (error) {
      console.log(error);
      setFileUploading(false);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    uploadFile(file);
  };

  const handlePaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
    const file = event?.clipboardData?.files?.[0];
    if (!file || !file.type.startsWith("image")) return;

    const url = URL.createObjectURL(file);

    setPreviewFiles([...previewFiles, url]);
  };

  useEffect(() => {
    const dragBlurHandler = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setFileDragging(false);
    };

    const dragFocusHandler = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setFileDragging(true);
    };

    const dropFileHandler = async (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setFileDragging(false);

      const items = event?.dataTransfer?.items;
      const files = event?.dataTransfer?.files;

      const selectedFiles = [];

      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item) {
            const entry = item.webkitGetAsEntry();
            if (entry && entry.isFile && files) {
              selectedFiles.push(files[i]);
            }
          }
        }
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        await uploadFile(selectedFiles[i]);
      }
    };

    addEventListener("dragenter", dragFocusHandler);
    addEventListener("dragover", dragFocusHandler);
    addEventListener("dragleave", dragBlurHandler);
    addEventListener("drop", dropFileHandler);

    return () => {
      removeEventListener("dragenter", dragFocusHandler);
      removeEventListener("dragover", dragFocusHandler);
      removeEventListener("dragleave", dragBlurHandler);
      removeEventListener("drop", dropFileHandler);
    };
  }, []);
  return (
    <>
      {fileDragging && (
        <DragFile>
          <Title theme={theme}>Drop file to send</Title>
        </DragFile>
      )}

      {previewFiles.length === 0 && !!replyInfo && (
        <ReplyContainer theme={theme}>
          <div>
            <ReplyTitle theme={theme}>
              <BsFillReplyFill />
              <p>
                Replying
                {currentUser?.uid === replyInfo.sender ? " to yourself" : ""}
              </p>
            </ReplyTitle>
            {replyInfo.type === "text" ? (
              <ReplyText theme={theme}>{replyInfo.content}</ReplyText>
            ) : replyInfo.type === "image" ? (
              <ReplyText theme={theme}>An image</ReplyText>
            ) : replyInfo.type === "file" ? (
              <ReplyText theme={theme}>A file</ReplyText>
            ) : (
              "Message has been removed"
            )}
          </div>

          <CloseButton
            theme={theme}
            onClick={() => setReplyInfo && setReplyInfo(null)}
          >
            <FiX style={{ fontSize: "1rem" }} />
          </CloseButton>
        </ReplyContainer>
      )}
      <Container theme={theme}>
        <EmojiButton theme={theme} onClick={() => setShowEmoji(!showEmoji)}>
          <FaRegSmile />
        </EmojiButton>
        {showEmoji && (
          <EmojiPicker>
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={28}
              onEmojiSelect={addEmoji}
              maxFrequentRows={0}
              theme={theme === "light" ? "light" : "dark"}
            />
          </EmojiPicker>
        )}

        <ImageButton
          theme={theme}
          onClick={() => imageInputRef.current?.click()}
        >
          <RiImageAddFill />
        </ImageButton>
        <input
          ref={imageInputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        <FileButton theme={theme} onClick={() => fileInputRef.current?.click()}>
          <ImAttachment />
        </FileButton>
        <input
          ref={fileInputRef}
          hidden
          className="hidden"
          type="file"
          onChange={handleFileInputChange}
        />

        <Form onSubmit={handleFormSubmit}>
          <InputWrapper>
            <Input
              theme={theme}
              maxLength={1000}
              ref={textInputRef}
              value={inputValue}
              onChange={(event: {
                target: { value: SetStateAction<string> };
              }) => {
                setInputValue(event.target.value);
              }}
              onPaste={handlePaste}
              type="text"
              placeholder="Message..."
            />
          </InputWrapper>
          {fileUploading ? (
            <SendButton>
              <Spinner />
            </SendButton>
          ) : (
            <SendButton
              theme={theme}
              disabled={!inputValue.trim() || fileUploading}
            >
              <HiMiniPaperAirplane />
            </SendButton>
          )}
        </Form>
      </Container>
    </>
  );
}
