import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function AlreadyRentDialog({
  isOpen,
  onConfirm,
  number,
  testDataType,
  rentCardNumber,
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
          <DialogContentText id="alert-dialog-description">
            この名札番号は貸出中です
            <br />
            入力値: {number}
            <br />
            貸出中&nbsp;
            {testDataType}:
            {rentCardNumber.map((cardNumber, index) => (
              <span key={index}>
                {index === rentCardNumber.length - 1
                  ? cardNumber
                  : `${cardNumber},`}
              </span>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
