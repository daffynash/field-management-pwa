import React, { useState } from "react";

function StockInfo() {
  // Mock δεδομένα (θα τα φέρνουμε αργότερα από DB)
  const [stock] = useState({
    square: 120,
    round: 75,
  });

  return (
    <div className="stock-info">
      <h3>Στοκ Παραγόμενου Προϊόντος</h3>
      <p>🟩 Τετράγωνες μπάλες: {stock.square}</p>
      <p>⚪ Στρογγυλές μπάλες: {stock.round}</p>
    </div>
  );
}

export default StockInfo;
