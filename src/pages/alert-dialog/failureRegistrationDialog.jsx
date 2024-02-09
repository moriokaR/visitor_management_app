import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function FailureRegistrationDialog({
  failureName,
  successfulName,
  isOpen,
  onConfirm,
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
            <>
              登録に失敗しました.
              <br />
              {successfulName.length > 0 && (
                <>
                  成功：
                  {successfulName.map((n, index) => (
                    <React.Fragment key={index}>{`${n}さん${
                      index === successfulName.length - 1 ? "" : "、"
                    }`}</React.Fragment>
                  ))}
                  <br />
                </>
              )}
              {failureName.length > 0 && (
                <>
                  失敗：
                  {failureName.map((n, index) => (
                    <React.Fragment key={index}>{`${n}さん${
                      index === failureName.length - 1 ? "" : "、"
                    }`}</React.Fragment>
                  ))}
                  <br />
                </>
              )}
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
