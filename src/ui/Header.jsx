import styled from "styled-components";
import { useAuthContext } from "../utils/AuthContext";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  font-size: 2rem;
  color: gray;
  margin-top: 2rem;
`;

function Header() {
  const { user } = useAuthContext();
  return (
    <StyledHeader>
      {user && <p>Click on a track to play it on youtube!</p>}
    </StyledHeader>
  );
}

export default Header;
