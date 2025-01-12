import React, { useState } from "react";
import { Modal, TextField, Button, Link, Typography } from "@mui/material";
import ModalLayout from "./ModalLayout";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onSignUp: (email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose, onSignUp, onSwitchToLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!email) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!hasError) {
      onSignUp(email, password);
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchToLogin = () => {
    resetForm();
    onSwitchToLogin();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalLayout title="Sign Up" onClose={handleClose}>
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
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          helperText={passwordError ? "Password is required" : ""}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link component="button" onClick={handleSwitchToLogin}>
            Log In
          </Link>
        </Typography>
      </ModalLayout>
    </Modal>
  );
};

export default SignUpModal;
