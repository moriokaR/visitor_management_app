// // src\pages\confirmation-dialog\registration.jsx

import React from 'react';

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel }) => (
  <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)' }}>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px' }}>
      <p>入力途中ですが、本当に戻りますか？</p>
      <button onClick={onConfirm}>OK</button>
      <button onClick={onCancel}>キャンセル</button>
    </div>
  </div>
);

export default ConfirmationDialog;