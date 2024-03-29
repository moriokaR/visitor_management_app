// src/components/CustomDialog.jsx
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

export default function CustomDialog({
  isOpen,
  content,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          top: "-85%",
          left: "0%",
        }}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "25px", textAlign: "center" }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} sx={{ fontSize: "20px" }}>
            {confirmButtonLabel}
          </Button>
          <Button onClick={onCancel} sx={{ fontSize: "20px" }}>
            {cancelButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
