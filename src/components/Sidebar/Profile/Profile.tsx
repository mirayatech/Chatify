import { useUserStore } from "../../../hooks";
import { Thick, Image, Text, Container, Wrapper } from "./Style";
import { Modal } from "../../Core";
import { IMAGE_PROXY } from "../../../library";

type ProfileProps = {
  theme: string;
  setProfileOpen: (value: boolean) => void;
};

export function Profile({ theme, setProfileOpen }: ProfileProps) {
  const { currentUser } = useUserStore();

  return (
    <Modal
      theme={theme}
      onClose={() => setProfileOpen(false)}
      title={"Your Profile"}
    >
      <Container>
        <Image
          src={IMAGE_PROXY(currentUser?.photoURL ?? "/empty-avatar.png")}
          alt="profile picture"
        />
      </Container>
      <Wrapper>
        <Text theme={theme}>
          <Thick>ID:</Thick> {currentUser?.uid}
        </Text>
        <Text theme={theme}>
          <Thick>Name:</Thick> {currentUser?.displayName}
        </Text>
        <Text theme={theme}>
          <Thick>Email:</Thick> {currentUser?.email}
        </Text>
      </Wrapper>
    </Modal>
  );
}
