import React, { useState, useEffect, ChangeEvent } from "react";
import { GetServerSideProps } from "next";
import { getEntryInformation } from "../../information-processing/entry-information";
import { exitRegistration } from "../../information-processing/exitRegistration";
import { DataGrid, jaJP } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import InputDateTime from "../../components/InputDateTime"; // InputDateTimeコンポーネントをインポート
import Head from "next/head";
import styles from "../../styles/ExitRegistration.module.css";
import RegistrationDialog from "../confirmation-dialog/registrationDialog";
import SuccessfulRegistrationDialog from "../confirmation-dialog/successfulRegistrationDialog";
import HomeDialog from "../confirmation-dialog/homeDialog";
import FailureRegistrationDialog from "../alert-dialog/failureRegistrationDialog";

const columns = [
  // { field: "VisitorID", headerName: "visitorID", width: 70 },
  // { field: "entrycardid", headerName: "入館証ID", width: 70 },
  { field: "entrydatetime", headerName: "日時", width: 200 },
  { field: "visitorname", headerName: "氏名", width: 200 },
  { field: "company", headerName: "会社", width: 200 },
  { field: "attender", headerName: "当社対応者", width: 200 },
  { field: "type", headerName: "入館証種別", width: 200 },
  { field: "number", headerName: "入館証番号", width: 200 },
];

// VisitorData型の定義
interface VisitorData {
  VisitorID: number;
  entrycardid: number;
  entrydatetime: string;
  attender: string;
  visitorname: string;
  company: string;
  type: string;
  number: number | string;
}

interface HomePageProps {
  initialData: VisitorData[];
}

// フォームのデータ型を定義
interface TestData {
  VisitorIDs: number[];
  EntryCardIDs: number[];
  ExitDateTime: Date;
  ExitUser: string;
  Comment: string;
}

