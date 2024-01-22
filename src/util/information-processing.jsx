// 情報処理
// utils/infomation-processing.jsx

// 来客者情報登録
export const visitorRegistration = async (formData, fetchData) => {
    try {
      const response = await fetch('/api/visitor-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [
            {
            visitorName: formData.value1,
            company: formData.value2,
            entryDateTime: formData.value3,
            Attender: formData.value4,
            },
            // Add more data items as needed
          ],
        }),
      });
  
      if (response.status === 201) {
        console.log('Data inserted successfully');
        fetchData();
      } else {
        console.error('Failed to insert data:', await response.json());
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };