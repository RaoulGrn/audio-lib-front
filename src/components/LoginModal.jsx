import React, { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import PasswordChecklist from "react-password-checklist";
import styled from "styled-components";
import { useAuthContext } from "../utils/AuthContext";
import toast from "react-hot-toast";

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: transparent;
  }
`;

const StyledModalBody = styled(Modal.Body)`
  background-image: linear-gradient(#123524, #050f0a);
  padding: 2rem;
  border-radius: 20px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 400px;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  width: 180px;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-right: ${(props) => (props.cancel ? "0" : "1rem")};
`;

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
        toast.success("Login successful!");
      } catch (error) {
        console.error("Failed to login:", error);
        toast.error("Failed to login. Please try again.");
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <StyledModal show={show} onHide={handleClose} size="lg" centered>
      <StyledModalBody>
        <StyledContainer fluid>
          <h2 className="mb-4">Login</h2>
          <StyledInput
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
            placeholder="Email"
            required
          />
          <StyledInput
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital"]}
            minLength={5}
            value={user.password}
            onChange={(isValid) => setIsFormValid(isValid)}
            className="mb-4 text-start"
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <div className="d-flex justify-content-center w-100">
            <StyledButton
              onClick={onSubmit}
              variant="outline-light"
              disabled={!isFormValid}
            >
              Login
            </StyledButton>
            <StyledButton
              onClick={handleClose}
              variant="outline-danger"
              cancel="true"
            >
              Cancel
            </StyledButton>
          </div>
        </StyledContainer>
      </StyledModalBody>
    </StyledModal>
  );
};

export default LoginModal;
