import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useTheme } from "../../hooks";
import { HomeWrapper, Wrapper, Text } from "./Style";

export default function Home() {
  const { theme } = useTheme();
  return (
    <Wrapper>
      <Sidebar />
      <HomeWrapper theme={theme}>
        <Text theme={theme}>Select a conversation to start chatting.</Text>
      </HomeWrapper>
    </Wrapper>
  );
}
