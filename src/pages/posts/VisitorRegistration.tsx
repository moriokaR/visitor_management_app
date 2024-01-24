// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect } from "react";
import { visitorRegistration } from "../../util/information-processing";
import Head from "next/head";
import Link from "next/link";

export default function FirstPost() {
  const [testData, setTestData] = useState({
    visitorName: "",
    company: "",
    entryDateTime: "2000-01-01 00:00:00",
    attender: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // フォームが有効かどうかを確認
    const isValid = Object.values(testData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(isValid);
  }, [testData]);

  const handleInsertData = async () => {
    await visitorRegistration(testData);

    // データ登録後、フォームをクリア
    setTestData({
      visitorName: "",
      company: "",
      entryDateTime: "2000-01-01 00:00:00",
      attender: "",
    });
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
        <title>来客者登録画面</title>
      </Head>
      <h1>来客者登録画面！</h1>
      <Link href="/">ホームへ戻る</Link>
      <div>
        <label>
          Visitor Name:
          <input
            type="text"
            value={testData.visitorName}
            onChange={(e) => handleInputChange("visitorName", e.target.value)}
          />
        </label>
        <br />
        <label>
          Company:
          <input
            type="text"
            value={testData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
          />
        </label>
        <br />
        <label>
          Attender:
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
