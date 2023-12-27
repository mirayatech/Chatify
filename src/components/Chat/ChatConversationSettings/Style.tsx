import styled from "styled-components";
import { StyledProps, color } from "../../../library";

export const Header = styled.div`
  display: flex;
  padding: 20px 20px 0px 20px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  text-align: center;
  width: 340px;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid red;
  font-size: calc(20 / 16 * 1rem);
  @media screen and (max-width: 390px) {
    font-size: calc(18 / 16 * 1rem);
  }
`;

export const CloseButton = styled.button`
  top: 10px;
  right: 10px;
  border: none;
  font-size: 0.9rem;
  position: absolute;
  background-color: transparent;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 10px 0;
`;

export const Button = styled.button<StyledProps>`
  gap: 10px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  border-radius: 4px;
  background-color: transparent;
  margin: 5px 10px;
  padding: 10px;
  border: none;
  transition: all 0.2s ease;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkGreyDark};
  }

  .chevron {
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NameInput = styled.input<StyledProps>`
  border-radius: 4px;
  font-size: 0.95rem;
  border: none;
  width: 100%;
  margin-left: 20px;
  font-weight: 500;
  padding: 6px 12px;
  outline: none;
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.border : color.lightGreyLight};
`;

export const NameButton = styled.button<StyledProps>`
  color: white;
  font-size: 0.8rem;
  border-radius: 4px;
  border: none;
  margin-right: 20px;
  font-weight: 500;
  padding: 7px 12px;
  background-color: ${({ theme }) =>
    theme === "light" ? color.primary : color.primary};

  transition: all 0.2s ease;

  &:disabled {
    background-color: ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkGreyDark};
  }

  &:disabled:hover {
    background-color: ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkGreyDark};
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.primaryHoverLight
        : color.darkMode.primaryHoverDark};
  }
`;
