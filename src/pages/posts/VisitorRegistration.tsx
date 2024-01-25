// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import { visitorRegistration } from "../../util/information-processing";
import Head from "next/head";
import Link from "next/link";
import InputDateTime from "../../components/InputDateTime";

interface TestData {
  visitorName: string;
  company: string;
  entryDateTime: Date;
  attender: string;
}

export default function VisitorRegistration() {
  const [testData, setTestData] = useState<TestData>({
    visitorName: "",
    company: "",
    entryDateTime: new Date(),
    attender: "",
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [companyType, setCompanyType] = useState<string>("会社名");
  const [companyText, setCompanyText] = useState<string>("");
  const [companyOffice, setCompanyOffice] = useState<string>("RITS他事業所");

  useEffect(() => {
    const isValid = Object.values(testData).every(
      (value) =>
        (typeof value !== "string" && typeof value !== "undefined") ||
        (typeof value === "string" && value.trim() !== "")
    );
    setIsFormValid(isValid);
  }, [testData, companyType]);

  const handleInsertData = async () => {
    await visitorRegistration(testData);

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

  const handleDateTimeChange = (date: Date) => {
    setTestData((prevData) => ({
      ...prevData,
      entryDateTime: date,
    }));
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setTestData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleInputChangeCompanyText = (value: string) => {
    setCompanyText(value);
  };

  const handleInputChangeCompanyOffice = (value: string) => {
    setCompanyOffice(value);
  };

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
        <label>
          来客者名：
          <input
            type="text"
            value={testData.visitorName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("visitorName", e.target.value)
            }
          />
        </label>
        <br />
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
              handleInputChange("company", companyText);
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("attender", e.target.value)
            }
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

