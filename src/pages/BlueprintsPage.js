import { useState } from "react";
import { FIELD_TYPES } from "../data/mockData";

function BlueprintsPage() {
  const [blueprints, setBlueprints] = useState([]);
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        type: "Text",
        label: "",
        position: { x: 0, y: 0 },
      },
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    if (key === "x" || key === "y") {
      updated[index].position[key] = Number(value);
    } else {
      updated[index][key] = value;
    }
    setFields(updated);
  };

  const saveBlueprint = () => {
    if (!name) return;

    const newBlueprint = {
      id: Date.now(),
      name,
      fields,
    };

    const updated = [...blueprints, newBlueprint];
    setBlueprints(updated);
    localStorage.setItem("blueprints", JSON.stringify(updated));

    setName("");
    setFields([]);
  };

  return (
    <div>
      <h2>Create Blueprint</h2>

      <input
        placeholder="Blueprint Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={addField}>Add Field</button>

      {fields.map((field, index) => (
        <div key={field.id} style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
          <select
            value={field.type}
            onChange={(e) => updateField(index, "type", e.target.value)}
          >
            {FIELD_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <input
            placeholder="Label"
            value={field.label}
            onChange={(e) => updateField(index, "label", e.target.value)}
          />

          <input
            type="number"
            placeholder="X"
            onChange={(e) => updateField(index, "x", e.target.value)}
          />

          <input
            type="number"
            placeholder="Y"
            onChange={(e) => updateField(index, "y", e.target.value)}
          />
        </div>
      ))}

      <br />
      <button onClick={saveBlueprint}>Save Blueprint</button>
    </div>
  );
}

export default BlueprintsPage;
