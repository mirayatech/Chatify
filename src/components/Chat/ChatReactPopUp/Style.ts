import styled from "styled-components";
import { StyledProps, color } from "../../../library";

export const ChatReactPopUpContainer = styled.div<StyledProps>`
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.background : color.darkMode.background};
`;
