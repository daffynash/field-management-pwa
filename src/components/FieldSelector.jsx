export default function FieldSelector({ fields, selectedField, onChange }) {
  if (!fields || fields.length === 0) return <p>Δεν υπάρχουν χωράφια</p>;

  return (
    <select
      id="field-dropdown"
      value={selectedField?.id || ""}
      onChange={(e) => {
        const selected = fields.find(f => f.id === e.target.value);
        onChange && onChange(selected);
      }}
    >
      <option value="" disabled>Επιλέξτε χωράφι</option>
      {fields.map(field => (
        <option key={field.id} value={field.id}>
          {field.name} - {field.area} στρ.
        </option>
      ))}
    </select>
  );
}
