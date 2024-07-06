import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import { Link } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";

const MyComponent = () => {
  const { logout } = useAuthContext();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleClose1 = () => setModalShow1(false);

  return (
    <>
      <Navbar
        collapseOnSelect
        className={"public-navbarz"}
        expand="lg"
        style={{
          backgroundImage: "linear-gradient(#123524,#050f0a)",
          fontSize: "3rem",
          justifyContent: "space-between",
          padding: "2rem ",
        }}
        variant="dark"
      >
        <Container className={"flex"}>
          <Link to="/">
            <Navbar.Brand className={"fs-1 fw-light flex "}> </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#" onClick={() => setModalShow(true)}>
                <span className={""}>Register</span>
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="#"
                onClick={() => setModalShow1(true)}
              >
                <span className={"spans-one"}>Login</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
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
