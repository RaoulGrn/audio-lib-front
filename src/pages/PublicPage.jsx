import { useState, useEffect } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { SiAudiomack } from "react-icons/si";
import styled, { keyframes } from "styled-components";

const StyledNavbar = styled(Navbar)`
  background-image: linear-gradient(#123524, #050f0a);
  padding: 2rem;
  height: 50vh;
`;

const trembleAnimation = keyframes`
  0% { transform: rotate(0deg);opacity: 0; }
  25% { transform: rotate(2deg); opacity: 0.25;}
  50% { transform: rotate(-2deg);    opacity: 0.5;}
  75% { transform: rotate(1deg); opacity: 0.75; }
  100% { transform: rotate(0deg); opacity: 1;}
`;

const appearAnimation = keyframes`
  0% {  width: 0;
    opacity: 0; }
  25% { width: 25%;
    opacity: 0.25; }
  50% {  width: 100%;
    opacity: 1;}
  75% { width: 75%;
    opacity: 0.75; }
  100% { width: 0;
    opacity: 0; }
`;

const StyledSiAudimack = styled(SiAudiomack)`
  color: #2a5741;
  font-size: 14rem;
  animation: ${trembleAnimation} 2s ease-in-out infinite;
`;

const StyledTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledText = styled.span`
  font-size: 3rem;
  margin-left: 2rem;
  white-space: nowrap;
  color: #376e54;
  overflow: hidden;

  animation: ${appearAnimation} 5s ease-out infinite;
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
  const [showText, setShowText] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleClose1 = () => setModalShow1(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 5000); // Show text after 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StyledNavbar expand="lg" className="rounded-pill">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          <Navbar.Brand className="fs-1 fw-light space-x-8">
            <StyledSiAudimack />
            {showText && (
              <StyledTextContainer>
                <StyledText className="font-bold">Audio Library</StyledText>
              </StyledTextContainer>
            )}
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
