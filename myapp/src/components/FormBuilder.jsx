import React, { useState, useEffect } from "react";
import FormControls from "./FormControls";
import LivePreview from "./LivePreview";
import FieldProperties from "./FieldProperties";

function FormBuilder({ initialForm, onSaveSuccess }) {
  const [fields, setFields] = useState([]);
  const [formTitle, setFormTitle] = useState("My Dynamic Form");
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Sync with initialForm prop when editing from My Forms
  useEffect(() => {
    if (initialForm) {
      setFields(initialForm.fields || []);
      setFormTitle(initialForm.title || "My Dynamic Form");
      setSelectedFieldId(null);
    }
  }, [initialForm]);

  // Handle active selected field object lookup
  const selectedField = fields.find((f) => f.id === selectedFieldId) || null;

  // Add field helper
  function addField(type) {
    const newField = {
      id: Date.now(),
      type: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      placeholder: "Enter " + type,
      required: false,
      minLength: "",
      maxLength: "",
    };

    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  }

  // Clear Form workspace
  function clearForm() {
    if (window.confirm("Are you sure you want to clear the entire form builder?")) {
      setFields([]);
      setSelectedFieldId(null);
    }
  }

  // Delete field helper
  function deleteField(id) {
    setFields(fields.filter((field) => field.id !== id));
    if (selectedFieldId === id) {
      setSelectedFieldId(null);
    }
  }

  // Reorder: Move field up
  function moveUp(index) {
    if (index === 0) return;
    const updated = [...fields];
    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
    setFields(updated);
  }

  // Reorder: Move field down
  function moveDown(index) {
    if (index === fields.length - 1) return;
    const updated = [...fields];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setFields(updated);
  }

  // Save Form to Backend (MongoDB)
  async function saveForm() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("❌ Please log in to save your forms to MongoDB.");
      return;
    }

    if (fields.length === 0) {
      alert("❌ Form cannot be empty. Add some fields first.");
      return;
    }

    const titleInput = prompt("Enter a title for your form:", formTitle);
    if (titleInput === null) return; // Cancelled
    const finalTitle = titleInput.trim() || "My Dynamic Form";
    setFormTitle(finalTitle);

    try {
      const response = await fetch("http://localhost:5000/api/forms/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: finalTitle,
          userId: user.id,
          fields: fields,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Form Saved to MongoDB Successfully!");
        if (onSaveSuccess) onSaveSuccess();
      } else {
        alert("❌ " + (data.message || "Failed to save form"));
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error Saving Form. Server might be offline.");
    }
  }

  // Load last saved form structure from local storage
  function loadForm() {
    const savedForm = localStorage.getItem("myForm");
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        setFields(parsed);
        setSelectedFieldId(null);
        alert("✅ Local Form Loaded Successfully!");
      } catch (err) {
        alert("❌ Failed to parse saved local form.");
      }
    } else {
      alert("ℹ️ No Saved Local Form Found! (Save to Local Storage first)");
    }
  }

  // Export form structure as local JSON file
  function exportJSON() {
    if (fields.length === 0) {
      alert("❌ Form is empty. Add fields before exporting.");
      return;
    }
    const jsonData = JSON.stringify(fields, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formTitle.toLowerCase().replace(/\s+/g, "_")}_structure.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Import form structure from local JSON file
  function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedFields = JSON.parse(e.target.result);
        if (Array.isArray(importedFields)) {
          setFields(importedFields);
          setSelectedFieldId(null);
          alert("✅ Form structure imported successfully!");
        } else {
          alert("❌ Invalid file format: Root element must be an array.");
        }
      } catch (err) {
        alert("❌ Invalid JSON file. Parse error.");
      }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset file input
  }

  // Sync theme changes with document attributes
  const toggleTheme = (isDark) => {
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      // Keep old compatibility styles in case other elements rely on document.body style overrides
      document.body.style.background = "#090d16";
      document.body.style.color = "white";
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.body.style.background = "#f1f5f9";
      document.body.style.color = "black";
    }
  };

  // Update specific field settings from right sidebar
  const updateField = (updatedField) => {
    setFields(fields.map((f) => (f.id === updatedField.id ? updatedField : f)));
  };

  return (
    <section id="builder" className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-2">⚡ Interactive Form Builder</h2>
        <p className="text-muted">
          Design your custom form structure in real-time. Double click/tap fields to customize parameters.
        </p>
      </div>

      <div className="row g-4">
        {/* Left Sidebar - Form Controls (Col-lg-3) */}
        <div className="col-lg-3 col-md-4">
          <FormControls
            onAddField={addField}
            onClearForm={clearForm}
            onSaveForm={saveForm}
            onLoadSavedForm={loadForm}
            onExportJSON={exportJSON}
            onImportJSON={importJSON}
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
          />
        </div>

        {/* Center Panel - Live Preview (Col-lg-6) */}
        <div className="col-lg-6 col-md-8">
          <LivePreview
            fields={fields}
            selectedField={selectedFieldId}
            onSelectField={setSelectedFieldId}
            onMoveUp={moveUp}
            onMoveDown={moveDown}
            onDeleteField={deleteField}
          />
        </div>

        {/* Right Sidebar - Field Properties (Col-lg-3) */}
        <div className="col-lg-3 col-md-12">
          <FieldProperties 
            field={selectedField} 
            onUpdateField={updateField} 
          />
        </div>
      </div>
    </section>
  );
}

export default FormBuilder;