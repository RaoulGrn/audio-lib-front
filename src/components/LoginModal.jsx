import { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { useAuthContext } from "../utils/AuthContext";
import PasswordChecklist from "react-password-checklist";

const LoginModal = ({ show, handleClose }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const { login } = useAuthContext();

  const onSubmit = async () => {
    const { email, password } = user;
    if (email && password) {
      try {
        await login(email, password);
        console.log("Performing login...");
        window.location.reload();
      } catch (error) {
        console.error("Failed to login:", error);
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      className="rounded-pill"
      contentClassName="bg-transparent"
    >
      <Modal.Body
        className="rounded-pill"
        style={{
          backgroundImage: "linear-gradient(#123524,#050f0a)",
          padding: "2rem",
        }}
      >
        <Container
          fluid
          className="d-flex flex-column align-items-center text-white"
        >
          <h2 className="mb-4">Login</h2>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
            placeholder="Email"
            className="form-control bg-transparent text-white mb-3 fs-5 rounded-pill"
            style={{ width: "80%", border: "1px solid white" }}
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            placeholder="Password"
            className="form-control bg-transparent text-white mb-4 fs-5 rounded-pill"
            style={{ width: "80%", border: "1px solid white" }}
            required
          />
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital"]}
            minLength={5}
            value={user.password}
            onChange={(isValid) => setIsFormValid(isValid)}
            className="mb-4 text-start"
            style={{ width: "80%" }}
          />
          <div className="d-flex justify-content-center w-100">
            <Button
              onClick={onSubmit}
              variant="outline-light"
              className="fs-5 px-5 py-2 rounded-pill me-3"
              style={{ width: "180px" }}
              disabled={!isFormValid}
            >
              Login
            </Button>
            <Button
              onClick={handleClose}
              variant="outline-danger"
              className="fs-5 px-5 py-2 rounded-pill"
              style={{ width: "180px" }}
            >
              Cancel
            </Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
