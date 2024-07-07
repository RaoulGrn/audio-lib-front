import { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import styled from "styled-components";
import toast from "react-hot-toast";

const ModalBody = styled(Modal.Body)`
  background-image: linear-gradient(#123524, #050f0a);
  padding: 2rem;
  border: 1px solid gray;
  border-radius: 20px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const InputField = styled.input`
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

const SubmitButton = styled(Button)`
  width: 180px;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-right: 1rem;
`;

const CancelButton = styled(Button)`
  width: 180px;
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;

const RegisterModal = ({ show, handleClose, setModalShow1 }) => {
  const [formValue, setFormValue] = useState({
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
      toast.success("Successfully registered. Please login.");
    } catch (error) {
      console.error("Error sending POST request:", error);
      toast.error("Failed to register. Please try again.");
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
      <ModalBody>
        <StyledContainer fluid>
          <InputField
            type="text"
            name="username"
            value={formValue.username}
            onChange={onChange}
            placeholder="Username"
            required
          />
          <InputField
            type="email"
            name="email"
            value={formValue.email}
            onChange={onChange}
            placeholder="Email"
            required
          />
          <InputField
            type="password"
            name="password"
            value={formValue.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <InputField
            type="password"
            name="confirmPassword"
            value={formValue.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            required
          />
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={formValue.password}
            valueAgain={formValue.confirmPassword}
            onChange={(isValid) => setIsFormValid(isValid)}
            className="mb-4 text-start"
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <div className="d-flex justify-content-center w-100">
            <SubmitButton
              onClick={handleSubmit}
              variant="outline-light"
              disabled={!isFormValid}
            >
              Register
            </SubmitButton>
            <CancelButton onClick={handleClose} variant="outline-danger">
              Cancel
            </CancelButton>
          </div>
        </StyledContainer>
      </ModalBody>
    </Modal>
  );
};

export default RegisterModal;
