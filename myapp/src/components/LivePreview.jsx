import React from "react";

function LivePreview({
  fields,
  selectedField,
  onSelectField,
  onMoveUp,
  onMoveDown,
  onDeleteField,
}) {
  return (
    <div 
      className="card shadow-sm border"
      style={{
        background: "var(--bg-card)",
        color: "var(--text-main)",
        borderColor: "var(--border-color)",
        borderRadius: "16px",
        minHeight: "500px",
      }}
    >
      <div 
        className="card-header bg-transparent border-bottom py-3 px-4 d-flex justify-content-between align-items-center"
        style={{ borderColor: "var(--border-color)" }}
      >
        <h4 className="fw-bold mb-0 d-flex align-items-center">
          <span className="me-2">👁️</span> Live Preview
        </h4>
        <span className="badge bg-primary rounded-pill px-3 py-1.5 small">
          {fields.length} {fields.length === 1 ? "Element" : "Elements"}
        </span>
      </div>

      <div className="card-body p-4">
        {fields.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center py-5 text-center" style={{ minHeight: "350px" }}>
            <div className="display-4 text-muted mb-3" style={{ opacity: 0.6 }}>🏗️</div>
            <h5 className="fw-bold text-muted mb-2">Build Your Form</h5>
            <p className="text-muted small mx-auto" style={{ maxWidth: "300px" }}>
              Click on form controls in the left sidebar to add fields here. Select any field to edit its parameters on the right.
            </p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {fields.map((field, index) => {
              const isSelected = selectedField === field.id;

              return (
                <div
                  key={field.id}
                  onClick={() => onSelectField(field.id)}
                  className={`card p-3 border transition-all cursor-pointer ${
                    isSelected ? "shadow-md border-primary" : "shadow-sm"
                  }`}
                  style={{
                    background: "var(--bg-card)",
                    color: "var(--text-main)",
                    borderRadius: "12px",
                    borderWidth: isSelected ? "2px" : "1px",
                    borderColor: isSelected ? "var(--primary)" : "var(--border-color)",
                    transform: isSelected ? "scale(1.01)" : "none",
                    boxShadow: isSelected ? "0 4px 20px rgba(79, 70, 229, 0.15)" : "none",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label fw-bold small mb-0 text-truncate" style={{ maxWidth: "70%" }}>
                      {field.label || field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                      {field.required && (
                        <span className="text-danger ms-1">*</span>
                      )}
                    </label>

                    {/* Field Actions Overlay */}
                    <div 
                      className="d-flex gap-1"
                      onClick={(e) => e.stopPropagation()} // Prevent selecting the field when clicking buttons
                    >
                      <button
                        className="btn btn-sm btn-light border py-1 px-2.5"
                        onClick={() => onMoveUp(index)}
                        disabled={index === 0}
                        title="Move Up"
                        style={{ color: "var(--text-main)", borderColor: "var(--border-color)", background: "var(--bg-app)" }}
                      >
                        ▲
                      </button>
                      <button
                        className="btn btn-sm btn-light border py-1 px-2.5"
                        onClick={() => onMoveDown(index)}
                        disabled={index === fields.length - 1}
                        title="Move Down"
                        style={{ color: "var(--text-main)", borderColor: "var(--border-color)", background: "var(--bg-app)" }}
                      >
                        ▼
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger py-1 px-2.5"
                        onClick={() => onDeleteField(field.id)}
                        title="Delete Field"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {field.type === "textarea" ? (
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder={field.placeholder || "Enter long response"}
                      disabled
                      style={{
                        background: "var(--bg-app)",
                        color: "var(--text-main)",
                        borderColor: "var(--border-color)",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="form-control"
                      placeholder={field.placeholder || "Enter value"}
                      disabled
                      style={{
                        background: "var(--bg-app)",
                        color: "var(--text-main)",
                        borderColor: "var(--border-color)",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  
                  {/* Field constraints info badge for builders */}
                  {(field.minLength || field.maxLength) && (
                    <div className="mt-2 d-flex gap-2">
                      {field.minLength && (
                        <span className="badge bg-secondary-subtle text-secondary small" style={{ fontSize: "0.75rem" }}>
                          Min: {field.minLength} chars
                        </span>
                      )}
                      {field.maxLength && (
                        <span className="badge bg-secondary-subtle text-secondary small" style={{ fontSize: "0.75rem" }}>
                          Max: {field.maxLength} chars
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default LivePreview;
