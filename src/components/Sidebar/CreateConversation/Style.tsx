import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  position: relative;
  z-index: 1001;
`;

export const ModalHeader = styled.h2`
  margin: 0;
  color: #333;
  text-align: center;
`;

export const UserList = styled.div`
  margin-top: 20px;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 10px;
  border-radius: 5px;

  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }

  &:hover {
    background-color: #efefef;
  }
`;

export const UserProfilePicture = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const UserName = styled.p`
  margin: 0;
`;

export const ActionButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:disabled {
    background-color: #ccc;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const LoadingMessage = styled.p`
  text-align: center;
`;
