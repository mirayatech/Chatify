import styled from "styled-components";
import { StyledProps, color } from "../../../library";

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
    theme === "light" ? color.lightMode.title : color.darkMode.title};
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

export const UserProfilePicture = styled.img`
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
      theme === "light" ? color.lightMode.border : color.darkGreyDark};
  }

  &:disabled:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkGreyDark};
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.primaryHoverLight
        : color.darkMode.primaryHoverDark};
  }
`;

export const LoadingMessage = styled.p`
  text-align: center;
`;
