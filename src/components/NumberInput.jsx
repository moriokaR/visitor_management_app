// components/NumberInput.jsx
import React, { useState, useEffect } from "react";
import styles from "../styles/NumberInput.module.css";
import OutOfRangeDialog from "../pages/alert-dialog/outOfRangeDialog";
import AlreadyRentDialog from "../pages/alert-dialog/alreadyRentDialog";

const NumberInput = ({
  onNumberChange,
  keyboardVisibleChange,
  isDisabled,
  testDataNumber,
  getRentCardData,
  testDataType,
}) => {
  // アラート用
  const [outOfRangeOpen, setOutOfRangeOpen] = useState(false);
  const [alreadyRentOpen, setAlreadyRentOpen] = useState(false);
  const [inNumber, setInNumber] = useState("");

  // キーボード用
  const [number, setNumber] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  // 現在のタイプの貸出中の番号の配列
  const [rentCardNumber, setRentCardNumber] = useState([]);

  useEffect(() => {
    if (number.length === 2 && isKeyboardVisible) {
      const isValidNumber = /^(0?[1-9]|1[0-9]|20)$/.test(number);
      if (!isValidNumber) {
        // alert("番号は# 01~20です\n入力値:" + number);
        setOutOfRangeOpen(true);
        setNumber("");
      }
      setIsKeyboardVisible(false);
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
        // アラート表示
        setInNumber(number);
        setAlreadyRentOpen(true);
        setNumber("");
      }
      setIsKeyboardVisible(false);
    }
    onNumberChange(inNumber);
  }, [number]);

  // testDataNumberが0の時にnumberを初期化する 初期化にしか使わない。
  useEffect(() => {
    if (testDataNumber == 0) {
      setNumber("");
    }
  }, [testDataNumber]);

  const handleKeyClick = (key) => {
    setNumber((prevNumber) => prevNumber + key);
  };

  const handleBackspace = () => {
    if (number.length === 0) {
      setIsKeyboardVisible(false);
    }
    setNumber((prevNumber) => prevNumber.slice(0, prevNumber.length - 1));
  };

  const handleInputClick = () => {
    if (!isKeyboardVisible) {
      setNumber("");
    }
    setIsKeyboardVisible(true);
  };

  return (
    <>
      {/* アラートダイアログ */}
      <OutOfRangeDialog
        isOpen={outOfRangeOpen}
        onConfirm={() => {
          setOutOfRangeOpen(false);
        }}
        number={number}
      />
      <AlreadyRentDialog
        isOpen={alreadyRentOpen}
        onConfirm={() => {
          setAlreadyRentOpen(false);
        }}
        number={inNumber}
        testDataType={testDataType}
        rentCardNumber={rentCardNumber}
      />
      {/* キーボード */}
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
              {testDataType}:
              {rentCardNumber.map((cardNumber, index) => (
                <span key={index} className={styles.rentCardNumber}>
                  {index === rentCardNumber.length - 1
                    ? cardNumber
                    : `${cardNumber},`}
                </span>
              ))}
            </div>
            <input
              type="tel"
              value={number}
              placeholder="# 01~20"
              readOnly
              className={styles.inputFieldPoP}
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
    </>
  );
};

export default NumberInput;
