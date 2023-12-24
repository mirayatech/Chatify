import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  padding: 20px 30px;
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

export const CloseButton = styled.button`
  top: 10px;
  right: 10px;
  border: none;
  font-size: 0.9rem;
  position: absolute;
  background-color: transparent;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 100%;
  padding: 5px;
  font-size: 1rem;
  font-weight: 500;
  border-left: none;
  border-right: none;
  color: darkgray;
  transition: all 0.2s ease;
  justify-content: space-between;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  :nth-child(2) {
    border-right: 1px solid gray;
    border-left: 1px solid gray;
  }
  :hover {
    background-color: #f3f8ff;
  }
  @media screen and (max-width: 390px) {
    font-size: 0.85rem;
  }
`;

// Images

export const Image = styled.img`
  width: 100px;
`;

export const Grid = styled.div`
  max-width: 500px;
  display: grid;
  padding: 15px;
  gap: 10px;
  grid-template-columns: repeat(3, 100px);
`;

// Files

export const Container = styled.div`
  max-height: 300px;
  overflow-y: scroll;
  max-width: 500px;
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gray;
`;
export const FileWrapper = styled.div`
  display: flex;
`;

export const FileImage = styled.img`
  width: 25px;
  margin-right: 15px;
  @media screen and (max-width: 470px) {
    width: 20px;
  }
`;

export const FileName = styled.p`
  font-size: 1rem;
  margin-right: 50px;
  @media screen and (max-width: 470px) {
    width: 100%;
    font-size: 0.8rem;
  }
`;

export const FileSize = styled.p`
  font-size: 1rem;
  @media screen and (max-width: 470px) {
    font-size: 0.8rem;
  }
`;
export const Info = styled.p`
  width: 340px;
  padding: 24px;
  font-size: 1rem;
  text-align: center;
`;
