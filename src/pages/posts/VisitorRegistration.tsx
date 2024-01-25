// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect } from "react";
import { visitorRegistration } from "../../util/information-processing";
import Head from "next/head";
import Link from "next/link";
import InputDateTime from "../../components/InputDateTime";

// フォームデータの型
interface TestData {
  visitorName: string;
  company: string;
  entryDateTime: Date;
  attender: string;
}

export default function VisitorRegistration() {
  // フォームデータの状態
  const [testData, setTestData] = useState<TestData>({
    visitorName: "",
    company: "",
    entryDateTime: new Date(), // 現在の日付と時刻で初期化
    attender: "",
  });

  // フォームのバリデーションステート
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // 会社情報関連のステート
  const [companyType, setCompanyType] = useState<string>("会社名");
  const [companyText, setCompanyText] = useState<string>("");
  const [companyOffice, setCompanyOffice] = useState<string>("RITS他事業所");

  // フォームのバリデーションエフェクト
  useEffect(() => {
    // フォームのバリデーション
    const isValid = Object.values(testData).every(
      (value) => (typeof value !== 'string' && typeof value !== 'undefined') || (typeof value === 'string' && value.trim() !== "")
    );
    setIsFormValid(isValid);
  }, [testData]);

  // データ登録ハンドラ
  const handleInsertData = async () => {
    await visitorRegistration(testData);

    // フォームをクリア
    setTestData({
      visitorName: "",
      company: "",
      entryDateTime: new Date(),
      attender: "",
    });
  };

  // 日時変更ハンドラ
  const handleDateTimeChange = (date: Date) => {
    setTestData((prevData) => ({
      ...prevData,
      entryDateTime: date,
    }));
  };

  // テキスト入力ハンドラ
  const handleInputChange = (fieldName: string, value: string) => {
    setTestData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // 会社名テキスト入力ハンドラ
  const handleInputChangeCompanyText = (value: string) => {
    setCompanyText(value);
  };

  // 事業所選択ハンドラ
  const handleInputChangeCompanyOffice = (value: string) => {
    setCompanyOffice(value);
  };

  // 会社種別変更ハンドラ
  const handleCompanyTypeChange = (type: string) => {
    setCompanyType(type);
  };
      
  return (
    <div>
      <Head>
        <title>来客者登録</title>
      </Head>
      <h1>来客者登録</h1>
      <Link href="/">ホームに戻る</Link>
      <div>
        {/* 来客者名の入力 */}
        <label>
          来客者名：
          <input
            type="text"
            value={testData.visitorName}
            onChange={(e) => handleInputChange("visitorName", e.target.value)}
          />
        </label>
        <br />
        {/* 会社名ラジオボタン */}
        <label>
          <input
            type="radio"
            checked={companyType === "会社名"}
            onChange={() => {
              handleCompanyTypeChange("会社名");
              handleInputChange("company", companyText);
            }}
          />
          会社名：
          {/* 会社名テキストボックス */}
          <input
            type="text"
            value={companyText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleInputChangeCompanyText(e.target.value);
              handleInputChange("company", companyText);
            }}
            disabled={companyType !== "会社名"}
          />
        </label>
        <br />
        {/* 当社ラジオボタン */}
        <label>
          <input
            type="radio"
            checked={companyType === "当社"}
            onChange={() => {
              handleCompanyTypeChange("当社");
              handleInputChange("company", companyOffice);
            }}
          />
          当社：
          <div>
            {/* 他事業所ラジオボタン */}
            <input
              type="radio"
              value={companyOffice}
              checked={companyOffice === "RITS他事業所"}
              onChange={() => {
                handleInputChangeCompanyOffice("RITS他事業所");
                handleInputChange("company", companyOffice);
              }}
              disabled={companyType !== "当社"}
            />
            他事業所
            <br />
            {/* 鳥取事業所ラジオボタン */}
            <input
              type="radio"
              value={companyOffice}
              checked={companyOffice === "RITS鳥取事業所"}
              onChange={() => {
                handleInputChangeCompanyOffice("RITS鳥取事業所");
                handleInputChange("company", companyOffice);
              }}
              disabled={companyType !== "当社"}
            />
            鳥取事業所
          </div>
        </label>
        <br />
        {/* 来訪日時入力 */}
        <label>
          来訪日時：
          <InputDateTime
            selectedDate={testData.entryDateTime}
            onChange={handleDateTimeChange}
          />
        </label>
        <br />
        {/* 担当者入力 */}
        <label>
          担当者：
          <input
            type="text"
            value={testData.attender}
            onChange={(e) => handleInputChange("attender", e.target.value)}
          />
        </label>
        <br />
        {/* 登録ボタン */}
        <button onClick={handleInsertData} disabled={!isFormValid}>
          登録
        </button>
      </div>
    </div>
  );
}
