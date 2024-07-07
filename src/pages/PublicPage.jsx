import { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { Link } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";
import { SiAudiomack } from "react-icons/si";

const MyComponent = () => {
  const { logout } = useAuthContext();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleClose1 = () => setModalShow1(false);

  return (
    <>
      <Navbar
        expand="lg"
        className="rounded-pill fs-xx"
        style={{
          backgroundImage: "linear-gradient(#123524,#050f0a)",
          fontSize: "3rem",
          padding: "2rem",
        }}
        variant="dark"
      >
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          <Link to="/">
            <Navbar.Brand className="fs-1 fw-light">
              <SiAudiomack />
            </Navbar.Brand>
          </Link>
          <div className="d-flex justify-content-center flex-grow-1">
            <Button
              variant="outline-light"
              className="me-5 fs-4 px-5 py-2 rounded-pill"
              onClick={() => setModalShow(true)}
              style={{ width: "180px" }}
            >
              Register
            </Button>
            <Button
              variant="outline-light"
              className="fs-4 px-5 py-2 rounded-pill"
              onClick={() => setModalShow1(true)}
              style={{ width: "180px" }}
            >
              Login
            </Button>
          </div>
        </Container>
      </Navbar>
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
