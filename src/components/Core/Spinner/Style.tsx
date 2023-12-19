import styled from "styled-components";

export const StyledSpinner = styled.div`
  z-index: 20;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    z-index: 1000;
    color: #4c8bf5;
    font-size: 2rem;
    position: relative;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
