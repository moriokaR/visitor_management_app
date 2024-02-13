// src/pages/alert-dialog/failureRegistrationDialog.jsx
import React from "react";
import CustomAlert from "../../components/CustomAlert";

export default function FailureRegistrationDialog({
  failureName,
  successfulName,
  isOpen,
  onConfirm,
}) {
  const content = (
    <>
      登録に失敗しました.
      <br />
      {successfulName.length > 0 && (
        <>
          成功：
          {successfulName.join("、")}
          <br />
        </>
      )}
      {failureName.length > 0 && (
        <>
          失敗：
          {failureName.join("、")}
          <br />
        </>
      )}
    </>
  );

  return (
    <CustomAlert
      isOpen={isOpen}
      content={content}
      buttonLabel="OK"
      onButtonClick={onConfirm}
    />
  );
}
