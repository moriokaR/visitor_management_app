// src/information-processing/entryRegistration.jsx

// returnする関数
const SUCCESSFUL_REGISTRATION = "登録成功";
const FAILURE_REGISTRATION = "登録失敗";

// 入館情報登録
export const entryRegistration = async (formData) => {
  try {
    const inEntryCardID = setInEntryCardID(formData);
    const inRentStatus = setInRentStatus(formData);

    const response = await fetch("/api/entry-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          visitorID: formData.visitorID,
          entryCardID: inEntryCardID,
          rentStatus: inRentStatus,
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

// EntryCardIDを設定する関数
const setInEntryCardID = (formData) => {
  if (formData.entryCardType === "Guest") {
    return formData.entryCardNumber;
  } else if (formData.entryCardType === "リクルートカード") {
    return formData.entryCardNumber + 20;
  } else if (formData.entryCardType === "その他") {
    return formData.entryCardNumber + 40;
  } else if (formData.entryCardType === "-") {
    return 99;
  }
};

// InRentStatusを設定する関数
const setInRentStatus = (formData) => {
  if (formData.entryCardType === "-") {
    return "未貸出";
  } else {
    return "貸出中";
  }
};
