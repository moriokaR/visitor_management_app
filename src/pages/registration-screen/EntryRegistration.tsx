import React, { useState, useEffect, ChangeEvent } from "react";
import { GetServerSideProps } from "next";
import { getVisitorInputInformation } from "../../information-processing/visitor-input-information";
import { entryRegistration } from "../../information-processing/entryRegistration";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import Head from "next/head";
import NumberInput from "../../components/NumberInput";
import styles from "../../styles/EntryRegistration.module.css";
import RegistrationDialog from "../confirmation-dialog/registrationDialog";
import SuccessfulRegistrationDialog from "../confirmation-dialog/successfulRegistrationDialog";
import HomeDialog from "../confirmation-dialog/homeDialog";

const RENT_ENTRY_CARD = "入館証貸出あり";
const NOT_RENT_ENTRY_CARD = "入館証貸出なし";

const columns = [
  { field: "visitorID", headerName: "visitorID", width: 70 },
  { field: "entryDateTime", headerName: "entryDateTime", width: 200 },
  { field: "attender", headerName: "attender", width: 200 },
  { field: "visitorName", headerName: "visitorName", width: 200 },
  { field: "company", headerName: "company", width: 200 },
];

// VisitorData型の定義
interface VisitorData {
  visitorID: number;
  entryDateTime: string;
  attender: string;
  visitorName: string;
  company: string;
}

interface HomePageProps {
  initialData: VisitorData[];
}

// フォームのデータ型を定義
interface TestData {
  visitorID: number;
  entryCardType: string;
  entryCardNumber: number;
}

const HomePage: React.FC<HomePageProps> = ({ initialData }) => {
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
      testData.visitorID != initialFormData.visitorID ||
      testData.visitorID != initialFormData.visitorID ||
      testData.visitorID != initialFormData.visitorID;
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
    setRetentionCardType("Guest");
    setRetentionCardNumber(0);
    // 読み込み
    router.push("/registration-screen/EntryRegistration");
  }, [testData.visitorID]);

  // 情報取れてるかの確認。
  useEffect(() => {
    console.log(testData);
  }, [testData]);

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

  // TastDataの変更ハンドラ
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

      // testDataのVisitorIDを変更
      handleInputChange("visitorID", selectedVisitorID);
    } else {
      // 選択が解除された場合、0 を設定
      handleInputChange("visitorID", 0);
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
      alert("登録に失敗しました");
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
    setRetentionCardType("Guest");
    setRetentionCardNumber(0);
    // 読み込み
    router.push("/registration-screen/EntryRegistration");
  };
  return (
    <div>
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
        name={"てすと"}
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
      {/* ヘッド要素 */}
      <Head>
        <title>入館登録</title>
      </Head>
      <div>
        {/* データの表示 */}
        <h2>入館情報</h2>

        <DataGrid
          rows={initialData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          onRowSelectionModelChange={handleSelectionModelChange} // 選択状態変更時のコールバック
          getRowId={(row) => row.visitorID}
        />
      </div>

      {/* 会社名または当社のラジオボタン */}
      <label>
        <input
          type="radio"
          checked={rentState === RENT_ENTRY_CARD}
          onChange={() => {
            setRentState(RENT_ENTRY_CARD);
            // 保持データをtestDataへ追加
            handleInputChange("entryCardNumber", retentionCardNumber);
            handleInputChange("entryCardType", retentionCardType);
          }}
        />
        入館証貸出あり
        <div>
          <div>
            <h2 className={styles.h2}>種別</h2>
            {/* カードタイプの選択ラジオボタン */}
            {/* <div className={styles.radioButton}> */}
            <div>
              <input
                type="radio"
                defaultValue="Guest"
                checked={retentionCardType === "Guest"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // 保持データへ追加後、testDataへ追加
                  setRetentionCardType(e.target.value);
                  handleInputChange("entryCardType", e.target.value);
                }}
                disabled={rentState !== RENT_ENTRY_CARD}
              />
              Guest
              <br />
              <input
                type="radio"
                defaultValue="リクルートカード"
                checked={retentionCardType === "リクルートカード"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // 保持データへ追加後、testDataへ追加
                  setRetentionCardType(e.target.value);
                  handleInputChange("entryCardType", e.target.value);
                }}
                disabled={rentState !== RENT_ENTRY_CARD}
              />
              リクルートカード
              <br />
              <input
                type="radio"
                defaultValue="その他"
                checked={retentionCardType === "その他"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // 保持データへ追加後、testDataへ追加
                  setRetentionCardType(e.target.value);
                  handleInputChange("entryCardType", e.target.value);
                }}
                disabled={rentState !== RENT_ENTRY_CARD}
              />
              その他
            </div>
          </div>
          <div>
            {/* 登録時に判定外かどうかが必要！！！！！ */}
            <h2 className={styles.h2}>番号</h2>
            <NumberInput
              onNumberChange={handleNumberChange}
              isDisabled={rentState !== RENT_ENTRY_CARD}
            />
          </div>
        </div>
      </label>
      <br />
      <label>
        <input
          type="radio"
          checked={rentState === NOT_RENT_ENTRY_CARD}
          onChange={() => {
            setRentState(NOT_RENT_ENTRY_CARD);
            // testDataへ追加
            handleInputChange("entryCardType", "未貸出");
            handleInputChange("entryCardNumber", 99);
          }}
        />
        入館証貸出なし
      </label>
      <br />
      {/* 登録ボタン */}
      <button onClick={handleInsertData} disabled={!isFormValid}>
        登録
      </button>
      <br />
      {/* ホームボタン */}
      <button onClick={buttonClickHome}>ホームへ</button>
    </div>
  );
};

// 画面接続時、データ取得
export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  // APIからデータを取得
  const apiResponse = await getVisitorInputInformation();

  if (apiResponse == "情報取得失敗") {
    alert("情報取得に失敗しました");
    const initialData: VisitorData[] = [];
    return {
      props: {
        initialData,
      },
    };
  }
  // ApiResponse型からVisitorData[]型に変換
  const initialData: VisitorData[] = apiResponse.data;

  return {
    props: {
      initialData,
    },
  };
};

export default HomePage;
