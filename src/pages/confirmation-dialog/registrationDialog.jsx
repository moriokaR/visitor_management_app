// RegistrationDialog.jsx
import * as React from "react";
import CustomDialog from "../../components/CustomDialog";

export default function RegistrationDialog({ isOpen, onConfirm, onCancel }) {
  const content = "以下の内容で登録しますか？";

  return (
    <CustomDialog 
      isOpen={isOpen} 
      content={content} 
      confirmButtonLabel="OK" 
      cancelButtonLabel="キャンセル" 
      onConfirm={onConfirm} 
      onCancel={onCancel} 
    />
  );
}