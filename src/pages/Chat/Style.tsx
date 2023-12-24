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
`;

export const Error = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100vh;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Text = styled.p`
  font-size: calc(18 / 16 * 1rem);
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
  @media screen and (max-width: 868px) {
    display: block;
  }
`;
