// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import { visitorRegistration } from "../../information-processing/visitorRegistration";
import Head from "next/head";
import Link from "next/link";
import InputDateTime from "../../components/InputDateTime"; // InputDateTimeコンポーネントをインポート

// 会社ラジオボタン定数
const COMPANY_TYPE_COMPANY = "会社名";
const COMPANY_TYPE_OUR_COMPANY = "当社";

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
  const [companyType, setCompanyType] = useState<string>(COMPANY_TYPE_COMPANY);
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
    handleCompanyTypeChange(COMPANY_TYPE_COMPANY);
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
            checked={companyType === COMPANY_TYPE_COMPANY}
            onChange={() => {
              handleCompanyTypeChange(COMPANY_TYPE_COMPANY);
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
            disabled={companyType !== COMPANY_TYPE_COMPANY}
          />
        </label>
        <br />
        <label>
          <input
            type="radio"
            checked={companyType === COMPANY_TYPE_OUR_COMPANY}
            onChange={() => {
              handleCompanyTypeChange(COMPANY_TYPE_OUR_COMPANY);
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
              disabled={companyType !== COMPANY_TYPE_OUR_COMPANY}
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
              disabled={companyType !== COMPANY_TYPE_OUR_COMPANY}
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