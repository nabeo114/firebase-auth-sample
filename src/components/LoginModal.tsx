import React, { useState } from "react";
import { Modal, TextField, Button, Link, Typography } from "@mui/material";
import ModalLayout from "./ModalLayout";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin, onForgotPassword, onSwitchToSignUp }) => {
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
      onLogin(email, password);
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleForgotPassword = () => {
    resetForm();
    onForgotPassword();
  };

  const handleSwitchToSignUp = () => {
    resetForm();
    onSwitchToSignUp();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalLayout title="Log In" onClose={handleClose}>
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
          Log In
        </Button>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          <Link component="button" onClick={handleForgotPassword}>
            Forgot Password?
          </Link>
        </Typography>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Don't have an account yet?{" "}
          <Link component="button" onClick={handleSwitchToSignUp}>
            Sign Up
          </Link>
        </Typography>
      </ModalLayout>
    </Modal>
  );
};

export default LoginModal;
