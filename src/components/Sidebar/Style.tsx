import styled from "styled-components";
import { StyledProps, color } from "../../library";

export const StyledSideBar = styled.div<StyledProps>`
  width: 100%;
  border-right: none;
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.background : color.darkMode.background};
  @media screen and (min-width: 768px) {
    width: 350px;
    height: 100vh;
    border-right: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.border : color.darkMode.border};
  }
`;

export const StyledNavbar = styled.div<StyledProps>`
  height: 80px;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkMode.border};
`;

export const Wrapper = styled.div<StyledProps>`
  display: flex;
`;

export const ProfileButtonContainer = styled.div`
  position: relative;
`;

export const ProfileButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const ProfileMenu = styled.div<StyledProps>`
  z-index: 1;
  position: absolute;
  top: 70px;
  right: -27px;
  width: 150px;
  background-color: ${({ theme }) =>
    theme === "light" ? color.white : color.darkMode.border};
  border: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.lightGreyDark};
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const ShowProfileButton = styled.button<StyledProps>`
  border: none;
  width: 100%;
  font-size: 1rem;
  padding: 10px 12px;
  transition: all 0.2s ease;
  background-color: transparent;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.navText : color.darkMode.navText};
  &:hover {
    color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.navHoverText
        : color.darkMode.navHoverText};
  }
`;

export const ThemeButton = styled.button<StyledProps>`
  border: none;
  width: 100%;
  font-size: 1rem;
  padding: 10px 12px;
  transition: all 0.2s ease;
  background-color: transparent;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.navText : color.darkMode.navText};
  border-top: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.lightGreyDark};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.lightGreyDark};
  &:hover {
    color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.navHoverText
        : color.darkMode.navHoverText};
  }
`;

export const SignOutButton = styled.button<StyledProps>`
  border: none;
  width: 100%;
  font-size: 1rem;
  padding: 10px 12px;
  transition: all 0.2s ease;
  background-color: transparent;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.navText : color.darkMode.navText};
  &:hover {
    color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.navHoverText
        : color.darkMode.navHoverText};
  }
`;
export const ChatButton = styled.button<StyledProps>`
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  margin-right: 15px;
  border-radius: 10%;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.navText : color.darkMode.navText};
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.border : color.darkMode.border};
  transition: all 0.2s ease;
  :hover {
    color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.navHoverText
        : color.darkMode.navHoverText};
  }
`;

export const ProfilePicture = styled.img`
  width: 50px;
  border-radius: 10%;
`;

export const SecondaryContainer = styled.div<StyledProps>`
  position: relative;
`;

export const PrimaryContainer = styled.div<StyledProps>`
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Text = styled.p<StyledProps>`
  margin: 30px 0;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
`;
export const SelectConversationButton = styled.button<StyledProps>`
  width: 150px;
  border: none;
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  background-color: ${({ theme }) =>
    theme === "light" ? color.primary : color.primary};
  color: ${({ theme }) => (theme === "light" ? color.white : color.white)};

  &:hover {
    background-color: ${({ theme }) =>
      theme === "light"
        ? color.lightMode.primaryHoverLight
        : color.darkMode.primaryHoverDark};
  }
`;
