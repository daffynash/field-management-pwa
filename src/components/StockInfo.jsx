import React, { useState } from "react";

function StockInfo() {
  // Mock δεδομένα (θα τα φέρνουμε αργότερα από DB)
  const [stock] = useState({
    square: 120,
    round: 75,
  });

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Στοκ Παραγόμενου Προϊόντος</h3>
      <p>🟩 Τετράγωνες μπάλες: {stock.square}</p>
      <p>⚪ Στρογγυλές μπάλες: {stock.round}</p>
    </div>
  );
}

export default StockInfo;
