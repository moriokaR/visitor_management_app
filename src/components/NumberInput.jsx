// components/NumberInput.jsx
import React, { useState, useEffect } from "react";
import styles from "../styles/NumberInput.module.css";

const NumberInput = ({ onNumberChange, isDisabled }) => {
  const [number, setNumber] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (number.length === 2 && isKeyboardVisible) {
      const isValidNumber = /^(0?[1-9]|1[0-9]|20)$/.test(number);
      if (!isValidNumber) {
        alert("番号は# 01~20です\n入力値:" + number);
        setNumber("");
      }
      setKeyboardVisible(false);
    }
  }, [number, isKeyboardVisible]);

  useEffect(() => {
    const inNumber = number === "" ? 0 : parseInt(number, 10);
    // ここで、貸出中じゃないかどうかを判定


    
    onNumberChange(inNumber);
    // onNumberChange(number === "" ? 0 : parseInt(number, 10));
  }, [number]);

  useEffect(() => {
    if(isDisabled === true && isKeyboardVisible === true){
      setKeyboardVisible(false);
    }
  }, [isDisabled]);

  const handleKeyClick = (key) => {
    setNumber((prevNumber) => prevNumber + key);
  };

  const handleBackspace = () => {
    if (number.length === 0) {
      setKeyboardVisible(false);
    }
    setNumber((prevNumber) => prevNumber.slice(0, prevNumber.length - 1));
  };

  const handleInputClick = () => {
    if (!isKeyboardVisible) {
      setNumber("");
    }
    setKeyboardVisible(true);
  };

  return (
    <div className={styles.NumberInput}>
      <input
        type="tel"
        value={number}
        placeholder="# 01~20"
        readOnly
        className={styles.inputField}
        onClick={handleInputClick}
        disabled={isDisabled}
      />
      {isKeyboardVisible && (
        <div className={styles.keyboard}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
            <button
              key={num}
              onClick={() => handleKeyClick(String(num))}
              className={`${styles.button} ${isDisabled ? styles.disabled : ""}`} // disabled を isDisabled に変更
            >
              {num}
            </button>
          ))}
          <button
            className={`${styles.button} ${styles.emptyButton} ${isDisabled ? styles.disabled : ""}`}
          ></button>
          <button
            key={0}
            onClick={() => handleKeyClick(String(0))}
            className={`${styles.button} ${isDisabled ? styles.disabled : ""}`}
          >
            0
          </button>
          <button onClick={handleBackspace} className={`${styles.button} ${isDisabled ? styles.disabled : ""}`} disabled={isDisabled}>
            Backspace
          </button>
        </div>
      )}
    </div>
  );
};

export default NumberInput;