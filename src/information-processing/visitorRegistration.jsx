// 情報処理
// src/information-processing/visitorRegistration.jsx

// returnする関数
const SUCCESSFUL_REGISTRATION = "登録成功";
const FAILURE_REGISTRATION = "登録失敗";

// 来客者入力情報登録
export const visitorRegistration = async (formData) => {
  try {
    // attenderの日付をフォーマットする
    const formattedEntryDateTime = formatDateTime(formData.entryDateTime);

    const response = await fetch("/api/visitor-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          visitorName: formData.visitorName,
          company: formData.company,
          entryDateTime: formattedEntryDateTime,
          attender: formData.attender,
        },
      }),
    });

    // 登録成功
    if (response.status === 201) {
      console.log("Data inserted successfully");

      return SUCCESSFUL_REGISTRATION;
    } else {
      console.error("Failed to insert data:", await response.json());
    }
  } catch (error) {
    console.error("Error inserting data:", error);

    return FAILURE_REGISTRATION;
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
