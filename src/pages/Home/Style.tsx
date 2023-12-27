import styled from "styled-components";
import { StyledProps, color } from "../../library";

export const Text = styled.p<StyledProps>`
  font-size: calc(18 / 16 * 1rem);
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const HomeWrapper = styled.div<StyledProps>`
  flex-grow: 1;
  display: none;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === "light"
      ? color.lightMode.chatBackground
      : color.darkMode.chatBackground};

  @media screen and (min-width: 869px) {
    display: flex;
  }
`;
