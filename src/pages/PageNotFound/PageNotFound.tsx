import { Container } from "./Style";

export default function PageNotFound() {
  return (
    <Container>
      <p>
        Oops! Something went wrong. Please return to the Home page and try
        again. We're sorry for the inconvenience!
      </p>

      <a href="/">Back to Home</a>
    </Container>
  );
}
