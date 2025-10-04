import React, { useState } from "react";

const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function TaskForm({ onSave, currentHand }) {
  const defaultTaskType = !currentHand
    ? "Κόψιμο"
    : currentHand.tasks.find(t => t.taskType === "Γύρισμα")
      ? "Δέσιμο"
      : "Γύρισμα";

  const [taskType, setTaskType] = useState(defaultTaskType);
  const [date, setDate] = useState(getToday());
  const [comments, setComments] = useState("");
  const [baleNumber, setBaleNumber] = useState("");
  const [baleType, setBaleType] = useState("Τετράγωνη");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ taskType, date, comments, baleNumber, baleType });

    const newDefault = !currentHand
      ? "Κόψιμο"
      : currentHand.tasks.find(t => t.taskType === "Γύρισμα")
        ? "Δέσιμο"
        : "Γύρισμα";

    setTaskType(newDefault);
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
          {!currentHand && <option value="Κόψιμο">Κόψιμο</option>}
          {currentHand && (
            <>
              <option value="Γύρισμα">Γύρισμα</option>
              <option value="Δέσιμο">Δέσιμο</option>
            </>
          )}
        </select>
      </label>

      {(taskType === "Κόψιμο" || taskType === "Γύρισμα") && (
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

      {taskType === "Δέσιμο" && (
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
