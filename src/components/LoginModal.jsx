import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PasswordChecklist from "react-password-checklist";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useAuthContext } from "../utils/AuthContext";

const LoginModal = ({ show, handleClose }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const { login } = useAuthContext();

  const onSubmit = async () => {
    const { email, password } = user;

    if (email && password) {
      try {
        await login(email, password);
        console.log("Performing login...");
      } catch (error) {
        console.error("Failed to login:", error);
      }
    }
  };

  const onEmailChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const onPasswordChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };
  console.log(user.email, user.password);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{
        backgroundImage: "linear-gradient( #2D4059,#222831)",
      }}
    >
      <Modal.Header className="bg-custom-gray text-success" closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-custom-gray text-white">
        <p>Please enter your email and password.</p>
        <MDBValidation className="row g-3" isValidated>
          <MDBValidationItem
            className="col-md-12"
            feedback="Please enter a valid email."
            invalid
          >
            <MDBInput
              type="email"
              id="typeText"
              className="form-control"
              placeholder="John Doe"
              value={user.email}
              onChange={onEmailChange}
              required
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-md-12"
            feedback="Please enter a valid password."
            invalid
          >
            <MDBInput
              type="password"
              id="typePassword"
              className="form-control"
              placeholder="Password"
              value={user.password}
              onChange={onPasswordChange}
              required
            />
          </MDBValidationItem>
          <div className="col-12">
            <MDBBtn
              className={"border-dark bg-success"}
              onClick={onSubmit}
              disabled={!isFormValid}
              type="submit"
            >
              Login
            </MDBBtn>
          </div>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={user.password}
            valueAgain={user.password}
            onChange={(isValid) => {
              setIsFormValid(isValid);
            }}
          />
        </MDBValidation>
      </Modal.Body>
      <Modal.Footer className="bg-custom-gray text-white">
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
