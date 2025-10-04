import React from "react";

export default function FieldSelector({ fields, selectedField, onChange }) {
  return (
    <div className="field-selector">
      {/* Label πάνω από το dropdown */}
      <label htmlFor="field-dropdown">Επιλογή Χωραφιού:</label>

      {/* Dropdown */}
      <select
        id="field-dropdown"
        value={selectedField}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field.id} value={field.id}>
            {field.name}
          </option>
        ))}
      </select>
    </div>
  );
}
