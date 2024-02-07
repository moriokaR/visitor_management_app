const FAILURE_GET_INFORMATION = "情報取得失敗";

// 貸出中カード情報取得
export const getRentCardInformation = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/rent-card-information", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
    // const response = await fetch("/api/visitor-input-information");

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch data:", await response.json());

        // エラーを返す。
        return FAILURE_GET_INFORMATION;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return FAILURE_GET_INFORMATION;
    }
  };