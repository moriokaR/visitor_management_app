// successfulRegistrationDialog.jsx
import * as React from "react";
import CustomDialog from "../../components/CustomDialog";

export default function SuccessfulRegistrationDialog({
  name,
  isOpen,
  onConfirm,
  onCancel,
}) {
  // const content = (
  //   <React.Fragment>
  //     {name}さんの登録が完了しました。<br />
  //     登録を続けますか？
  //   </React.Fragment>
  // );
  let content;

  if (Array.isArray(name)) {
    // nameが配列の場合
    content = (
      <React.Fragment>
        {name.map((n, index) => (
          <React.Fragment key={index}>
            {index === name.length - 1 ? (
              `${n}さん`
            ) : (
              <React.Fragment>{`${n}さん、`}</React.Fragment>
            )}
          </React.Fragment>
        ))}
        の登録が完了しました。
        <br />
        登録を続けますか？
      </React.Fragment>
    );
  } else {
    // nameが単一の文字列の場合
    content = (
      <React.Fragment>
        {`${name}さんの登録が完了しました。`}
        <br />
        登録を続けますか？
      </React.Fragment>
    );
  }

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
