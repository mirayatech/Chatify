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
  max-height: 500px;
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
