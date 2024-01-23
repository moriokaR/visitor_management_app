// src\pages\posts\VisitorRegistration.tsx
import React, { useState, useEffect } from "react";
import { visitorRegistration } from "../../util/information-processing";
import Head from "next/head";
import Link from "next/link";

export default function FirstPost() {
  const testData = {
    visitorName: "テスト一号君",
    company: "テスト社",
    entryDateTime: "2000-01-01 00:00:00",
    attender: "理光花子",
  }

  const handleInsertData = async () => {
    console.log(testData);
    await visitorRegistration(testData);
  };

  return (
    <div>
      <Head>
        <title>来客者登録画面</title>
      </Head>
      <h1>来客者登録画面！</h1>
      <Link href="/">ホームへ戻る</Link>
      <div>
        <button onClick={handleInsertData}>Insert Data</button>
      </div>
    </div>
  );
}
