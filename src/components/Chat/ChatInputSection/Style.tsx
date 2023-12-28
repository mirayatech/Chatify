import styled from "styled-components";
import { StyledProps, color } from "../../../library";

export const Container = styled.div<StyledProps>`
  display: flex;
  padding: 15px 20px;
  position: relative;
  align-items: center;
  justify-content: center;
  border-top: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkMode.border};
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.background : color.darkMode.background};
`;

export const EmojiPicker = styled.div<StyledProps>`
  position: absolute;
  bottom: 80px;
  left: 10px;

  @media screen and (max-width: 869px) {
    display: none;
  }
`;

export const Form = styled.form`
  gap: 1;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
`;
export const EmojiButton = styled.button<StyledProps>`
  border: none;
  display: flex;
  padding-right: 15px;
  font-size: 1.35rem;
  align-items: center;
  background: transparent;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};

  @media screen and (max-width: 869px) {
    display: none;
  }
`;

export const ImageButton = styled.button<StyledProps>`
  border: none;
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  background: transparent;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
`;

export const FileButton = styled.button<StyledProps>`
  border: none;
  display: flex;
  padding: 0 15px;
  font-size: 1.3rem;
  align-items: center;
  background: transparent;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
`;

export const InputWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  align-items: center;
`;

export const Input = styled.input<StyledProps>`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 30px;
  background-color: ${({ theme }) =>
    theme === "light"
      ? color.lightMode.chatBackground
      : color.darkMode.chatBackground};
  border: 1px solid
    ${({ theme }) =>
      theme === "light"
        ? color.lightMode.chatBackground
        : color.darkMode.chatBackground};

  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};

  ::placeholder {
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.text : color.darkMode.text};
  }
`;

export const CloseButton = styled.button<StyledProps>`
  top: 10px;
  right: 10px;
  border: none;
  position: absolute;
  background-color: transparent;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
`;

export const SendButton = styled.button<StyledProps>`
  border: none;
  display: flex;
  font-size: 1.6rem;
  padding-left: 10px;
  align-items: center;
  background: transparent;
  color: ${({ theme }) => (theme === "light" ? color.primary : color.primary)};
  &:disabled {
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.text : color.darkMode.text};
  }
`;

export const DragFile = styled.div`
  z-index: 5;
  width: 100vw;
  display: flex;
  height: 100vh;
  position: fixed;
  user-select: none;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  transition: all 0.2s ease;

  background-color: #3333331b;
`;

export const Title = styled.div<StyledProps>`
  z-index: 30;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
  font-size: calc(30 / 16 * 1rem);
`;

export const ReplyContainer = styled.div<StyledProps>`
  display: flex;
  position: relative;
  align-items: center;
  padding: 15px 30px;
  justify-content: space-between;

  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.background : color.darkMode.background};
  border-top: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkMode.border};
`;

export const ReplyTitle = styled.div<StyledProps>`
  display: flex;
  font-weight: 500;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
  align-items: baseline;
  padding-bottom: 10px;
  gap: 5px;
  svg {
    font-size: 1.1rem;
  }
`;

export const ReplyText = styled.p<StyledProps>`
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
`;
