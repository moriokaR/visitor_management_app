import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function SuccessfulRegistrationDialog({ name, isOpen, onConfirm, onCancel }) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          top: '-85%',
          left: '0%',
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {name + "さんの登録が完了しました。"}
          <br />
          登録を続けますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>続ける</Button>
          <Button onClick={onCancel}>終了</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}