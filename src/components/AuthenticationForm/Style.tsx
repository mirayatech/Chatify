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
