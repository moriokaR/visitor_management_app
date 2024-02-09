// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import { visitorRegistration } from "../../information-processing/visitorRegistration";
import { useRouter } from "next/router";
import Head from "next/head";
import InputDateTime from "../../components/InputDateTime"; // InputDateTimeコンポーネントをインポート
import styles from "../../styles/VisitorRegistration.module.css";
import RegistrationDialog from "../confirmation-dialog/registrationDialog";
import SuccessfulRegistrationDialog from "../confirmation-dialog/successfulRegistrationDialog";
import HomeDialog from "../confirmation-dialog/homeDialog";
import FailureRegistrationDialog from "../alert-dialog/failureRegistrationDialog";

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
  // アラート用
  const [alertOpen, setAlertOpen] = useState(false);

  // 確認ダイアログ
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [successRegistrationOpen, setSuccessRegistrationOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);

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
      setHomeOpen(true);
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
    setRegistrationOpen(true);
  };
  // 登録しますか？　ok処理
  const okRegistration = async () => {
    const Registration_result = await visitorRegistration(testData);
    if (Registration_result == "登録成功") {
      setSuccessRegistrationOpen(true);
    } else if (Registration_result == "登録失敗") {
      // alert("登録に失敗しました");
      setAlertOpen(true);
    }
  };

  // 登録　続ける
  const continueRegistration = async () => {
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
  };

  // 日時の変更ハンドラ
  const handleDateTimeChange = (date: Date) => {
    setTestData((prevData) => ({
      ...prevData,
      entryDateTime: date,
    }));
  };

  // 入力の変更ハンドラ
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
    <div className={styles.content}>
      {/* ヘッド要素 */}
      <Head>
        <title>来客者登録</title>
      </Head>
      {/* アラートダイアログ */}
      <FailureRegistrationDialog
        failureName={[]}
        successfulName={[]}
        isOpen={alertOpen}
        onConfirm={() => {
          setAlertOpen(false);
        }}
      />
      {/* 確認ダイアログ */}
      <RegistrationDialog
        isOpen={registrationOpen}
        onConfirm={() => {
          setRegistrationOpen(false);
          okRegistration();
        }}
        onCancel={() => {
          setRegistrationOpen(false);
        }}
      />
      <SuccessfulRegistrationDialog
        name={testData.visitorName}
        isOpen={successRegistrationOpen}
        onConfirm={() => {
          setSuccessRegistrationOpen(false);
          continueRegistration();
        }}
        onCancel={() => {
          setSuccessRegistrationOpen(false);
          router.push("/");
        }}
      />
      <HomeDialog
        isOpen={homeOpen}
        onConfirm={() => {
          setHomeOpen(false);
          router.push("/");
        }}
        onCancel={() => {
          setHomeOpen(false);
        }}
      />

      {/* 来客者情報登録画面 */}
      <div className={styles.box}>
        {/* タイトル */}
        <h1 className={styles.h1}>来客者登録</h1>
        {/* 入館日時の入力フォーム */}
        <h2 className={styles.h2}>入館日時</h2>
        <label className={styles.labelDateTime}>
          <InputDateTime
            selectedDate={testData.entryDateTime}
            onChange={handleDateTimeChange}
          />
        </label>
        {/* 来客者名の入力フォーム */}
        <h2 className={styles.h2}>氏名</h2>
        <label className={styles.hintLabel}>※フルネームでご記入ください</label>
        <label className={styles.inputLabel}>
          <input
            className={styles.inputField}
            type="text"
            value={testData.visitorName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("visitorName", e.target.value)
            }
          />
        </label>
        {/* 会社名または当社のラジオボタン */}
        <h2 className={styles.h2}>会社</h2>
        <div className={styles.radioLabelCompany}>
          <input
            id="COMPANY_TYPE_COMPANY"
            className={styles.radioInput}
            type="radio"
            checked={companyType === COMPANY_TYPE_COMPANY}
            onChange={() => {
              handleCompanyTypeChange(COMPANY_TYPE_COMPANY);
              handleInputChange("company", companyText);
            }}
          />
          <label className={styles.companyLabel} htmlFor="COMPANY_TYPE_COMPANY">
            会社名：
            <input
              className={styles.companyInputField}
              type="text"
              value={companyText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInputChangeCompanyText(e.target.value);
                handleInputChange("company", e.target.value);
              }}
              disabled={companyType !== COMPANY_TYPE_COMPANY}
            />
          </label>
        </div>
        <div className={styles.radioLabelCompany}>
          <input
            id="COMPANY_TYPE_OUR_COMPANY"
            className={styles.radioInput}
            type="radio"
            checked={companyType === COMPANY_TYPE_OUR_COMPANY}
            onChange={() => {
              handleCompanyTypeChange(COMPANY_TYPE_OUR_COMPANY);
              handleInputChange("company", companyOffice);
            }}
          />
          <label
            className={styles.companyLabel}
            htmlFor="COMPANY_TYPE_OUR_COMPANY"
          >
            当社：
            {/* 事業所の選択ラジオボタン */}
            <div className={styles.radioLabelOffice1}>
              <input
                type="radio"
                id="RITS他事業所"
                className={styles.radioInput}
                defaultValue="RITS他事業所"
                checked={companyOffice === "RITS他事業所"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleInputChangeCompanyOffice("RITS他事業所");
                  handleInputChange("company", e.target.value);
                }}
                disabled={companyType !== COMPANY_TYPE_OUR_COMPANY}
              />
              <label htmlFor="RITS他事業所">他事業所</label>
            </div>
            <div className={styles.radioLabelOffice2}>
              <input
                type="radio"
                id="RITS鳥取事業所"
                className={styles.radioInput}
                defaultValue="RITS鳥取事業所"
                checked={companyOffice === "RITS鳥取事業所"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleInputChangeCompanyOffice("RITS鳥取事業所");
                  handleInputChange("company", e.target.value);
                }}
                disabled={companyType !== COMPANY_TYPE_OUR_COMPANY}
              />
              <label htmlFor="RITS鳥取事業所">鳥取事業所</label>
            </div>
          </label>
        </div>
        {/* 担当者の入力フォーム */}
        <h2 className={styles.h2}>当社対応者</h2>
        <label className={styles.inputLabel}>
          <input
            className={styles.inputField}
            type="text"
            value={testData.attender}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("attender", e.target.value)
            }
          />
        </label>
        {/* 登録ボタン */}
        <button
          className={`${styles.buttonInsertData} ${styles.button}`}
          onClick={handleInsertData}
          disabled={!isFormValid}
        >
          登録
        </button>
        {/* ホームボタン */}
        <button
          className={`${styles.buttonClickHome} ${styles.button}`}
          onClick={buttonClickHome}
        >
          ホームへ
        </button>
      </div>
    </div>
  );
}
