import styled from "styled-components";
import { StyledProps, color } from "../../../library";

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
