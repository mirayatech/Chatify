import styled from "styled-components";
import { StyledProps, color } from "../../../library";

export const Grow = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const StylesChatView = styled.div<StyledProps>`
  padding: 20px;
  height: 100%;
  overflow-y: auto;

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

export const Text = styled.p<StyledProps>`
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  font-size: calc(18 / 16 * 1rem);
  @media screen and (max-width: 440px) {
    font-size: 1rem;
  }
`;

export const Image = styled.img`
  width: 90px;
  margin-bottom: 20px;
  @media screen and (max-width: 440px) {
    width: 80px;
  }
`;

export const MiniWrapper = styled.div`
  gap: 1px;
  padding: 0 8px;
  display: flex;
  justify-content: end;
`;
