// pages/index.js
import { useRouter } from "next/router";
import Head from "next/head";

const HomePage = () => {
  const router = useRouter();
  const handlePageClick = () => {
    router.push("/posts/VisitorRegistration");
  };
  const buttonClickEn = () => {
    router.push("/posts/EntryRegistration");
  };
  const buttonClickEx = () => {
    router.push("/posts/ExitRegistration");
  };

  const containerStyles = {
    cursor: "pointer",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "pre-line",
  };
  const buttonContainerStyles = {
    position: "absolute" as "absolute",
    top: "50px",
    right: "50px",
  };

  return (
    <div style={containerStyles} onClick={handlePageClick}>
      <Head>
        <title>ホーム画面</title>
      </Head>
      <div>
        <center>
          <h1>ようこそ！</h1>
          <h1>リコーITソリューションズ</h1>
          <h1>鳥取事業所へ！</h1>
          <br></br>
          <h3>いらっしゃいませ。</h3>
          <h3>画面をタップして、</h3>
          <h3>お客様情報を登録してください。</h3>
        </center>
      </div>
      <div style={buttonContainerStyles}>
        <button onClick={buttonClickEn}>入館登録画面</button>
        <button onClick={buttonClickEx}>退館登録画面</button>
      </div>
    </div>
  );
};

export default HomePage;
