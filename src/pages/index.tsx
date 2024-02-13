// pages/index.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/index.module.css";

const HomePage = () => {
  const router = useRouter();
  const [openEnExBotton, setOpenEnExBotton] = useState(false);

  const handlePageClick = () => {
    router.push("/registration-screen/VisitorRegistration");
  };
  const buttonClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenEnExBotton(!openEnExBotton);
    e.stopPropagation();
  };
  const buttonClickEn = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/registration-screen/EntryRegistration");
    e.stopPropagation();
  };
  const buttonClickEx = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/registration-screen/ExitRegistration");
    e.stopPropagation();
  };

  return (
    <div className={styles.content}>
      {/* ヘッド要素 */}
      <Head>
        <title>ホーム画面</title>
      </Head>
      <div className={styles.box} onClick={handlePageClick}>
        {/* ボタン */}
        {openEnExBotton ? (
          <>
            <button
              className={`${styles.buttonEnEx} ${styles.button}`}
              onClick={buttonClickOpen}
            >
              管理者
            </button>
            <button
              className={`${styles.buttonEnEx} ${styles.button}`}
              onClick={buttonClickEn}
            >
              入館登録画面
            </button>
            <button
              className={`${styles.buttonEnEx} ${styles.button}`}
              onClick={buttonClickEx}
            >
              退館登録画面
            </button>
          </>
        ) : (
          <button
            className={`${styles.buttonEnExV} ${styles.button}`}
            onClick={buttonClickOpen}
          >
            管理者
          </button>
        )}

        <div>
          <center>
            <h1 className={openEnExBotton ? styles.h1TopOpen : styles.h1Top}>
              ようこそ！
            </h1>
            <h1 className={styles.h1}>リコーITソリューションズ</h1>
            <h1 className={styles.h1}>鳥取事業所へ！</h1>
            <label className={styles.labelTop}>画面をタップして、</label>
            <label className={styles.label}>
              お客様情報を登録してください。
            </label>
          </center>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
