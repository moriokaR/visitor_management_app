// src/information-processing/exitRegistration.jsx

// returnする関数
const SUCCESSFUL_REGISTRATION = "登録成功";
const FAILURE_REGISTRATION = "登録失敗";

// 退館情報登録
export const exitRegistration = async (formData) => {
  const responses = [];

  try {
    const formattedExitDateTime = formatDateTime(formData.ExitDateTime);

    // データごとにfetchを呼び出す
    for (let i = 0; i < formData.VisitorIDs.length; i++) {
      const visitorID = formData.VisitorIDs[i];
      const entryCardID = formData.EntryCardIDs[i];

      const inRentStatus = setInRentStatus({ entryCardID });

      const response = await fetch("/api/exit-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            VisitorID: visitorID,
            ExitUser: formData.ExitUser,
            ExitDateTime: formattedExitDateTime,
            Comment: formData.Comment,
            EntryCardID: entryCardID,
            RentStatus: inRentStatus,
          },
        }),
      });

      responses.push(response);

      // 登録成功
      if (response.status !== 201) {
        console.error(
          `Failed to insert data for VisitorID ${visitorID}:`,
          await response.json()
        );
      }
    }

    // すべてのデータが正常に登録された場合
    if (responses.every((response) => response.status === 201)) {
      console.log("All data inserted successfully");
      return SUCCESSFUL_REGISTRATION;
    } else {
      console.error("Some data failed to insert");
    }
  } catch (error) {
    console.error("Error inserting data:", error);

    return FAILURE_REGISTRATION;
  }
};

// InRentStatusを設定する関数
const setInRentStatus = (formData) => {
  if (formData.entryCardID === 99) {
    return "未貸出";
  } else {
    return "貸出可";
  }
};

// 日付をフォーマットする関数
const formatDateTime = (dateTimeString) => {
  const options = {
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
