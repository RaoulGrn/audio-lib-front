import { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { SiAudiomack } from "react-icons/si";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  background-image: linear-gradient(#123524, #050f0a);
  padding: 2rem;
  height: 50vh;
`;

const StyledSiAudimack = styled(SiAudiomack)`
  color: #2a5741;
  font-size: 14rem;
`;

const StyledButton = styled(Button)`
  font-size: 1.5rem;
  padding: 0.5rem 2rem;
  border-radius: 20px;
  margin-right: 1rem;

  &:hover {
    background-color: #25553e;
    color: white;
  }
`;

const MyComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleClose1 = () => setModalShow1(false);

  return (
    <>
      <StyledNavbar expand="lg" className="rounded-pill">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          <Navbar.Brand className="fs-1 fw-light">
            <StyledSiAudimack />
          </Navbar.Brand>

          <div className="d-flex justify-content-center space-x-24 flex-grow-1">
            <StyledButton
              variant="outline-light"
              className="me-3 fs-4"
              onClick={() => setModalShow(true)}
            >
              Register
            </StyledButton>
            <StyledButton
              variant="outline-light"
              className="fs-4"
              onClick={() => setModalShow1(true)}
            >
              Login
            </StyledButton>
          </div>
        </Container>
      </StyledNavbar>
      <LoginModal show={modalShow1} handleClose={handleClose1} />
      <RegisterModal
        show={modalShow}
        handleClose={handleClose}
        setModalShow1={setModalShow1}
      />
    </>
  );
};

export default MyComponent;
