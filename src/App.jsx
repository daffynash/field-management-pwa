import React, { useState } from "react";
import Layout from "./components/Layout";
import FieldSelector from "./components/FieldSelector";
import StockInfo from "./components/StockInfo";

function App() {
  const fields = [
    { id: 1, name: "Χωράφι Α", area: 10 },
    { id: 2, name: "Χωράφι Β", area: 15 },
    { id: 3, name: "Χωράφι Γ", area: 8 },
  ];

  const [selectedField, setSelectedField] = useState(null);

  return (
    <Layout
      header={<div>🌾 Farm Manager</div>}
      sidebar={<StockInfo />}
      main={
        <div>
          <FieldSelector fields={fields} onSelect={setSelectedField} />
          {selectedField && (
            <h2>
              {selectedField.name} - {selectedField.area} στρ.
            </h2>
          )}
        </div>
      }
    />
  );
}

export default App;
