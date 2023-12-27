import styled from "styled-components";
import { StyledProps, color } from "../../../library";

export const ReactionStatus = styled.div<StyledProps>`
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.background : color.darkMode.background};
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
  border: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkMode.border};
  box-shadow: 0 1px 3px #0000001a;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
`;

export const Image = styled.img`
  width: 40px;
  margin-right: 10px;
  border-radius: 50%;
`;

export const Name = styled.p`
  font-weight: 500;
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
`;

export const ReactionImage = styled.img`
  width: 40px;
`;
