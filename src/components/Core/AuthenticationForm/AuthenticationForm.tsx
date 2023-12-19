import React, { useState } from "react";
import {
  Button,
  Form,
  FormContainer,
  FormTitle,
  Input,
  StyledLink,
  InputWrapper,
  Label,
} from "./Style";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../../../hooks";

type AuthenticationFormProps = {
  text: string;
  extraInput: boolean;
  buttonText: string;
  linkText: string;
  linkUrl: string;
  verifyPassword: boolean;

  onSubmit: (
    email: string,
    password: string,
    username?: string,
    file?: File
  ) => void;
};

export default function AuthenticationForm(props: AuthenticationFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [username, setUsername] = useState("");

  const { currentUser } = useUserStore();
  const {
    onSubmit,
    buttonText,
    extraInput,
    text,
    linkText,
    linkUrl,
    verifyPassword,
  } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }
    if (!username.trim() && extraInput) {
      toast.error("Please enter your full name.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password needs a minimum of 6 characters.");
      return;
    }
    if (verifyPassword && password !== repeatPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    onSubmit(email, password, username);
  };

  if (currentUser) return <Navigate to="/" />;

  return (
    <FormContainer>
      <FormTitle>{text}</FormTitle>

      <Form onSubmit={handleSubmit}>
        {extraInput && (
          <InputWrapper>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputWrapper>
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
