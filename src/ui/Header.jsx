import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  margin-top: 1.6rem;
`;

function Header() {
  return <StyledHeader>Click on a track to play it on youtube!</StyledHeader>;
}

export default Header;
