// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import { visitorRegistration } from "../../util/information-processing";
import Head from "next/head";
import Link from "next/link";
import InputDateTime from "../../components/InputDateTime"; // InputDateTimeコンポーネントをインポート

// フォームのデータ型を定義
interface TestData {
  visitorName: string;
  company: string;
  entryDateTime: Date;
  attender: string;
}

// メインのコンポーネント
export default function VisitorRegistration() {
  // フォームの状態を管理するためのstate
  const [testData, setTestData] = useState<TestData>({
    visitorName: "",
    company: "",
    entryDateTime: new Date(),
    attender: "",
  });

  // フォームのバリデーション状態
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [companyType, setCompanyType] = useState<string>("会社名");
  const [companyText, setCompanyText] = useState<string>("");
  const [companyOffice, setCompanyOffice] = useState<string>("RITS他事業所");

  // フォームのバリデーションを更新
  useEffect(() => {
    const isValid = Object.values(testData).every(
      (value) =>
        (typeof value !== "string" && typeof value !== "undefined") ||
        (typeof value === "string" && value.trim() !== "")
    );
    setIsFormValid(isValid);
  }, [testData, companyType]);

  // データを登録するハンドラ
  const handleInsertData = async () => {
    await visitorRegistration(testData);

    // 登録後、フォームをクリア
    setTestData({
      visitorName: "",
      company: "",
      entryDateTime: new Date(),
      attender: "",
    });
    handleCompanyTypeChange("会社名");
    setCompanyText("");
    setCompanyOffice("RITS他事業所");
  };

  // 日時の変更ハンドラ
  const handleDateTimeChange = (date: Date) => {
    setTestData((prevData) => ({
      ...prevData,
      entryDateTime: date,
    }));
  };

  // テキスト入力の変更ハンドラ
  const handleInputChange = (fieldName: string, value: string) => {
    setTestData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // 会社名テキストボックスの変更ハンドラ
  const handleInputChangeCompanyText = (value: string) => {
    setCompanyText(value);
  };

  // 事業所の変更ハンドラ
  const handleInputChangeCompanyOffice = (value: string) => {
    setCompanyOffice(value);
  };

  // 会社タイプの変更ハンドラ
  const handleCompanyTypeChange = (type: string) => {
    setCompanyType(type);
  };

  return (
    <div>
      {/* ヘッド要素 */}
      <Head>
        <title>来客者登録</title>
      </Head>
      {/* タイトル */}
      <h1>来客者登録</h1>
      {/* ホームに戻るリンク */}
      <Link href="/">ホームに戻る</Link>
      <div>
        {/* 来客者名の入力フォーム */}
        <label>
          来客者名：
          <input
            type="text"
            value={testData.visitorName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("visitorName", e.target.value)}
          />
        </label>
        <br />
        {/* 会社名または当社のラジオボタン */}
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
          <input
            type="text"
            value={companyText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleInputChangeCompanyText(e.target.value);
              handleInputChange("company", e.target.value);
            }}
            disabled={companyType !== "会社名"}
          />
        </label>
        <br />
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
            {/* 事業所の選択ラジオボタン */}
            <input
              type="radio"
              value="RITS他事業所"
              checked={companyOffice === "RITS他事業所"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInputChangeCompanyOffice("RITS他事業所");
                handleInputChange("company", e.target.value);
              }}
              disabled={companyType !== "当社"}
            />
            他事業所
            <br />
            <input
              type="radio"
              value="RITS鳥取事業所"
              checked={companyOffice === "RITS鳥取事業所"}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInputChangeCompanyOffice("RITS鳥取事業所");
                handleInputChange("company", e.target.value);
              }}
              disabled={companyType !== "当社"}
            />
            鳥取事業所
          </div>
        </label>
        <br />
        {/* 来訪日時の入力フォーム */}
        <label>
          来訪日時：
          <InputDateTime
            selectedDate={testData.entryDateTime}
            onChange={handleDateTimeChange}
          />
        </label>
        <br />
        {/* 担当者の入力フォーム */}
        <label>
          担当者：
          <input
            type="text"
            value={testData.attender}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("attender", e.target.value)}
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