import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function RegistrationDialog({ isOpen, onConfirm, onCancel }) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            以下の内容で登録しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>ok</Button>
          <Button onClick={onCancel}>キャンセル</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
