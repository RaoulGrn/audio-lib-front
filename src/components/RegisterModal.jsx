import { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";

const RegisterModal = ({ show, handleClose, setModalShow1 }) => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
      });

      console.log("POST request successful", response);
      handleClose();
      setModalShow1(true);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
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
          <h2 className="mb-4">Register</h2>
          <input
            type="text"
            name="name"
            value={formValue.name}
            onChange={onChange}
            placeholder="Name"
            className="form-control bg-transparent text-white mb-3 fs-5 rounded-pill"
            style={{ width: "80%", border: "1px solid white" }}
            required
          />
          <input
            type="text"
            name="username"
            value={formValue.username}
            onChange={onChange}
            placeholder="Username"
            className="form-control bg-transparent text-white mb-3 fs-5 rounded-pill"
            style={{ width: "80%", border: "1px solid white" }}
            required
          />
          <input
            type="email"
            name="email"
            value={formValue.email}
            onChange={onChange}
            placeholder="Email"
            className="form-control bg-transparent text-white mb-3 fs-5 rounded-pill"
            style={{ width: "80%", border: "1px solid white" }}
            required
          />
          <input
            type="password"
            name="password"
            value={formValue.password}
            onChange={onChange}
            placeholder="Password"
            className="form-control bg-transparent text-white mb-4 fs-5 rounded-pill"
            style={{ width: "80%", border: "1px solid white" }}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formValue.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            className="form-control bg-transparent text-white mb-4 fs-5 rounded-pill"
            style={{ width: "80%", border: "1px solid white" }}
            required
          />
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={formValue.password}
            valueAgain={formValue.confirmPassword}
            onChange={(isValid) => setIsFormValid(isValid)}
            className="mb-4 text-start"
            style={{ width: "80%" }}
          />
          <div className="d-flex justify-content-center w-100">
            <Button
              onClick={handleSubmit}
              variant="outline-light"
              className="fs-5 px-5 py-2 rounded-pill me-3"
              style={{ width: "180px" }}
              disabled={!isFormValid}
            >
              Register
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

export default RegisterModal;
