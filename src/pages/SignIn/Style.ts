import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;
  gap: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  img {
    width: 500px;
  }

  @media screen and (max-width: 1110px) {
    gap: 40px;
  }

  @media screen and (max-width: 1060px) {
    flex-direction: column;
    gap: 10px;
  }

  @media screen and (max-width: 1024px) {
    height: 90vh;
    gap: 30px;

    img {
      width: 400px;
    }
  }

  @media screen and (max-width: 580px) {
    gap: 50px;
    text-align: center;
    img {
      width: 300px;
    }
  }

  @media screen and (max-width: 400px) {
    gap: 0px;
  }
`;

export const Wrapper = styled.div`
  gap: 30px;
  display: flex;
  flex-direction: column;
`;

export const TextWrapper = styled.div`
  gap: 20px;
  max-width: 500px;
  display: flex;
  flex-direction: column;

  h1 {
    color: #1e1e1e;
    font-size: 2.2rem;
    font-weight: 500;

    @media screen and (max-width: 580px) {
      font-size: 1.8rem;
    }
  }

  h2 {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.5;
    color: #434343;

    @media screen and (max-width: 580px) {
      font-size: 1.2rem;
    }
  }
`;

export const ButtonWrapper = styled.div`
  gap: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;

  button {
    border: none;
    font-size: 1.1rem;
    color: white;
    letter-spacing: 0.5px;
    font-weight: 500;
    position: relative;
    z-index: 0;
    padding: 10px;

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

    @media screen and (max-width: 580px) {
      width: 300px;
      margin: auto;
      font-size: 1rem;
    }
  }

  a {
    color: #4d73fc;
    transition: all 0.2s ease;

    &:hover {
      color: #2b4db5;
    }
  }
`;
