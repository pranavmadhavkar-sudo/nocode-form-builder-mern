import React, { useState, useEffect } from "react";

function FieldProperties({ field, onUpdateField }) {
  const [testValue, setTestValue] = useState("");
  const [validationError, setValidationError] = useState("");

  // Reset sandbox when field selection changes
  useEffect(() => {
    setTestValue("");
    setValidationError("");
  }, [field?.id]);

  // Validate sandbox inputs in real-time
  useEffect(() => {
    if (!field) return;
    
    if (field.required && !testValue) {
      setValidationError("This field is required.");
      return;
    }

    if (testValue) {
      if (field.minLength && testValue.length < parseInt(field.minLength)) {
        setValidationError(`Minimum length is ${field.minLength} characters. (Current: ${testValue.length})`);
        return;
      }
      if (field.maxLength && testValue.length > parseInt(field.maxLength)) {
        setValidationError(`Maximum length is ${field.maxLength} characters. (Current: ${testValue.length})`);
        return;
      }
    }

    setValidationError("");
  }, [testValue, field, field?.required, field?.minLength, field?.maxLength]);

  if (!field) {
    return (
      <div 
        className="card shadow-sm border p-4 text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          background: "var(--bg-card)",
          color: "var(--text-main)",
          borderColor: "var(--border-color)",
          borderRadius: "16px",
          minHeight: "350px",
        }}
      >
        <div className="fs-1 text-muted mb-3" style={{ opacity: 0.5 }}>⚙️</div>
        <h5 className="fw-bold mb-2">No Field Selected</h5>
        <p className="text-muted small">
          Select any element from the live preview area to adjust its label, validation parameters, and behavior.
        </p>
      </div>
    );
  }

  const handleChange = (key, value) => {
    onUpdateField({
      ...field,
      [key]: value,
    });
  };

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
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold mb-0 d-flex align-items-center">
          <span className="me-2">⚙️</span> Properties
        </h4>
        <span className="badge bg-secondary-subtle text-secondary text-uppercase small">
          {field.type}
        </span>
      </div>

      <div className="d-flex flex-column gap-3">
        {/* Label Field */}
        <div>
          <label className="form-label fw-semibold small text-muted">Field Label</label>
          <input
            type="text"
            className="form-control"
            value={field.label || ""}
            onChange={(e) => handleChange("label", e.target.value)}
            style={{
              background: "var(--input-bg)",
              color: "var(--text-main)",
              borderColor: "var(--border-color)",
            }}
          />
        </div>

        {/* Placeholder Field */}
        <div>
          <label className="form-label fw-semibold small text-muted">Placeholder Text</label>
          <input
            type="text"
            className="form-control"
            value={field.placeholder || ""}
            onChange={(e) => handleChange("placeholder", e.target.value)}
            style={{
              background: "var(--input-bg)",
              color: "var(--text-main)",
              borderColor: "var(--border-color)",
            }}
          />
        </div>

        {/* Validations (Side by side) */}
        <div className="row g-2">
          <div className="col-6">
            <label className="form-label fw-semibold small text-muted">Min Length</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 3"
              value={field.minLength || ""}
              onChange={(e) => handleChange("minLength", e.target.value)}
              style={{
                background: "var(--input-bg)",
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
              }}
            />
          </div>
          <div className="col-6">
            <label className="form-label fw-semibold small text-muted">Max Length</label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g. 20"
              value={field.maxLength || ""}
              onChange={(e) => handleChange("maxLength", e.target.value)}
              style={{
                background: "var(--input-bg)",
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
              }}
            />
          </div>
        </div>

        {/* Required Toggle */}
        <div className="form-check form-switch mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="requiredSwitch"
            checked={field.required || false}
            onChange={(e) => handleChange("required", e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          <label className="form-check-label fw-semibold small text-muted ms-2" htmlFor="requiredSwitch" style={{ cursor: "pointer" }}>
            Required Element
          </label>
        </div>

        <hr style={{ borderColor: "var(--border-color)" }} className="my-4" />

        {/* Interactive Validation Tester Sandbox */}
        <div 
          className="p-3 rounded-3 border"
          style={{
            background: "var(--bg-app)",
            borderColor: "var(--border-color)",
          }}
        >
          <h6 className="fw-bold mb-2 small d-flex align-items-center">
            <span className="me-2">🧪</span> Live Field Sandbox
          </h6>
          <p className="text-muted small mb-3">Test inputs against constraints configured above.</p>
          
          {field.type === "textarea" ? (
            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder="Type test text..."
              value={testValue}
              onChange={(e) => setTestValue(e.target.value)}
              style={{
                background: "var(--input-bg)",
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
              }}
            />
          ) : (
            <input
              type={field.type}
              className="form-control mb-2"
              placeholder="Type test data..."
              value={testValue}
              onChange={(e) => setTestValue(e.target.value)}
              style={{
                background: "var(--input-bg)",
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
              }}
            />
          )}

          {validationError ? (
            <div className="text-danger small fw-semibold d-flex align-items-center gap-1.5 mt-1">
              <span>⚠️</span> {validationError}
            </div>
          ) : (
            testValue && (
              <div className="text-success small fw-semibold d-flex align-items-center gap-1.5 mt-1">
                <span>✅</span> Input meets validation rules!
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default FieldProperties;
