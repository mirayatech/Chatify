import styled from "styled-components";
import { StyledProps, color } from "../../../library";
import { Link } from "react-router-dom";

export const Header = styled.div<StyledProps>`
  height: 84px;
  display: flex;
  padding: 020px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme === "light" ? color.lightMode.border : color.darkMode.border};
  background-color: ${({ theme }) =>
    theme === "light" ? color.lightMode.background : color.darkMode.background};
`;
export const Name = styled.p<StyledProps>`
  font-weight: 500;
  margin-left: 15px;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.title : color.darkMode.title};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const HomeLink = styled(Link)<StyledProps>`
  display: flex;
  font-size: 1.4rem;
  margin-right: 20px;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
`;

export const SingleImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
export const Relative = styled.div`
  margin: 0 15px;
  position: relative;
  padding-right: 10px;
`;

export const ImagePrimary = styled.img<StyledProps>`
  top: -5px;
  left: -30px;
  z-index: 1;
  width: 30px;
  height: 30px;
  padding: 1px;
  display: flex;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  margin: 0 10px 2px 10px;
  border: double 1px transparent;
  background-clip: content-box, border-box;

  background-image: ${({ theme }) =>
    theme === "light"
      ? `linear-gradient(white, white),
    radial-gradient(circle at 20% 107%, ${color.white} 0%, ${color.white} 60%);`
      : `linear-gradient(white, white),
    radial-gradient(circle at 20% 107%, ${color.darkMode.background}   0%, ${color.darkMode.background}  60%);`};
`;
export const ImageSecondary = styled.img`
  top: -19px;
  left: -8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
`;

export const SettingButton = styled.button<StyledProps>`
  border: none;
  display: flex;
  font-size: 1.5rem;
  margin-left: 30px;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  background-color: transparent;
`;

export const GroupButton = styled.button<StyledProps>`
  border: none;
  display: flex;
  font-size: 2rem;
  margin-left: 30px;
  color: ${({ theme }) =>
    theme === "light" ? color.lightMode.text : color.darkMode.text};
  background-color: transparent;
`;
