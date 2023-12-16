import styled from "styled-components";

export const Text = styled.p`
  font-size: calc(20 / 16 * 1rem);
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const HomeWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100vh;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #f6f6f6;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
