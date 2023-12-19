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

export const Container = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media screen and (max-width: 565px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  padding: 15px;
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

export const Image = styled.img`
  border-radius: 50%;
  width: 80px;
`;

export const Thick = styled.span`
  font-weight: 600;
  padding-right: 5px;
`;

export const Text = styled.p<StyledProps>`
  line-height: 2;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.title};
  @media screen and (max-width: 565px) {
    font-size: 0.9rem;
  }
`;

export const Info = styled.p`
  margin: 0 auto;
  padding: 0 20px 20px;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  width: 100%;
  @media screen and (max-width: 565px) {
    font-size: 0.9rem;
  }
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
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.primaryHoverLight
        : color.darkMode.primaryHoverDark};
  }
`;

export const ChangePictureButton = styled.button<StyledProps>`
  top: 15px;
  right: 135px;
  display: flex;
  position: absolute;
  text-align: center;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme === "light" ? color.primary : color.primary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.primaryHoverLight
        : color.darkMode.primaryHoverDark};
  }
`;
export const UploadPictureButton = styled.div<StyledProps>`
  top: 15px;
  right: 135px;
  display: flex;
  position: absolute;

  text-align: center;
  color: white;
  border: none;
  padding: 6px;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme === "light" ? color.primary : color.primary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.primaryHoverLight
        : color.darkMode.primaryHoverDark};
  }
`;
