import styled from "styled-components";
import { StyledProps, color } from "../../library";

export const Wrapper = styled.div<StyledProps>`
  display: flex;
  background-color: ${({ theme }) =>
    theme === "light"
      ? color.lightMode.chatBackground
      : color.darkMode.chatBackground};
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChatWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100vh;
  align-items: stretch;
  flex-direction: column;

  @media screen and (max-width: 480px) {
    height: 88vh;
  }
`;

export const Text = styled.p<StyledProps>`
  font-size: calc(18 / 16 * 1rem);
  margin: auto;
  text-align: center;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
`;

export const Image = styled.img`
  width: 90px;
  margin-bottom: 20px;
`;

export const Line = styled.div`
  height: 80px;
`;

export const Grow = styled.div`
  flex-grow: 1;
`;

export const MobileHide = styled.div`
  display: none;
  @media screen and (min-width: 869px) {
    display: block;
  }
`;
