// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import { visitorRegistration } from "../../information-processing/visitorRegistration";
import { useRouter } from "next/router";
import Head from "next/head";
import InputDateTime from "../../components/InputDateTime"; // InputDateTimeコンポーネントをインポート
import styles from "../../styles/VisitorRegistration.module.css";
import ConfirmationDialog from "../confirmation-dialog/registration.jsx";

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
  // 確認ダイアログ
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(true);
  // const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  // フォームの状態を管理するためのstate
  const [testData, setTestData] = useState<TestData>({
    visitorName: "",
    company: "",
    entryDateTime: new Date(),
    attender: "",
  });

  // フォームの初期値を保存するための初期ステート
  const [initialFormData, setInitialFormData] = useState<TestData>({
    visitorName: "",
    company: "",
    entryDateTime: new Date(),
    attender: "",
  });

  const router = useRouter();
  // ホームボタンクリック
  const buttonClickHome = () => {
    const isFormChanged =
      JSON.stringify(initialFormData) !== JSON.stringify(testData);
    if (isFormChanged) {
      const result = window.confirm("入力途中ですが、本当に戻りますか？");
      if (result) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

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
    const result = window.confirm("以下の内容で来客登録をしますか？");
    if (result) {
      const Registration_result = await visitorRegistration(testData);

      if (Registration_result == "登録成功") {
        const result = window.confirm(
          testData.visitorName +
            "さんの登録が完了しました。\n登録を続けますか？"
        );
        if (result) {
          // 登録後、フォームをクリア
          setTestData({
            visitorName: "",
            company: "",
            entryDateTime: new Date(),
            attender: "",
          });
          setInitialFormData({
            visitorName: "",
            company: "",
            entryDateTime: new Date(),
            attender: "",
          });
          handleCompanyTypeChange(COMPANY_TYPE_COMPANY);
          setCompanyText("");
          setCompanyOffice("RITS他事業所");
        } else {
          router.push("/");
        }
      } else if (Registration_result == "登録失敗") {
        alert("登録に失敗しました");
      }
    }
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
      {/* 確認ダイアログ */}
      <ConfirmationDialog
        isOpen={confirmationDialogOpen}
        onConfirm={() => {
          router.push("/");
        }}
        onCancel={() => {
          setConfirmationDialogOpen(false);
        }}
      />
      {/* ヘッド要素 */}
      <Head>
        <title>来客者登録</title>
      </Head>
      {/* タイトル */}
      <h1>来客者登録</h1>
      <div>
        {/* 入館日時の入力フォーム */}
        <h2 className={styles.h2}>入館日時</h2>
        <label>
          <InputDateTime
            selectedDate={testData.entryDateTime}
            onChange={handleDateTimeChange}
          />
        </label>
        <br />
        {/* 来客者名の入力フォーム */}
        <h2 className={styles.h2}>氏名</h2>
        ※フルネームでご記入ください
        <br />
        <label>
          <input
            type="text"
            value={testData.visitorName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("visitorName", e.target.value)
            }
          />
        </label>
        <br />
        {/* 会社名または当社のラジオボタン */}
        <h2 className={styles.h2}>会社</h2>
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
        {/* 担当者の入力フォーム */}
        <h2 className={styles.h2}>当社対応者</h2>
        <label>
          <input
            type="text"
            value={testData.attender}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("attender", e.target.value)
            }
          />
        </label>
        <br />
        {/* 登録ボタン */}
        <button onClick={handleInsertData} disabled={!isFormValid}>
          登録
        </button>
      </div>
      {/* ホームボタン */}
      <button onClick={buttonClickHome}>ホームへ</button>
    </div>
  );
}
