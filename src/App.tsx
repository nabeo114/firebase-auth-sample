import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, User } from "firebase/auth";
import { Typography, Box, Card, CardContent, Button } from "@mui/material";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import PasswordResetModal from "./components/PasswordResetModal";
import { auth } from "./config";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  // サインアップ処理
  const handleSignup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("User registered successfully!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // ログイン処理
  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      alert("Logged in successfully!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out successfully!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // パスワードリセット処理
  const handlePasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent successfully!");
      setResetPasswordOpen(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" padding={2}>
      <Card sx={{ maxWidth: 500, width: "100%", padding: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Firebase Authentication Demo
          </Typography>
          {!user ? (
            <Box textAlign="center">
              <Button variant="contained" color="primary" onClick={() => setSignUpOpen(true)}>
                Sign Up
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setLoginOpen(true)} style={{ marginLeft: "10px" }}>
                Log In
              </Button>
            </Box>
          ) : (
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Logged in as: {user.email}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Log Out
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* サインアップモーダル */}
      <SignUpModal
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSignUp={handleSignup}
        onSwitchToLogin={() => {
          setSignUpOpen(false);
          setLoginOpen(true);
        }}
      />

      {/* ログインモーダル */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
        onForgotPassword={() => {
          setLoginOpen(false);
          setResetPasswordOpen(true);
        }}
        onSwitchToSignUp={() => {
          setLoginOpen(false);
          setSignUpOpen(true);
        }}
      />

      {/* パスワードリセットモーダル */}
      <PasswordResetModal
        open={resetPasswordOpen}
        onClose={() => setResetPasswordOpen(false)}
        onReset={handlePasswordReset}
      />
    </Box>
  );
};

export default App;
