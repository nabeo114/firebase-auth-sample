import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalLayoutProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalLayout = React.forwardRef<HTMLDivElement, ModalLayoutProps>(
  ({ title, onClose, children }, ref) => (
    <Box
      ref={ref}
      tabIndex={-1}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  )
);

export default ModalLayout;
