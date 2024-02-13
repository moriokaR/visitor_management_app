// components/InputDateTime.js

import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "/src/styles/InputDateTime.module.css";
import ja from "date-fns/locale/ja";

/**
 * @param selectedDate - 選択された日付と時刻
 * @param onChange - 日付と時刻が変更されたときのコールバック関数
 */
const InputDateTime = ({ selectedDate, onChange }) => {
  registerLocale("ja", ja);

  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
    const year = new Intl.DateTimeFormat("ja", { year: "numeric" }).format(
      date
    );
    const month = new Intl.DateTimeFormat("ja", { month: "long" }).format(date);

    return (
      <div className={styles.customHeader}>
        <button onClick={decreaseMonth}>{`<`}</button>
        <span>{`${year} ${month}`}</span>
        <button onClick={increaseMonth}>{`>`}</button>
      </div>
    );
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => onChange(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="yyyy/MM/dd, HH:mm"
      timeCaption="時間"
      customInput={<CustomInput />}
      calendarClassName={styles.customCalendar}
      locale="ja"
      renderCustomHeader={renderCustomHeader}
    />
  );
};

// カスタム入力フィールドのコンポーネント
const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <input
    value={value}
    onClick={onClick}
    readOnly
    ref={ref}
    className={styles.datePicker}
  />
));

// displayNameを追加
CustomInput.displayName = "CustomInput";

export default InputDateTime;
