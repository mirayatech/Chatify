import { ImSpinner8 } from "react-icons/im";

import { StyledSpinner } from "./Style";

export const Spinner = () => {
  return (
    <StyledSpinner role="alert" aria-label="loading">
      <ImSpinner8 />
    </StyledSpinner>
  );
};