const HomePage: React.FC<HomePageProps> = ({ initialData }) => {
  // アラート用
  const [alertOpen, setAlertOpen] = useState(false);

  // 選択されている氏名
  const [visitorNames, setVisitorNames] = useState<string[]>([]);

  // 選択されている退館登録者名
  const [SelectExitUser, setSelectExitUser] = useState<string>("牧島史子");
  const [InExitUser, setInExitUser] = useState<string>("");

  // 確認ダイアログ
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [successRegistrationOpen, setSuccessRegistrationOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);

  // 登録ボタン有効化
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [testData, setTestData] = useState<TestData>({
    VisitorIDs: [],
    EntryCardIDs: [],
    ExitDateTime: new Date(),
    ExitUser: "牧島史子",
    Comment: "",
  });

  const [initialFormData, setInitialFormData] = useState<TestData>({
    VisitorIDs: [],
    EntryCardIDs: [],
    ExitDateTime: new Date(),
    ExitUser: "牧島史子",
    Comment: "",
  });

  // フォームのバリデーションを更新
  useEffect(() => {
    const isFormChanged =
      testData.VisitorIDs.length != 0 && testData.ExitUser.trim() != "";
    // IDが空じゃない場合は、登録ボタンを有効化
    if (isFormChanged) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [testData]);

  //   情報取れてるかの確認。
  // useEffect(() => {
  //   console.log(testData);
  //   console.log(visitorNames);
  // }, [testData]);

  const router = useRouter();

  // ホームボタンクリック
  const buttonClickHome = () => {
    const isFormChanged =
      testData.VisitorIDs.length !== 0 ||
      JSON.stringify(initialFormData.ExitDateTime) !==
        JSON.stringify(testData.ExitDateTime) ||
      JSON.stringify(initialFormData.ExitUser) !==
        JSON.stringify(testData.ExitUser) ||
      JSON.stringify(initialFormData.Comment) !==
        JSON.stringify(testData.Comment);

    if (isFormChanged) {
      setHomeOpen(true);
    } else {
      router.push("/");
    }
  };

  // TestDataの変更ハンドラ
  const handleInputChange = (
    fieldName: string,
    value: string | number | number[]
  ) => {
    setTestData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // DataGrid の選択状態が変更されたときのコールバック
  const handleSelectionModelChange = (selectionModel: any) => {
    if (selectionModel.length > 0) {
      // 選択されたVisitorIDのnumber配列を作成
      const selectedVisitorIDs = selectionModel.map((selectedItem: string) =>
        parseInt(selectedItem, 10)
      );

      // 選択されたEntryCardIDの配列を取得
      const selectedEntryCardIDs: number[] = initialData
        .filter((entryCardID) =>
          selectedVisitorIDs.includes(entryCardID.VisitorID)
        )
        .map((entryCardID) => entryCardID.entrycardid);

      // 選択されたVisitorの名前の配列を取得
      const selectedVisitorNames = initialData
        .filter((visitor) => selectedVisitorIDs.includes(visitor.VisitorID))
        .map((visitor) => visitor.visitorname);

      // testDataのVisitorIDsを変更
      handleInputChange("VisitorIDs", selectedVisitorIDs);
      // testDataのEntryCardIDsを変更
      handleInputChange("EntryCardIDs", selectedEntryCardIDs);

      // Set the visitorName to the selected visitors' names
      setVisitorNames(selectedVisitorNames);
    } else {
      // 選択が解除された場合、空の配列を設定
      handleInputChange("VisitorIDs", []);
      handleInputChange("EntryCardIDs", []);
      setVisitorNames([]); // Clear visitorName when no visitor is selected
    }
  };

  // データを登録するハンドラ
  const handleInsertData = async () => {
    setRegistrationOpen(true);
  };

  // 日時の変更ハンドラ
  const handleDateTimeChange = (date: Date) => {
    setTestData((prevData) => ({
      ...prevData,
      ExitDateTime: date,
    }));
  };

  // 登録しますか？　ok処理
  const okRegistration = async () => {
    const Registration_result = await exitRegistration(testData);
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
      VisitorIDs: [],
      EntryCardIDs: [],
      ExitDateTime: new Date(),
      ExitUser: "牧島史子",
      Comment: "",
    });
    setInitialFormData({
      VisitorIDs: [],
      EntryCardIDs: [],
      ExitDateTime: new Date(),
      ExitUser: "牧島史子",
      Comment: "",
    });
    // 読み込み
    router.push("/registration-screen/ExitRegistration");
  };

  // 退館登録者の設定
  useEffect(() => {
    if (SelectExitUser == "その他") {
      handleInputChange("ExitUser", InExitUser);
    } else {
      setInExitUser("");
      handleInputChange("ExitUser", SelectExitUser);
    }
  }, [SelectExitUser, InExitUser]);

  return (
    <div>
      {/* アラートダイアログ */}
      <FailureRegistrationDialog
        isOpen={alertOpen}
        onConfirm={() => {
          setAlertOpen(false);
          // ここで、読み込みなおし
          router.push("/registration-screen/ExitRegistration");
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
        name={visitorNames}
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
        <title>退館登録</title>
      </Head>

      <div>
        {/* データの表示 */}
        <h2>退館情報</h2>
        <DataGrid
          rows={initialData}
          columns={columns}
          style={{ height: "371px", width: "98%", margin: "0 auto", backgroundColor: "#ffffff" }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          onRowSelectionModelChange={handleSelectionModelChange} // 選択状態変更時のコールバック
          getRowId={(row) => row.VisitorID}
          checkboxSelection
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
      <div>
        {/* 退館登録者の入力フォーム */}
        {/* これと、登録完了した人の、分け目を作る */}
        <h2 className={styles.h2}>退館登録者</h2>
        <label>
          <select
            value={SelectExitUser}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSelectExitUser(e.target.value);
            }}
          >
            <option value="牧島史子">牧島史子</option>
            <option value="門村奈津子">門村奈津子</option>
            <option value="財賀雅二">財賀雅二</option>
            <option value="その他">その他</option>
          </select>
        </label>
        {SelectExitUser == "その他" && (
          <label>
            <input
              type="text"
              value={InExitUser}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInExitUser(e.target.value)
              }
            />
          </label>
        )}

        {/* 入館日時の入力フォーム */}
        <h2 className={styles.h2}>退館日時</h2>
        <label>
          <InputDateTime
            selectedDate={testData.ExitDateTime}
            onChange={handleDateTimeChange}
          />
        </label>
        <br />
        {/* コメントの入力フォーム */}
        <h2 className={styles.h2}>コメント</h2>
        <br />
        <label>
          <input
            type="text"
            value={testData.Comment}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("Comment", e.target.value)
            }
          />
        </label>
        <br />
      </div>

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
  const apiResponseEntry = await getEntryInformation();

  if (apiResponseEntry == "情報取得失敗") {
    // カスタムアラートは無理そう
    alert("情報取得に失敗しました");
    const initialData: VisitorData[] = [];
    return {
      props: {
        initialData,
      },
    };
  }
  // ApiResponse型からVisitorData[]型に変換
  const initialData: VisitorData[] = apiResponseEntry.data;

  return {
    props: {
      initialData,
    },
  };
};

export default HomePage;
