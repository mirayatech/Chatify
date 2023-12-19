import styled from "styled-components";
import { StyledProps, color } from "../../../library";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div<StyledProps>`
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  position: relative;
  z-index: 1;
  max-height: 350px;
  background-color: ${({ theme }) =>
    theme === "light" ? color.white : color.darkMode.border};
`;

export const ModalHeader = styled.h1<StyledProps>`
  margin: 0;
  font-weight: 400;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
  text-align: center;
`;

export const UserList = styled.div<StyledProps>`
  margin-top: 20px;
`;

export const CheckBox = styled.input<StyledProps>`
  margin-right: 20px;
`;

export const UserButton = styled.button<StyledProps>`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  transition: all 0.2s ease;
  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.border : color.lightGreyDark};
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? color.lightGreyLight : color.lightGreyDark};
  }
`;

export const UserProfilePicture = styled.img<StyledProps>`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const UserName = styled.p<StyledProps>`
  margin: 0;
`;

export const ActionButton = styled.button<StyledProps>`
  width: 100%;
  text-align: center;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  background-color: ${({ theme }) =>
    theme === "light" ? color.primary : color.primary};
  transition: all 0.2s ease;
  &:disabled {
    background-color: ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.lightGreyDark};
  }

  &:disabled:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.lightGreyDark};
    // Maintain disabled background color on hover
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.primaryHoverLight
        : color.darkMode.primaryHoverDark};
  }
`;

export const CloseButton = styled.button<StyledProps>`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
`;

export const LoadingMessage = styled.p`
  text-align: center;
`;
