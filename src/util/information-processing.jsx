// 情報処理
// util/infomation-processing.jsx

// 来客者情報登録
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

    if (response.status === 201) {
      console.log("Data inserted successfully");
    } else {
      console.error("Failed to insert data:", await response.json());
    }
  } catch (error) {
    console.error("Error inserting data:", error);
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