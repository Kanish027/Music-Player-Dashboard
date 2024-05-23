import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Report = lazy(() => import("./components/Report"));

const App = () => {
  const [requestId, setRequestId] = useState("");

  const generateRequestId = () => {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const firstThree = Array.from({ length: 3 }, () =>
      alphabets.charAt(Math.floor(Math.random() * alphabets.length))
    ).join("");
    const timestamp = new Date().getTime().toString().slice(-8);
    return `${firstThree}${timestamp}`;
  };

  useEffect(() => {
    const newRequestId = generateRequestId();
    setRequestId(newRequestId);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="*"
          element={<Home requestId={requestId} setRequestId={setRequestId} />}
        />
        <Route
          path="/report"
          element={<Report requestId={requestId} setRequestId={setRequestId} />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
