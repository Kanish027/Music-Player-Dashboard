import React, { useState, useEffect } from "react";

const generateRequestId = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const firstThree = Array.from({ length: 3 }, () =>
    alphabets.charAt(Math.floor(Math.random() * alphabets.length))
  ).join("");
  const timestamp = new Date().getTime().toString().slice(-8);
  return `${firstThree}${timestamp}`;
};

const Header = ({ onFileChange }) => {
  const [requestId, setRequestId] = useState("");

  useEffect(() => {
    const newRequestId = generateRequestId();
    setRequestId(newRequestId);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
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
  );
};

export default Header;
