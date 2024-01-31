// components/InputDateTime.js

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * @param selectedDate - 選択された日付と時刻
 * @param onChange - 日付と時刻が変更されたときのコールバック関数
 */
const InputDateTime = ({ selectedDate, onChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => onChange(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="yyyy/MM/dd, hh:mm aa"
      timeCaption="Time"
      customInput={<CustomInput readOnly />} // カスタム入力フィールドを指定し、その中でreadOnlyを設定
    />
  );
};

// カスタム入力フィールドのコンポーネント
const CustomInput = React.forwardRef(({ value, onClick, readOnly }, ref) => (
  <input
    value={value}
    onClick={onClick}
    readOnly={readOnly} // readOnlyを設定
    ref={ref}
  />
));

// displayNameを追加
CustomInput.displayName = 'CustomInput';

export default InputDateTime;