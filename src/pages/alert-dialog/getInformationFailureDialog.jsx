// src/pages/alert-dialog/failureRegistrationDialog.jsx
import React from "react";
import CustomAlert from "../../components/CustomAlert";

export default function GetInformationFailureDialog({ isOpen, onConfirm }) {
  const content = <>情報取得に失敗しました。</>;

  return (
    <CustomAlert
      isOpen={isOpen}
      content={content}
      buttonLabel="OK"
      onButtonClick={onConfirm}
    />
  );
}
