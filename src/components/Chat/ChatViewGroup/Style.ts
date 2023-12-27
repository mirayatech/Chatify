import styled from "styled-components";
import { StyledProps, color } from "../../../library";

export const AddMemberButton = styled.div<StyledProps>`
  color: white;
  padding: 3px 5px;
  border-radius: 2px;
  font-size: 0.9rem;
  border: none;
  transition: all 0.2s ease;
  background-color: #6ab627;
  color: white;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #5aa126;
  }
`;
export const Info = styled.div<StyledProps>`
  text-align: center;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
`;

export const Header = styled.div`
  display: flex;
  padding: 20px 0;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: calc(20 / 16 * 1rem);
  @media screen and (max-width: 390px) {
    font-size: calc(18 / 16 * 1rem);
  }
`;
export const Buttons = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled.button`
  top: 10px;
  right: 10px;
  border: none;
  font-size: 0.9rem;
  position: absolute;
  background-color: transparent;
`;

export const Button = styled.button<StyledProps & { isActive?: boolean }>`
  width: 100%;
  padding: 6px;
  font-size: 1rem;
  border: none;
  white-space: nowrap;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  margin: 20px 0;
  transition: all 0.2s ease;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.border : color.darkGreyDark};
  border: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkGreyDark};

  ${({ isActive, theme }) =>
    isActive &&
    `
    color: ${theme === "light" ? color.lightMode.title : color.darkMode.title};
    border: 1px solid ${
      theme === "light" ? color.lightMode.text : color.darkMode.text
    };
  `}

  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.text : color.darkMode.text};
  }

  &:nth-child(2) {
    border-right: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.text : color.darkMode.text};
    border-left: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.text : color.darkMode.text};
  }

  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.text : color.darkMode.text};
  }

  &:hover {
    border: 1px solid
      ${({ theme }) =>
        theme === "light" ? color.lightMode.text : color.darkMode.text};
  }

  @media screen and (max-width: 390px) {
    font-size: 0.85rem;
  }
`;

// MEMBERS

export const MemberContainer = styled.div`
  gap: 25px;
  display: flex;
  flex-direction: column;
`;

export const MemberWrapper = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MemberItem = styled.div<StyledProps>`
  display: flex;
  align-items: center;

  p {
    font-size: 1rem;
    white-space: nowrap;
    color: ${({ theme }) =>
      theme === "light" ? color.lightMode.title : color.darkMode.title};
  }
`;

export const MembersButtons = styled.div<StyledProps>`
  gap: 3px;
  display: flex;
  flex-wrap: wrap;

  justify-content: end;
  button {
    padding: 5px 2px;
    width: 115px;
    border-radius: 2px;
    font-size: 0.9rem;
    border: none;
    transition: all 0.2s ease;
  }
`;

export const LeaveGroupButton = styled.button<StyledProps>`
  background-color: #ff5b3a;
  color: white;
  &:hover {
    background-color: #ef3e15;
  }
`;

export const KickGroupButton = styled.button<StyledProps>`
  background-color: #ff9a00;
  color: white;
  &:hover {
    background-color: #f98a00;
  }
`;

export const MakeAdminButton = styled.button<StyledProps>`
  background-color: #6ab627;
  color: white;
  &:hover {
    background-color: #5aa126;
  }
`;

export const RemooveAdminButton = styled.button<StyledProps>`
  color: white;
  padding: 3px 5px;
  border-radius: 2px;
  font-size: 0.9rem;
  border: none;
  transition: all 0.2s ease;
  background-color: #ff9a00;
  color: white;
  &:hover {
    background-color: #f98a00;
  }
`;

export const AdminBadge = styled.span<StyledProps>`
  font-size: 0.9rem;
  background-color: #daf3ff;
  padding: 2px 8px;
  border-radius: 2px;
  color: #177ead;
`;
