import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";


export default function OutOfRengeDialog({ isOpen, onConfirm, number }) {
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
            番号は# 01~20です
            <br />
            入力値: {number}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}