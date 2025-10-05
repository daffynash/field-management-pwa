import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // το initialized Firestore instance


const fieldTemplate = {
  name: "",
  area: 0,
  yearSeeded: new Date().getFullYear(),
  typeOfSeed: "ownLocal",
  ownership: {
    owned: true,
    rentPrice: null
  }
};

export default function AddFieldForm({ onSuccess }) {
  const [fieldData, setFieldData] = useState({ ...fieldTemplate });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "owned") {
      setFieldData({
        ...fieldData,
        ownership: { ...fieldData.ownership, owned: checked, rentPrice: null }
      });
    } else if (name === "rentPrice") {
      setFieldData({
        ...fieldData,
        ownership: { ...fieldData.ownership, rentPrice: Number(value) }
      });
    } else if (type === "number") {
      setFieldData({ ...fieldData, [name]: Number(value) });
    } else {
      setFieldData({ ...fieldData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, "Fields"), fieldData);
      setFieldData({ ...fieldTemplate }); // reset form
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("Απέτυχε η αποθήκευση. Προσπάθησε ξανά.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-field-form" onSubmit={handleSubmit}>

      <label>
        Όνομα Χωραφιού:
        <input type="text" name="name" value={fieldData.name} onChange={handleChange} required />
      </label>

      <label>
        Επιφάνεια (στρέμματα):
        <input type="number" name="area" value={fieldData.area} onChange={handleChange} required />
      </label>

      <label>
        Έτος Σποράς:
        <input type="number" name="yearSeeded" value={fieldData.yearSeeded} onChange={handleChange} required />
      </label>

      <label>
        Τύπος Σπόρου:
        <select name="typeOfSeed" value={fieldData.typeOfSeed} onChange={handleChange}>
          <option value="ownLocal">Δικός μας εντόπιος</option>
          <option value="local">Αγορασμένος εντόπιος</option>
          <option value="hybrid">Υβρίδιο αγορασμένο</option>
          <option value="ownHybrid">Δικός μας από υβριδικό</option>
        </select>
      </label>

      <label>
        Ιδιοκτησία:
        <input type="checkbox" name="owned" checked={fieldData.ownership.owned} onChange={handleChange} />
        {fieldData.ownership.owned ? "Ιδιόκτητο" : "Ενοικιασμένο"}
      </label>

      {!fieldData.ownership.owned && (
        <label>
          Τιμή Ενοικίασης / στρέμμα:
          <input type="number" name="rentPrice" value={fieldData.ownership.rentPrice || ""} onChange={handleChange} required />
        </label>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Αποθήκευση..." : "Προσθήκη Χωραφιού"}
      </button>

      {error && <span style={{ color: "red" }}>{error}</span>}
    </form>
  );
}
