// 来客者情報取得
export const getVisitorInputInformation = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/visitor-input-information", {
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
        return { error: { message: "Failed to fetch data" } };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return { error: { message: "Error fetching data" } };
    }
  };