import React, { useRef } from "react";

function FormControls({
  onAddField,
  onClearForm,
  onSaveForm,
  onLoadSavedForm,
  onExportJSON,
  onImportJSON,
  darkMode,
  onToggleTheme,
}) {
  const fileInputRef = useRef(null);

  const fieldButtons = [
    { type: "text", label: "Text Field", icon: "✏️", className: "btn-outline-primary" },
    { type: "email", label: "Email Field", icon: "📧", className: "btn-outline-success" },
    { type: "number", label: "Number Field", icon: "🔢", className: "btn-outline-warning" },
    { type: "date", label: "Date Field", icon: "📅", className: "btn-outline-info" },
    { type: "password", label: "Password Field", icon: "🔒", className: "btn-outline-secondary" },
    { type: "textarea", label: "Text Area", icon: "📝", className: "btn-outline-dark" },
  ];

  return (
    <div 
      className="card shadow-sm border p-4"
      style={{
        background: "var(--bg-card)",
        color: "var(--text-main)",
        borderColor: "var(--border-color)",
        borderRadius: "16px",
      }}
    >
      <h4 className="fw-bold mb-4 d-flex align-items-center">
        <span className="me-2">🛠️</span> Form Controls
      </h4>

      {/* Group 1: Add Fields */}
      <div className="mb-4">
        <h6 className="text-muted fw-semibold small uppercase tracking-wider mb-3">Add Form Fields</h6>
        <div className="d-flex flex-column gap-2">
          {fieldButtons.map((btn) => (
            <button
              key={btn.type}
              className={`btn w-100 text-start py-2.5 px-3 border d-flex align-items-center transition-all ${btn.className}`}
              onClick={() => onAddField(btn.type)}
              style={{
                borderRadius: "10px",
                fontWeight: "500",
                fontSize: "0.95rem"
              }}
            >
              <span className="me-3 fs-5">{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <hr style={{ borderColor: "var(--border-color)" }} />

      {/* Group 2: Actions */}
      <div className="mb-4 mt-3">
        <h6 className="text-muted fw-semibold small uppercase tracking-wider mb-3">Form Management</h6>
        <div className="d-flex flex-column gap-2">
          <button
            className="btn btn-primary w-100 py-2.5"
            onClick={onSaveForm}
            style={{ borderRadius: "10px", background: "var(--primary)", border: "none" }}
          >
            💾 Save Form to DB
          </button>
          
          <button
            className="btn btn-outline-primary w-100 py-2.5"
            onClick={onLoadSavedForm}
            style={{ borderRadius: "10px" }}
          >
            📂 Load Saved Form
          </button>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary flex-fill py-2"
              onClick={onExportJSON}
              style={{ borderRadius: "10px", fontSize: "0.85rem" }}
            >
              📤 Export JSON
            </button>
            
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={onImportJSON}
            />
            <button
              className="btn btn-outline-secondary flex-fill py-2"
              onClick={() => fileInputRef.current.click()}
              style={{ borderRadius: "10px", fontSize: "0.85rem" }}
            >
              📥 Import JSON
            </button>
          </div>

          <button
            className="btn btn-outline-danger w-100 py-2.5 mt-2"
            onClick={onClearForm}
            style={{ borderRadius: "10px" }}
          >
            🗑 Clear Canvas
          </button>
        </div>
      </div>

      <hr style={{ borderColor: "var(--border-color)" }} />

      {/* Group 3: Theme */}
      <div className="mt-3">
        <h6 className="text-muted fw-semibold small uppercase tracking-wider mb-3">Workspace Theme</h6>
        <div className="d-flex gap-2">
          <button
            className={`btn flex-fill py-2 d-flex align-items-center justify-content-center gap-2 ${
              !darkMode ? "btn-light border active fw-bold" : "btn-outline-secondary"
            }`}
            onClick={() => onToggleTheme(false)}
            style={{ borderRadius: "10px", fontSize: "0.9rem" }}
          >
            ☀️ Light
          </button>
          <button
            className={`btn flex-fill py-2 d-flex align-items-center justify-content-center gap-2 ${
              darkMode ? "btn-dark border active fw-bold" : "btn-outline-secondary"
            }`}
            onClick={() => onToggleTheme(true)}
            style={{ borderRadius: "10px", fontSize: "0.9rem" }}
          >
            🌙 Dark
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormControls;
