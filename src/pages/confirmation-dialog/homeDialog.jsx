// HomeDialog.jsx
import * as React from "react";
import CustomDialog from "../../components/CustomDialog";

export default function HomeDialog({ isOpen, onConfirm, onCancel }) {
  const content = "入力途中ですが、本当に戻りますか？";

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