// successfulRegistrationDialog.jsx
import * as React from "react";
import CustomDialog from "../../components/CustomDialog";

export default function SuccessfulRegistrationDialog({ name, isOpen, onConfirm, onCancel }) {
  const content = (
    <React.Fragment>
      {name}さんの登録が完了しました。<br />
      登録を続けますか？
    </React.Fragment>
  );

  return (
    <CustomDialog 
      isOpen={isOpen} 
      content={content} 
      confirmButtonLabel="続ける" 
      cancelButtonLabel="終了" 
      onConfirm={onConfirm} 
      onCancel={onCancel} 
    />
  );
}