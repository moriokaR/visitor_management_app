// components/NumberInput.jsx
import React, { useState, useEffect } from "react";
import styles from "../styles/NumberInput.module.css";

const NumberInput = ({
  onNumberChange,
  keyboardVisibleChange,
  isDisabled,
  testDataNumber,
  getRentCardData,
  testDataType,
}) => {
  const [number, setNumber] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // 現在のタイプの貸出中の番号の配列
  const [rentCardNumber, setRentCardNumber] = useState([]);

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

  // 開かれているかどうかの判定を返す。
  useEffect(() => {
    keyboardVisibleChange(isKeyboardVisible);
  }, [isKeyboardVisible]);

  // ここに、rentCardNumberへセットする。
  useEffect(() => {
    if (testDataType && getRentCardData) {
      // レントカードデータから指定のタイプの番号を抽出してセット
      const filteredNumbers = getRentCardData
        .filter((item) => item.type === testDataType)
        .map((item) => item.number);
      setRentCardNumber(filteredNumbers);
    }
  }, [getRentCardData, testDataType]);

  useEffect(() => {
    const inNumber = number === "" ? 0 : parseInt(number, 10);
    // ここで、貸出中じゃないかどうかを判定
    if (number.length === 2 && isKeyboardVisible) {
      const isAlreadyRented = rentCardNumber.includes(inNumber);
      if (isAlreadyRented) {
        alert(
          "この名札番号は貸出中です\n入力値:" +
            number +
            "\n貸出中 " +
            testDataType +
            ": " +
            rentCardNumber
        );
        setNumber("");
      }
      setKeyboardVisible(false);
    }
    onNumberChange(inNumber);
  }, [number]);

  // testDataNumberが0の時にnumberを初期化する 初期化にしか使わない。
  useEffect(() => {
    if (testDataNumber == 0) {
      setNumber("");
    }
  }, [testDataNumber]);

  //これいらなさそう
  // useEffect(() => {
  //   if (isDisabled === true && isKeyboardVisible === true) {
  //     setKeyboardVisible(false);
  //   }
  // }, [isDisabled, isKeyboardVisible]);

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
        <div className={styles.PopUp}>
          <div>
            貸出中&nbsp;
            {testDataType}:{" "}
            {rentCardNumber.map((cardNumber, index) => (
              <span key={index} className={styles.rentCardNumber}>
                {cardNumber},
              </span>
            ))}
          </div>
          <input
            type="tel"
            value={number}
            placeholder="# 01~20"
            readOnly
            className={styles.inputField}
          />
          <div className={styles.keyboard}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyClick(String(num))}
                className={styles.button}
              >
                {num}
              </button>
            ))}
            <button className={styles.button}></button>
            <button
              key={0}
              onClick={() => handleKeyClick(String(0))}
              className={styles.button}
            >
              0
            </button>
            <button onClick={handleBackspace} className={styles.button}>
              Backspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberInput;
