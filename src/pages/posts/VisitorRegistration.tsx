// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect } from "react";
import { visitorRegistration } from "../../util/information-processing";
import Head from "next/head";
import Link from "next/link";
import InputDateTime from "../../components/InputDateTime"; // InputDateTimeコンポーネントをインポート

export default function VisitorRegistration() {
  const [testData, setTestData] = useState({
    visitorName: "",
    company: "",
    entryDateTime: new Date(), // 現在の日付と時刻で初期化
    attender: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // フォームのバリデーション
    const isValid = Object.values(testData).every(
      (value) => (typeof value !== 'string' && typeof value !== 'undefined') || (typeof value === 'string' && value.trim() !== "")
    );
    setIsFormValid(isValid);
  }, [testData]);

  const handleInsertData = async () => {
    await visitorRegistration(testData);

    // 登録後、フォームをクリア
    setTestData({
      visitorName: "",
      company: "",
      entryDateTime: new Date(),
      attender: "",
    });
  };

  const handleDateTimeChange = (date) => {
    setTestData((prevData) => ({
      ...prevData,
      entryDateTime: date,
    }));
  };

  const handleInputChange = (fieldName, value) => {
    setTestData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div>
      <Head>
        <title>来客者登録</title>
      </Head>
      <h1>来客者登録</h1>
      <Link href="/">ホームに戻る</Link>
      <div>
        <label>
          来客者名：
          <input
            type="text"
            value={testData.visitorName}
            onChange={(e) => handleInputChange("visitorName", e.target.value)}
          />
        </label>
        <br />
        <label>
          会社：
          <input
            type="text"
            value={testData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
          />
        </label>
        <br />
        <label>
          来訪日時：
          <InputDateTime
            selectedDate={testData.entryDateTime}
            onChange={handleDateTimeChange}
          />
        </label>
        <br />
        <label>
          担当者：
          <input
            type="text"
            value={testData.attender}
            onChange={(e) => handleInputChange("attender", e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleInsertData} disabled={!isFormValid}>
          登録
        </button>
      </div>
    </div>
  );
}
