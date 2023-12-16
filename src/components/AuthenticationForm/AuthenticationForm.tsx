import React, { useState, useRef, ChangeEvent } from "react";
import { LuCamera } from "react-icons/lu";
import {
  Button,
  Form,
  FormContainer,
  FormTitle,
  ChangeImageButton,
  Input,
  StyledLink,
  InputWrapper,
  Label,
  FilePickerContainer,
  ImagePreview,
  ImagePreviewContainer,
} from "./Style";
import toast from "react-hot-toast";
import { useUserStore } from "../../library";
import { Navigate } from "react-router-dom";

type AuthenticationFormProps = {
  text: string;
  extraInput: boolean;
  buttonText: string;
  linkText: string;
  linkUrl: string;
  withText: boolean;
  onSubmit: (
    email: string,
    password: string,
    fullName?: string,
    file?: File
  ) => void;
};

export default function AuthenticationForm(props: AuthenticationFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useUserStore();
  const {
    onSubmit,
    buttonText,
    extraInput,
    text,
    linkText,
    linkUrl,
    withText,
  } = props;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setPreview(reader.result as string);
        setFile(selectedFile);
      };
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }
    if (!fullName.trim() && extraInput) {
      toast.error("Please enter your full name.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password needs a minimum of 6 characters.");
      return;
    }
    if (password !== repeatPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    onSubmit(email, password, fullName, file ?? undefined);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <FormContainer>
      {withText && <FormTitle>{text}</FormTitle>}

      <Form onSubmit={handleSubmit}>
        {extraInput && (
          <>
            {preview ? (
              <ImagePreviewContainer>
                <ImagePreview tabIndex={0}>
                  <img src={preview} alt="Profile Preview" />
                </ImagePreview>
                <ChangeImageButton
                  type="button"
                  aria-label="Change your profile picture"
                  onClick={() => setPreview(null)}
                >
                  Change
                </ChangeImageButton>
              </ImagePreviewContainer>
            ) : (
              <FilePickerContainer
                tabIndex={0}
                role="button"
                aria-label="Select your profile picture"
                onClick={() => filePickerRef.current?.click()}
              >
                <label htmlFor="fileupload" aria-hidden="true">
                  <LuCamera />
                </label>
                <Input
                  type="file"
                  name="file"
                  id="fileupload"
                  ref={filePickerRef}
                  accept="image/jpeg, image/png"
                  aria-label="Choose File"
                  onChange={handleFileChange}
                  hidden
                />
              </FilePickerContainer>
            )}
            <InputWrapper>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                type="text"
                id="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </InputWrapper>
          </>
        )}

        <InputWrapper>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="Email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        {extraInput && (
          <InputWrapper>
            <Label htmlFor="repeatPassword">Repeat Password</Label>
            <Input
              type="password"
              id="repeatPassword"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </InputWrapper>
        )}
        <Button type="submit">{buttonText}</Button>
        <StyledLink to={linkUrl}>{linkText}</StyledLink>
      </Form>
    </FormContainer>
  );
}
