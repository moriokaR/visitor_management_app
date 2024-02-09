import React, { useState, useEffect, ChangeEvent } from "react";
import { GetServerSideProps } from "next";
import { getVisitorInputInformation } from "../../information-processing/visitor-input-information";
import { getRentCardInformation } from "../../information-processing/rent-card-information";
import { entryRegistration } from "../../information-processing/entryRegistration";
import { DataGrid, jaJP } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import Head from "next/head";
import NumberInput from "../../components/NumberInput";
import styles from "../../styles/EntryRegistration.module.css";
import RegistrationDialog from "../confirmation-dialog/registrationDialog";
import SuccessfulRegistrationDialog from "../confirmation-dialog/successfulRegistrationDialog";
import HomeDialog from "../confirmation-dialog/homeDialog";
import FailureRegistrationDialog from "../alert-dialog/failureRegistrationDialog";

const RENT_ENTRY_CARD = "入館証貸出あり";
const NOT_RENT_ENTRY_CARD = "入館証貸出なし";

const columns = [
  // { field: "visitorID", headerName: "visitorID", width: 70 },
  { field: "entryDateTime", headerName: "日時", width: 200 },
  { field: "visitorName", headerName: "氏名", width: 200 },
  { field: "company", headerName: "会社", width: 200 },
  { field: "attender", headerName: "当社対応者", width: 200 },
];

// VisitorData型の定義
interface VisitorData {
  visitorID: number;
  entryDateTime: string;
  attender: string;
  visitorName: string;
  company: string;
}

// CardData型の定義
interface CardData {
  type: string;
  number: number;
}

interface HomePageProps {
  initialData: VisitorData[];
  rentCardData: CardData[];
}

// フォームのデータ型を定義
interface TestData {
  visitorID: number;
  entryCardType: string;
  entryCardNumber: number | string;
}

