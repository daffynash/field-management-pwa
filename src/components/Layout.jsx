import React, { useState } from "react";
import FieldSelector from "./FieldSelector";
import StockInfo from "./StockInfo";
import TaskForm from "./TaskForm";
import { TASK_TYPES } from "./TaskTypes";
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

      if (task.taskType === TASK_TYPES.BIND) {
        setCompletedHands([...completedHands, updatedHand]);
        setCurrentHand(null);
      } else {
        setCurrentHand(updatedHand);
      }
    }
    setShowForm(false);
  };

  const renderTask = (task, idx) => {
    // Καθορισμός class ανά είδος εργασίας
    const getTaskClass = (type) => {
      switch (type) {
        case TASK_TYPES.CUT: return "task-type task-cut";
        case TASK_TYPES.TURN: return "task-type task-turn";
        case TASK_TYPES.BIND: return "task-type task-bind";
        default: return "task-type";
      }
    };

    const tooltipText = `
      ${task.comments ? `Σχόλια: ${task.comments}` : ""}
      ${task.baleNumber ? `Μπάλες: ${task.baleNumber} (${task.baleType})` : ""}
    `.trim();

    return (
      <div key={idx} style={{ marginBottom: "4px" }} className="task-tooltip">
        <span className={getTaskClass(task.taskType)}>
          {task.taskType}
        </span>
        <span className="hand-date" style={{ marginLeft: "6px" }}>
          {task.date}
        </span>
        {tooltipText && <span className="tooltip-text">{tooltipText}</span>}
      </div>
    );
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
            <button className="add-task-btn" onClick={() => setShowForm(true)}>
              {currentHand ? "Συνέχιση Τρέχοντος Χεριού" : "Νέα Εργασία"}
            </button>

            {showForm && (
              <TaskForm onSave={handleSaveTask} currentHand={currentHand} />
            )}
          </div>

          {currentHand && (
            <div className="current-hand hand-card">
              <span className="hand-label">Τρέχον Χέρι #{currentHand.index}</span>
              {currentHand.tasks.map(renderTask)}
            </div>
          )}

          {completedHands.length > 0 && (
            <div className="completed-hands">
              <span className="hand-label">Ολοκληρωμένα Χέρια</span>
              {completedHands.map((hand) => (
                <div key={hand.index} className="completed-hand hand-card">
                  <span className="hand-label">Χέρι #{hand.index}</span>
                  {hand.tasks.map(renderTask)}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
