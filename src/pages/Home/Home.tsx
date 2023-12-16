import { Sidebar } from "../../components/Sidebar/Sidebar";
import { HomeWrapper, Wrapper, Text } from "./Style";

export default function Home() {
  return (
    <Wrapper>
      <Sidebar />
      <HomeWrapper>
        <Text>Select a conversation to start chatting.</Text>
      </HomeWrapper>
    </Wrapper>
  );
}