const HomePage: React.FC<HomePageProps> = ({ initialData, rentCardData }) => {
  // アラート用
  const [alertOpen, setAlertOpen] = useState(false);

  // キーボードが表示されているかどうか
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // 選択されている氏名
  const [visitorName, setVisitorName] = useState("");

  // 確認ダイアログ
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [successRegistrationOpen, setSuccessRegistrationOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);

  // 登録ボタン有効化
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // 貸し出すか貸し出さないか
  const [rentState, setRentState] = useState<string>(RENT_ENTRY_CARD);
  // 保持用データ
  const [retentionCardType, setRetentionCardType] = useState<string>("Guest");
  const [retentionCardNumber, setRetentionCardNumber] = useState<number>(0);

  const [testData, setTestData] = useState<TestData>({
    visitorID: 0,
    entryCardType: "Guest",
    entryCardNumber: 0,
  });

  // フォームのバリデーションを更新
  useEffect(() => {
    const isFormChanged =
      testData.visitorID != initialFormData.visitorID &&
      testData.entryCardNumber != initialFormData.entryCardNumber;
    // 全てのデータが初期値と違うときは、登録ボタンを有効化
    if (isFormChanged) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [testData]);

  // IDが変わったとき、初期化
  useEffect(() => {
    setTestData((prevData) => ({
      ...prevData,
      entryCardType: "Guest",
      entryCardNumber: 0,
    }));
    setRentState(RENT_ENTRY_CARD);
    setRetentionCardType("Guest");
    setRetentionCardNumber(0);
  }, [testData.visitorID]);

  // 情報取れてるかの確認。
  // useEffect(() => {
  //   console.log(testData);
  // }, [testData]);

  const initialFormData = {
    visitorID: 0,
    entryCardType: "Guest",
    entryCardNumber: 0,
  };

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

  // entryCardNumber を更新するためのコールバック関数
  const handleNumberChange = (entryCardNumber: number) => {
    // 保持用データへ追加
    setRetentionCardNumber(entryCardNumber);
    // testDataへ追加
    handleInputChange("entryCardNumber", entryCardNumber);
  };

  // TestDataの変更ハンドラ
  const handleInputChange = (fieldName: string, value: string | number) => {
    setTestData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // DataGrid の選択状態が変更されたときのコールバック
  const handleSelectionModelChange = (selectionModel: any) => {
    if (selectionModel.length > 0) {
      const selectedVisitorID = parseInt(selectionModel[0], 10);

      // Find the selected visitor in the initialData array
      const selectedVisitor = initialData.find(
        (visitor) => visitor.visitorID === selectedVisitorID
      );

      if (selectedVisitor) {
        // Set the visitorName to the selected visitor's name
        setVisitorName(selectedVisitor.visitorName);
      }

      // testDataのVisitorIDを変更
      handleInputChange("visitorID", selectedVisitorID);
    } else {
      // 選択が解除された場合、0 を設定
      handleInputChange("visitorID", 0);
      setVisitorName(""); // Clear visitorName when no visitor is selected
    }
  };

  // データを登録するハンドラ
  const handleInsertData = async () => {
    setRegistrationOpen(true);
  };
  // 登録しますか？　ok処理
  const okRegistration = async () => {
    const Registration_result = await entryRegistration(testData);
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
      visitorID: 0,
      entryCardType: "Guest",
      entryCardNumber: 0,
    });
    setRentState(RENT_ENTRY_CARD);
    setRetentionCardType("Guest");
    setRetentionCardNumber(0);
    // 読み込み
    router.push("/registration-screen/EntryRegistration");
  };
  return (
    <div className={styles.content}>
      {/* ヘッド要素 */}
      <Head>
        <title>入館登録</title>
      </Head>
      {/* アラートダイアログ */}
      <FailureRegistrationDialog
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
        name={visitorName}
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
      {/* キーボードが表示されている時、背景を黒塗り */}
      {keyboardVisible && <div className={styles.overlay}></div>}

      {/* 入館情報登録画面 */}
      <div className={styles.box}>
        {/* タイトル */}
        <h1 className={styles.h1}>入館登録</h1>
        {/* データの表示 */}
        <DataGrid
          rows={initialData}
          columns={columns}
          style={{ height: "371px", width: "98%", margin: "0 auto", backgroundColor: "#ffffff" }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          onRowSelectionModelChange={handleSelectionModelChange} // 選択状態変更時のコールバック
          getRowId={(row) => row.visitorID}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />
        {/* 会社名または当社のラジオボタン */}
        <div className={styles.radioLabelRent}>
          <input
            id="RENT_ENTRY_CARD"
            className={styles.radioInput}
            type="radio"
            checked={rentState === RENT_ENTRY_CARD}
            onChange={() => {
              setRentState(RENT_ENTRY_CARD);
              // 保持データをtestDataへ追加
              handleInputChange("entryCardNumber", retentionCardNumber);
              handleInputChange("entryCardType", retentionCardType);
            }}
          />
          <label className={styles.rentLabel} htmlFor="RENT_ENTRY_CARD">
            入館証貸出あり
            {/* カードタイプの選択ラジオボタン */}
            <h2 className={styles.h2}>種別</h2>
            <div className={styles.radioLabelType}>
              <input
                type="radio"
                id="Guest"
                className={styles.radioInput}
                defaultValue="Guest"
                checked={retentionCardType === "Guest"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // 保持データへ追加後、testDataへ追加
                  setRetentionCardType(e.target.value);
                  handleInputChange("entryCardType", e.target.value);
                }}
                disabled={rentState !== RENT_ENTRY_CARD}
              />
              <label htmlFor="Guest">Guest</label>
            </div>
            <div className={styles.radioLabelType}>
              <input
                type="radio"
                id="リクルートカード"
                className={styles.radioInput}
                defaultValue="リクルートカード"
                checked={retentionCardType === "リクルートカード"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // 保持データへ追加後、testDataへ追加
                  setRetentionCardType(e.target.value);
                  handleInputChange("entryCardType", e.target.value);
                }}
                disabled={rentState !== RENT_ENTRY_CARD}
              />
              <label htmlFor="リクルートカード">リクルートカード</label>
            </div>
            <div className={styles.radioLabelType}>
              <input
                type="radio"
                id="その他"
                className={styles.radioInput}
                defaultValue="その他"
                checked={retentionCardType === "その他"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // 保持データへ追加後、testDataへ追加
                  setRetentionCardType(e.target.value);
                  handleInputChange("entryCardType", e.target.value);
                }}
                disabled={rentState !== RENT_ENTRY_CARD}
              />
              <label htmlFor="その他">その他</label>
            </div>
            {/* 番号入力 */}
            <h2 className={styles.h2}>番号</h2>
            <NumberInput
              onNumberChange={handleNumberChange}
              // コールバック関数
              keyboardVisibleChange={(visible: boolean) =>
                setKeyboardVisible(visible)
              }
              isDisabled={rentState !== RENT_ENTRY_CARD}
              testDataNumber={testData.entryCardNumber}
              // 貸出中のカード番号渡す
              getRentCardData={rentCardData}
              testDataType={testData.entryCardType}
            />
          </label>
        </div>
        <div className={styles.radioLabelRent}>
          <input
            type="radio"
            id="NOT_RENT_ENTRY_CARD"
            className={styles.radioInput}
            checked={rentState === NOT_RENT_ENTRY_CARD}
            onChange={() => {
              setRentState(NOT_RENT_ENTRY_CARD);
              // testDataへ追加
              handleInputChange("entryCardType", "-");
              handleInputChange("entryCardNumber", "-");
            }}
          />
          <label className={styles.rentLabel} htmlFor="NOT_RENT_ENTRY_CARD">
            入館証貸出なし
          </label>
        </div>
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
};

// 画面接続時、データ取得
export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  // APIからデータを取得
  const apiResponseVisitorInput = await getVisitorInputInformation();
  const apiResponseRentCard = await getRentCardInformation();

  if (
    apiResponseVisitorInput == "情報取得失敗" ||
    apiResponseRentCard == "情報取得失敗"
  ) {
    // カスタムアラートは無理そう
    alert("情報取得に失敗しました");
    const initialData: VisitorData[] = [];
    const rentCardData: CardData[] = [];
    return {
      props: {
        initialData,
        rentCardData,
      },
    };
  }
  // ApiResponse型からVisitorData[]型に変換
  const initialData: VisitorData[] = apiResponseVisitorInput.data;
  const rentCardData: CardData[] = apiResponseRentCard.data;

  return {
    props: {
      initialData,
      rentCardData,
    },
  };
};

export default HomePage;
