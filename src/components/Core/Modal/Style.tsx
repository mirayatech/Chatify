import styled from "styled-components";
import { StyledProps, color } from "../../../library";

export const ModalContainer = styled.div<StyledProps>`
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  position: relative;
  z-index: 1;
  max-height: 500px;
  margin: 0 5px;
  overflow-y: auto;
  background-color: ${({ theme }) =>
    theme === "light" ? color.white : color.darkMode.border};

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme === "light" ? "darkgray" : color.darkGreyDark};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkMode.background};
    border-radius: 0 0 20px 0;
  }
`;

export const ModalHeader = styled.h1<StyledProps>`
  margin: 0;
  font-weight: 400;
  font-size: 1.7rem;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
  text-align: center;
`;

export const CloseButton = styled.button<StyledProps>`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  transition: all 0.2s ease;
  &:hover {
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.title : color.darkMode.title};
  }
`;
