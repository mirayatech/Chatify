import { Link } from "react-router-dom";
import styled from "styled-components";

export const FormContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h1`
  font-size: 24px;
  padding: 10px 0 50px;
  text-align: center;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FilePickerContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: 100px;
  height: 100px;
  background-color: aliceblue;
  border-radius: 50%;

  label {
    display: flex;
    font-size: 45px;
    cursor: pointer;
  }

  @media screen and (min-width: 450px) {
    width: 135px;
    height: 135px;
  }
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
`;

export const ChangeImageButton = styled.button`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 20px;
  left: 105px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  color: transparent;
  font-size: 24px;
  transition: all 0.1s ease-in-out;
  &:hover {
    color: white;
    font-size: 24px;
    text-transform: capitalize;
    background-color: #00000084;
  }

  @media screen and (min-width: 450px) {
    width: 135px;
    height: 135px;
    top: 20px;
    left: 133px;
  }

  @media screen and (min-width: 560px) {
    top: 20px;
    left: 183px;
  }
`;

export const ImagePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    border-radius: 50%;
  }

  @media screen and (min-width: 450px) {
    width: 135px;
    height: 135px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 310px;

  @media screen and (min-width: 450px) {
    width: 400px;
  }

  @media screen and (min-width: 560px) {
    width: 500px;
  }
`;

export const Label = styled.label`
  font-size: 1rem;

  padding-bottom: 2px;
`;

export const Button = styled.button`
  padding: 12px 17px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin: 10px 0;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
