import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function HomeDialog({ isOpen, onConfirm, onCancel }) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            入力途中ですが、本当に戻りますか？
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