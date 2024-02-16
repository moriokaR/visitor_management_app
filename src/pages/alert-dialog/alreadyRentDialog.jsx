// src/pages/alert-dialog/AlreadyRentDialog.jsx
import React from "react";
import CustomAlert from "../../components/CustomAlert";

export default function AlreadyRentDialog({
  isOpen,
  onConfirm,
  number,
  testDataType,
  rentCardNumber,
}) {
  const content = (
    <>
      この名札番号は貸出中です
      <br />
      入力値: {number}
      <br />
      貸出中&nbsp;
      {testDataType}: {rentCardNumber.join(",")}
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
