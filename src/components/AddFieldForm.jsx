import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig"; // σιγουρευόμαστε ότι υπάρχει

export default function AddFieldForm({ onFieldAdded }) {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [owned, setOwned] = useState(true);
  const [rentPrice, setRentPrice] = useState("");
  const [typeOfSeed, setTypeOfSeed] = useState("ownLocal");
  const [yearSeeded, setYearSeeded] = useState(new Date().getFullYear());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFieldData = {
      name,
      area: Number(area),
      ownership: {
        owned,
        rentPrice: owned ? null : Number(rentPrice)
      },
      typeOfSeed,
      yearSeeded: Number(yearSeeded)
    };

    try {
      const docRef = await addDoc(collection(db, "Fields"), newFieldData);
      if (onFieldAdded) {
        onFieldAdded({ id: docRef.id, ...newFieldData }); // safety
      }

      setName("");
      setArea("");
      setOwned(true);
      setRentPrice("");
      setTypeOfSeed("ownLocal");
      setYearSeeded(new Date().getFullYear());
    } catch (error) {
      console.error("Error adding field:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-field-form">
      <input
        type="text"
        placeholder="Όνομα Χωραφιού"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Έκταση (στρ.)"
        value={area}
        onChange={e => setArea(e.target.value)}
        required
      />
      <select value={typeOfSeed} onChange={e => setTypeOfSeed(e.target.value)}>
        <option value="ownLocal">Own Local</option>
        <option value="local">Local</option>
        <option value="hybrid">Hybrid</option>
        <option value="ownHybrid">Own Hybrid</option>
      </select>
      <input
        type="number"
        placeholder="Έτος Σποράς"
        value={yearSeeded}
        onChange={e => setYearSeeded(e.target.value)}
        required
      />
      <label>
        Ιδιοκτησία:
        <input type="checkbox" checked={owned} onChange={e => setOwned(e.target.checked)} />
      </label>
      {!owned && (
        <input
          type="number"
          placeholder="Ενοίκιο / στρ."
          value={rentPrice}
          onChange={e => setRentPrice(e.target.value)}
          required
        />
      )}
      <button type="submit">Προσθήκη Χωραφιού</button>
    </form>
  );
}
