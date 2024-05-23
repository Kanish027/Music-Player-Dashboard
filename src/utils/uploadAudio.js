export const uploadAudio = (
  requestId,
  index,
  audioFile,
  selectionStartTs,
  selectionEndTs
) => {
  return new Promise((resolve, reject) => {
    if (audioFile) {
      const reader = new FileReader();
      reader.readAsDataURL(audioFile);
      reader.onloadend = function () {
        const base64AudioData = reader.result.split(",")[1];
        const serverUrl = `http://speakerid.iphipi.com/upload_audio`;

        fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request_id: requestId,
            index: index,
            audio_data: base64AudioData,
            selection_start_ts: selectionStartTs,
            selection_end_ts: selectionEndTs,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.hasOwnProperty("error")) {
              alert(data.error); // Replace with your alert handling
              reject(new Error(data.error));
            } else {
              console.log("Data Sent to server");
              resolve();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            // alert("Failed to upload audio due to CORS issue or server error.");
            reject(error);
          });
      };
    } else {
      alert("Please Upload Audio file"); // Replace with your alert handling
      reject(new Error("Please Upload Audio file"));
    }
  });
};
