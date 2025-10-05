export default function FieldSelector({ fields, selectedField, onChange }) {
  return (
    <div className="field-selector">
      <label htmlFor="field-dropdown">Επιλογή Χωραφιού:</label>
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
