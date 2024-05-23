import React from "react";

const Header = ({
  onFileChange,
  requestId,
  secondFile,
  onSecondFileChange,
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  const handleSecondFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onSecondFileChange(file);
    }
  };

  return (
    <div>
      {secondFile ? (
        <div className="flex justify-between px-10 py-5 bg-slate-700 text-white items-center">
          <div>Request Id: {requestId}</div>
          <div>Second Audio File</div>
          <div>
            <label
              htmlFor="upload_audio"
              className="border cursor-pointer border-blue-500 px-5 py-3 rounded-3xl text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Upload Audio
            </label>
            <input
              type="file"
              id="upload_audio"
              accept="audio/*"
              style={{ display: "none" }}
              onChange={(e) => handleSecondFileChange(e)}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between px-10 py-5 bg-slate-700 text-white items-center">
          <div>Request Id: {requestId}</div>
          <div>First Audio File</div>
          <div>
            <label
              htmlFor="upload_audio"
              className="border cursor-pointer border-blue-500 px-5 py-3 rounded-3xl text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Upload Audio
            </label>
            <input
              type="file"
              id="upload_audio"
              accept="audio/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
