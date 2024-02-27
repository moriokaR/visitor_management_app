// 退館情報登録
// src/information-processing/exitRegistration.jsx

// returnする変数
const SUCCESSFUL_REGISTRATION = "登録成功";
const FAILURE_REGISTRATION = "登録失敗";

// フォームのデータ型を定義
interface TestData {
  VisitorNames: string[];
  VisitorIDs: number[];
  EntryCardIDs: number[];
  ExitDateTime: Date;
  ExitUser: string;
  Comment: string;
}

interface RegistrationResult {
  status: string;
  successfulNames: string[];
  failureNames: string[];
}

// 退館情報登録
export const exitRegistration = async (
  formData: TestData
): Promise<RegistrationResult> => {
  const responses: Response[] = [];
  const successfulNames: string[] = [];
  const failureNames: string[] = [];

  try {
    const formattedExitDateTime = formatDateTime(formData.ExitDateTime);

    // データごとにfetchを呼び出す
    for (let i = 0; i < formData.VisitorIDs.length; i++) {
      const visitorID = formData.VisitorIDs[i];
      const entryCardID = formData.EntryCardIDs[i];

      const inRentStatus = convertInRentStatus({ entryCardID });

      const response = await fetch("/api/exit-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            VisitorID: visitorID,
            ExitUser: formData.ExitUser.trim(),
            ExitDateTime: formattedExitDateTime,
            Comment: formData.Comment.trim(),
            EntryCardID: entryCardID,
            RentStatus: inRentStatus,
          },
        }),
      });

      responses.push(response);

      // 登録失敗
      if (response.status !== 201) {
        console.error(
          `Failed to insert data for VisitorID ${visitorID}:`,
          await response.json()
        );
        // 失敗した名前
        failureNames.push(formData.VisitorNames[i]);
      } else {
        // 成功した名前
        successfulNames.push(formData.VisitorNames[i]);
      }
    }

    // すべてのデータが正常に登録された場合
    if (responses.every((response) => response.status === 201)) {
      console.log("All data inserted successfully");
      return { status: SUCCESSFUL_REGISTRATION, successfulNames, failureNames };
    } else {
      console.error("Some data failed to insert");
      return { status: FAILURE_REGISTRATION, successfulNames, failureNames };
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    return { status: FAILURE_REGISTRATION, successfulNames, failureNames };
  }
};

// InRentStatusを設定する関数
const convertInRentStatus = (formData: { entryCardID: number }): string => {
  if (formData.entryCardID === 99) {
    return "未貸出";
  } else {
    return "貸出可";
  }
};

// 日付をフォーマットする関数
const formatDateTime = (dateTimeString: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // AM/PM形式
  };

  // タイムゾーンを日本時間に設定
  const japanTimeZone = "Asia/Tokyo";
  const formattedJapanDateTime = new Intl.DateTimeFormat("ja-JP", {
    ...options,
    timeZone: japanTimeZone,
  }).format(new Date(dateTimeString));

  return formattedJapanDateTime;
};
