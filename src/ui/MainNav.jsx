import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgMusicSpeaker } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuthContext } from "../utils/AuthContext";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    text-decoration: none; /* Ensure no underline */
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-300);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  background: none;
  border: none;
  transition: all 0.3s;
  cursor: pointer;

  &:hover,
  &:active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-300);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <NavList>
        {user && (
          <>
            <li>
              <StyledNavLink to="/">
                <CgMusicSpeaker style={{ color: "#2f8d5f" }} />
                <span>Home</span>
              </StyledNavLink>
            </li>
            <li>
              <LogoutButton onClick={handleLogout}>
                <IoLogOutOutline style={{ color: "red" }} />
                <span>Logout</span>
              </LogoutButton>
            </li>
          </>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;
