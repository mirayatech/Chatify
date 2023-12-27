import styled from "styled-components";
import { StyledProps, color } from "../../../../library";

const darkGrey = "#3b3b3b";

export const LeftMessageContainer = styled.div`
  gap: 8px;
  display: flex;
  margin: 35px 0;
  align-items: center;
  justify-content: start;
  flex-direction: row;

  .extraMarginBottom {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 480px) {
    margin: 80px 0;
  }
`;

export const LeftMessageImage = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;

  .image {
    width: 200px;
  }
`;

export const LeftReplyMessage = styled.div<StyledProps>`
  gap: 8px;
  display: flex;
  margin-bottom: -40px;
  position: relative;
  align-items: center;
  justify-content: start;
  flex-direction: row-reverse;

  > div {
    padding: 10px;
    line-height: 1.5;

    font-size: 1rem;
    max-width: 600px;
    position: relative;
    border-radius: 10px;
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.text : color.darkMode.text};
    border: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.border : color.darkMode.background};
    background-color: ${({ theme }) =>
      theme === "light" ? "#eaeaea" : "#525252"};
    border-bottom-left-radius: 0;
  }
`;

export const MessageAvatar = styled.div`
  position: relative;
`;

export const LeftMessageTextLink = styled.div<StyledProps>`
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
  padding: 10px;
  line-height: 1.5;
  font-size: 1rem;
  max-width: 600px;
  position: relative;
  border-radius: 10px;
  border: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkMode.border};
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.background : darkGrey};
  box-shadow: 0 1px 3px #00000020;
  border-bottom-left-radius: 0;

  .absolute {
    position: absolute;
  }

  a {
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.title : color.darkMode.title};
  }
`;

export const LeftMessageFile = styled.a<StyledProps>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  text-decoration: none;
  padding: 10px;
  border-radius: 10px;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  border: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkMode.border};
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.background : darkGrey};
  box-shadow: 0 1px 3px #0000001a;

  svg {
    font-size: 1.4rem;
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.title : color.darkMode.title};
    transition: all 0.2s ease;
  }

  &:hover svg {
    color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.primaryHoverLight
        : color.darkMode.primaryHoverDark};
  }

  p {
    margin: 0 10px;
    width: 150px;
    font-size: 1rem;
    overflow: hidden;
    font-weight: 500;
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.text : color.darkMode.text};
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p:last-child {
    font-size: 0.9rem;
  }
`;

export const LeftMessageRemoved = styled.div<StyledProps>`
  padding: 10px;
  border-radius: 10px;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  border: 2px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.text : color.darkMode.text};
  border-bottom-left-radius: 0;
`;

export const LeftMessageActions = styled.div<StyledProps>`
  transition: all 0.2s ease;
  opacity: 0;

  @media screen and (max-width: 1024px) {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }

  button {
    border: none;
    margin: 0 5px;
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.text : color.darkMode.text};
    font-size: 1.5rem;
    transition: all 0.2s ease;
    background-color: transparent;

    &:hover {
      color: ${({ theme }) =>
        theme === "light"
          ? color.lightMode.primaryHoverLight
          : color.darkMode.primaryHoverDark};
    }

    &:first-child {
      font-size: 1.25rem;
    }
  }
`;
