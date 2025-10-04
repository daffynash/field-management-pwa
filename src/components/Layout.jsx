import React, { useState } from "react";
import FieldSelector from "./FieldSelector";
import StockInfo from "./StockInfo";
import TaskForm from "./TaskForm";
import "./Layout.css";

const testFields = [
  { id: "1", name: "Χωράφι 1", area: 5 },
  { id: "2", name: "Χωράφι 2", area: 8 },
  { id: "3", name: "Χωράφι 3", area: 12 }
];

const testStock = {
  squareBales: 10,
  roundBales: 5
};

export default function Layout({ fields = testFields, stock = testStock }) {
  const [selectedField, setSelectedField] = useState(fields[0]?.id || "");
  const [showForm, setShowForm] = useState(false);

  const [currentHand, setCurrentHand] = useState(null);
  const [completedHands, setCompletedHands] = useState([]);

  const handleFieldChange = (fieldId) => {
    setSelectedField(fieldId);
  };

  const handleSaveTask = (task) => {
    if (!currentHand) {
      setCurrentHand({ index: completedHands.length + 1, tasks: [task] });
    } else {
      const updatedTasks = [...currentHand.tasks, task];
      const updatedHand = { ...currentHand, tasks: updatedTasks };

      if (task.taskType === "Δέσιμο") {
        setCompletedHands([...completedHands, updatedHand]);
        setCurrentHand(null);
      } else {
        setCurrentHand(updatedHand);
      }
    }
    setShowForm(false);
  };

  return (
    <div className="layout">
      <header className="layout-header">Farm Manager</header>
      <div className="layout-body">
        <aside className="layout-sidebar">
          <FieldSelector
            fields={fields}
            selectedField={selectedField}
            onChange={handleFieldChange}
          />
          <StockInfo stock={stock} />
        </aside>

        <main className="layout-main">
          <h2>Εργασίες Χωραφιού</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={() => setShowForm(true)}>
              {currentHand ? "Συνέχιση Τρέχοντος Χεριού" : "Νέα Εργασία"}
            </button>

            {showForm && <TaskForm onSave={handleSaveTask} currentHand={currentHand} />}
          </div>

          {currentHand && (
            <div className="hand-section">
              <h3>Τρέχον Χέρι #{currentHand.index}</h3>
              <ul>
                {currentHand.tasks.map((t, i) => (
                  <li key={i}>
                    {t.taskType} - {t.date}{" "}
                    {t.baleNumber ? `| Μπάλες: ${t.baleNumber} (${t.baleType})` : ""}{" "}
                    {t.comments ? `| Σχόλια: ${t.comments}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {completedHands.length > 0 && (
            <div className="hand-section">
              <h3>Ολοκληρωμένα Χέρια</h3>
              {completedHands.map(hand => (
                <div key={hand.index}>
                  <strong>Χέρι #{hand.index}</strong>
                  <ul>
                    {hand.tasks.map((t, i) => (
                      <li key={i}>
                        {t.taskType} - {t.date}{" "}
                        {t.baleNumber ? `| Μπάλες: ${t.baleNumber} (${t.baleType})` : ""}{" "}
                        {t.comments ? `| Σχόλια: ${t.comments}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
