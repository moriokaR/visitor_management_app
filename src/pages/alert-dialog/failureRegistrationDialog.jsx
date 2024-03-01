// src/pages/alert-dialog/failureRegistrationDialog.jsx
import React from "react";
import CustomAlert from "../../components/CustomAlert";

export default function FailureRegistrationDialog({
  failureNames,
  successfulNames,
  isOpen,
  onConfirm,
}) {
  const content = (
    <>
      登録に失敗しました。
      <br />
      {successfulNames.length > 0 && (
        <>
          成功：
          {successfulNames.join("、")}
          <br />
        </>
      )}
      {failureNames.length > 0 && (
        <>
          失敗：
          {failureNames.join("、")}
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
