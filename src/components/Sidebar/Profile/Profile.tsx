import { useUserStore } from "../../../hooks";
import { Thick, Image, Text, Container, Wrapper } from "./Style";
import { Modal } from "../../Core";
import { DEFAULT_AVATAR, IMAGE_PROXY } from "../../../library";

type ProfileProps = {
  isOpen: boolean;
  theme: string;
  setProfileOpen: (value: boolean) => void;
};

export function Profile({ theme, setProfileOpen, isOpen }: ProfileProps) {
  const { currentUser } = useUserStore();

  return (
    <Modal
      theme={theme}
      isOpen={isOpen}
      onClose={() => setProfileOpen(false)}
      title={"Your Profile"}
    >
      <Container>
        <Image
          src={IMAGE_PROXY(currentUser?.photoURL ?? DEFAULT_AVATAR)}
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
