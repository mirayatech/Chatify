import styled from "styled-components";

export const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  padding: 10px;

  p {
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  a {
    text-align: center;
    text-decoration: none;
    border: none;
    font-size: 0.9rem;
    color: white;
    letter-spacing: 0.5px;
    font-weight: 500;
    position: relative;
    z-index: 0;
    padding: 10px;
    width: 150px;
    border-radius: 5px;
    background-image: linear-gradient(#46aff4, #4d73fc);
    transition: background-color 0.2s ease;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(#3ea0dd, #4167e2);
      border-radius: inherit;
      z-index: -1;
      transition: opacity 0.2s ease;
      opacity: 0;
    }

    &:hover::before {
      opacity: 1;
    }
  }
`;
