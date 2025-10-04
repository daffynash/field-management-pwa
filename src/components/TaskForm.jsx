import React, { useState, useEffect } from "react";

const TASK_TYPES = {
  CUT: "Κόψιμο",
  TURN: "Γύρισμα",
  BIND: "Δέσιμο"
};

const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function TaskForm({ onSave, currentHand }) {
  const [taskType, setTaskType] = useState(TASK_TYPES.CUT);
  const [date, setDate] = useState(getToday());
  const [comments, setComments] = useState("");
  const [baleNumber, setBaleNumber] = useState("");
  const [baleType, setBaleType] = useState("Τετράγωνη");

  // Όταν αλλάζει το currentHand, θέτουμε σωστά τις default τιμές
  useEffect(() => {
    if (!currentHand) {
      setTaskType(TASK_TYPES.CUT);
    } else {
      const hasTurn = currentHand.tasks.some(t => t.taskType === TASK_TYPES.TURN);
      setTaskType(hasTurn ? TASK_TYPES.BIND : TASK_TYPES.TURN);
    }

    setDate(getToday());
    setComments("");
    setBaleNumber("");
    setBaleType("Τετράγωνη");
  }, [currentHand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ taskType, date, comments, baleNumber, baleType });

    // Επαναφορά πεδίων μετά το save
    if (!currentHand) {
      setTaskType(TASK_TYPES.CUT);
    } else {
      const hasTurn = currentHand.tasks.some(t => t.taskType === TASK_TYPES.TURN);
      setTaskType(hasTurn ? TASK_TYPES.BIND : TASK_TYPES.TURN);
    }
    setDate(getToday());
    setComments("");
    setBaleNumber("");
    setBaleType("Τετράγωνη");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        Είδος Εργασίας:
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
          {!currentHand && <option value={TASK_TYPES.CUT}>Κόψιμο</option>}
          {currentHand && (
            <>
              <option value={TASK_TYPES.TURN}>Γύρισμα</option>
              <option value={TASK_TYPES.BIND}>Δέσιμο</option>
            </>
          )}
        </select>
      </label>

      {(taskType === TASK_TYPES.CUT || taskType === TASK_TYPES.TURN) && (
        <>
          <label>
            Ημερομηνία:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label>
            Σχόλια:
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
          </label>
        </>
      )}

      {taskType === TASK_TYPES.BIND && (
        <>
          <label>
            Αριθμός Μπαλών:
            <input
              type="number"
              value={baleNumber}
              onChange={(e) => setBaleNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Είδος Μπάλας:
            <select value={baleType} onChange={(e) => setBaleType(e.target.value)}>
              <option value="Τετράγωνη">Τετράγωνη</option>
              <option value="Στρογγυλή">Στρογγυλή</option>
            </select>
          </label>
          <label>
            Ημερομηνία:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <label>
            Σχόλια:
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
          </label>
        </>
      )}

      <button type="submit">Αποθήκευση Εργασίας</button>
    </form>
  );
}
