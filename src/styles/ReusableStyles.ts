import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const MobileHide = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
