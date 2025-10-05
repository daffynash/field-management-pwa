import React, { useState } from "react";
import FieldSelector from "./FieldSelector";
import StockInfo from "./StockInfo";
import TaskForm from "./TaskForm";
import AddFieldForm from "./AddFieldForm";
import { TASK_TYPES } from "./TaskTypes";

export default function Layout({ fields, setFields, stock }) {
  const [selectedField, setSelectedField] = useState(fields[0]?.id || "");
  const [showForm, setShowForm] = useState(false);
  const [currentHand, setCurrentHand] = useState(null);
  const [completedHands, setCompletedHands] = useState([]);
  const [showAddFieldForm, setShowAddFieldForm] = useState(false);

  const handleFieldChange = (fieldId) => setSelectedField(fieldId);

  const handleFieldAdded = (newField) => {
    setFields((prev) => [...prev, newField]);
    setShowAddFieldForm(false);
    alert(`Νέο χωράφι "${newField.name}" αποθηκεύτηκε!`);
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
      <div key={idx} className="task-tooltip">
        <span className={getTaskClass(task.taskType)}>{task.taskType}</span>
        <span className="hand-date">{task.date}</span>
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
          <h2>Χωράφια & Εργασίες</h2>

          <div className="buttons-row">
            <button
              className="add-field-btn"
              onClick={() => setShowAddFieldForm((prev) => !prev)}
            >
              Προσθήκη Νέου Χωραφιού
            </button>

            {showAddFieldForm && <AddFieldForm onSuccess={handleFieldAdded} />}

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
