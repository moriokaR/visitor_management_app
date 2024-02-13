// src/pages/alert-dialog/OutOfRangeDialog.jsx
import React from "react";
import CustomAlert from "../../components/CustomAlert";

export default function OutOfRangeDialog({ isOpen, onConfirm }) {
  const content = <>番号は# 01~20です</>;

  return (
    <CustomAlert
      isOpen={isOpen}
      content={content}
      buttonLabel="OK"
      onButtonClick={onConfirm}
    />
  );
}
