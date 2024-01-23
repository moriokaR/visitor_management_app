// 情報処理
// util/infomation-processing.jsx

// 来客者情報登録
export const visitorRegistration = async (formData) => {
  try {
    const response = await fetch("/api/visitor-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          visitorName: formData.visitorName,
          company: formData.company,
          entryDateTime: formData.entryDateTime,
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
