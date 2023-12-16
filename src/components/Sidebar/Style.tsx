import styled from "styled-components";

export const SideBar = styled.div`
  width: 100%;
  border-right: none;
  background: white;
  @media screen and (min-width: 768px) {
    width: 350px;
    height: 100vh;
    border-right: 1px solid #efefef;
  }
`;

export const Navbar = styled.div`
  height: 80px;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const ProfileButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const ChatButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  margin-right: 20px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 1.4rem;
  :hover {
    /*  */
  }
`;

export const ProfilePicture = styled.img`
  width: 50px;
  border-radius: 50%;
`;

export const SecondaryContainer = styled.div`
  position: relative;
`;

export const PrimaryContainer = styled.div`
  position: relative;
`;

export const ShowProfileButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  display: flex;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 20px;
  align-items: center;
  /*  */
  transition: all 0.2s ease;
  background-color: transparent;
  &:hover {
    /*  */
  }
`;

export const SignOutButton = styled.button`
  border: none;
  display: flex;
  font-size: 1rem;
  font-weight: 500;
  color: #f54040;
  padding: 10px 20px;
  align-items: center;
  transition: all 0.2s ease;
  background-color: transparent;
  &:hover {
    /*  */
  }
`;

// No Convo
export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Text = styled.p`
  margin: 30px 0 15px 0;
`;
export const SelectConversationButton = styled.button`
  /*  */
  border: none;
  font-weight: 500;
  padding: 6px 10px;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  /*  */
  :hover {
    /*  */
  }
`;
