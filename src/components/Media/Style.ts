import styled from "styled-components";
import { StyledProps, color } from "../../library";

export const Buttons = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button<StyledProps & { isActive?: boolean }>`
  width: 100%;
  padding: 6px;
  font-size: 1rem;
  border: none;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  margin: 20px 0;
  transition: all 0.2s ease;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.border : color.darkGreyDark};
  border: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkGreyDark};

  ${({ isActive, theme }) =>
    isActive &&
    `
    color: ${theme === "light" ? color.lightMode.title : color.darkMode.title};
    border: 1px solid ${
      theme === "light" ? color.lightMode.text : color.darkMode.text
    };
  `}

  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.text : color.darkMode.text};
  }

  &:nth-child(2) {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.text : color.darkMode.text};
  }

  &:hover {
    border: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.text : color.darkMode.text};
  }

  @media screen and (max-width: 390px) {
    font-size: 0.85rem;
  }
`;

// Images

export const Image = styled.img`
  width: 150px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 10px;
  justify-content: center;
  grid-template-columns: repeat(2, 150px);
`;

// Files

export const FileWrapper = styled.a<StyledProps>`
  gap: 10px;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkGreyDark};

  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};

  svg {
    font-size: 1.4rem;
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.title : color.darkMode.title};
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    border-radius: 5px;
    background-color: ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkGreyDark};
  }

  &:hover svg {
    color: ${({ theme }) =>
      theme === "light" ? color.primary : color.primary};
  }
`;

export const FileImage = styled.img`
  width: 25px;
  @media screen and (max-width: 470px) {
    width: 20px;
  }
`;

export const FileName = styled.p`
  font-size: 1rem;
  @media screen and (max-width: 470px) {
    width: 100%;
    font-size: 0.8rem;
  }
`;

export const FileSize = styled.p`
  font-size: 1rem;
  @media screen and (max-width: 470px) {
    font-size: 0.8rem;
  }
`;
export const Info = styled.p`
  width: 340px;
  padding: 24px;
  font-size: 1rem;
  text-align: center;
`;
