// 情報処理
// src/information-processing/visitorRegistration.jsx

// returnする変数
const SUCCESSFUL_REGISTRATION = "登録成功";
const FAILURE_REGISTRATION = "登録失敗";

// 来客者入力情報登録
export const visitorRegistration = async (formData) => {
  try {
    // 入館の日付をフォーマットする
    const formattedEntryDateTime = formatDateTime(formData.entryDateTime);

    const response = await fetch("/api/visitor-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          visitorName: formData.visitorName.trim(),
          company: formData.company.trim(),
          entryDateTime: formattedEntryDateTime,
          attender: formData.attender.trim(),
        },
      }),
    });

    // 登録成功
    if (response.status === 201) {
      console.log("Data inserted successfully");

      return SUCCESSFUL_REGISTRATION;
    } else {
      console.error("Failed to insert data:", await response.json());
      return FAILURE_REGISTRATION;
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
