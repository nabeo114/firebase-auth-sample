import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import ModalLayout from "./ModalLayout";

interface PasswordResetModalProps {
  open: boolean;
  onClose: () => void;
  onReset: (email: string) => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ open, onClose, onReset }) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const resetForm = () => {
    setEmail("");
    setEmailError(false);
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!email) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!hasError) {
      onReset(email);
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalLayout title="Reset Password" onClose={handleClose}>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "Email is required" : ""}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Send Reset Email
        </Button>
      </ModalLayout>
    </Modal>
  );
};

export default PasswordResetModal;
