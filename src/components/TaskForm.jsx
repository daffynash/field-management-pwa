import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "./TaskForm.css";

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
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };
  const fieldVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
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

      <AnimatePresence mode="wait">
        {(taskType === TASK_TYPES.CUT || taskType === TASK_TYPES.TURN) && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="form-row">
              <motion.label variants={fieldVariants}>
                Ημερομηνία:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </motion.label>
              <motion.label variants={fieldVariants}>
                Σχόλια:
                <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
              </motion.label>
            </div>
            <motion.button type="submit" variants={fieldVariants}>
              Αποθήκευση Εργασίας
            </motion.button>
          </motion.div>
        )}

        {taskType === TASK_TYPES.BIND && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="form-row">
              <motion.label variants={fieldVariants}>
                Αριθμός Μπαλών:
                <input type="number" value={baleNumber} onChange={(e) => setBaleNumber(e.target.value)} required />
              </motion.label>
              <motion.label variants={fieldVariants}>
                Είδος Μπάλας:
                <select value={baleType} onChange={(e) => setBaleType(e.target.value)}>
                  <option value="Τετράγωνη">Τετράγωνη</option>
                  <option value="Στρογγυλή">Στρογγυλή</option>
                </select>
              </motion.label>
            </div>
            <div className="form-row">
              <motion.label variants={fieldVariants}>
                Ημερομηνία:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </motion.label>
              <motion.label variants={fieldVariants}>
                Σχόλια:
                <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
              </motion.label>
            </div>
            <motion.button type="submit" variants={fieldVariants}>
              Αποθήκευση Εργασίας
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
