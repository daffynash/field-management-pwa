import React, { useState } from "react";
import Layout from "./components/Layout";
import StockInfo from "./components/StockInfo";

function App() {
  const [fields, setFields] = useState([
    { id: 1, name: "Χωράφι Α", area: 10 },
    { id: 2, name: "Χωράφι Β", area: 15 },
    { id: 3, name: "Χωράφι Γ", area: 8 },
  ]);

  const testStock = { squareBales: 10, roundBales: 5 };

  return <Layout fields={fields} setFields={setFields} stock={testStock} />;
}

export default App;
