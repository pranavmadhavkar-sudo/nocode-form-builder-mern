import React, { useEffect, useState } from "react";

function MyForms({ onEditForm, onPreviewForm }) {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user?.id) {
      fetchForms();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchForms() {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/forms/all/${user.id}`
      );
      const data = await response.json();
      console.log("Forms loaded:", data);
      
      if (response.ok) {
        setForms(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch forms:", data.message);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/forms/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        // Remove from local state
        setForms(forms.filter((form) => form._id !== id));
      } else {
        alert("❌ " + (data.message || "Failed to delete form"));
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Server Error! Unable to delete form.");
    }
  }

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center py-5" style={{ minHeight: "300px" }}>
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Fetching your forms...</p>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-2">📂 My Forms</h2>
        <p className="text-muted">Manage your saved custom form templates</p>
      </div>

      {!token ? (
        <div className="alert alert-warning text-center rounded-4 shadow-sm p-4">
          <h4 className="alert-heading fw-bold">Authentication Required</h4>
          <p className="mb-0">Please log in to view and manage your forms.</p>
        </div>
      ) : forms.length === 0 ? (
        <div 
          className="text-center p-5 rounded-4 shadow-sm border"
          style={{ 
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="display-1 text-muted mb-3">📄</div>
          <h4 className="fw-bold mb-2">No Forms Found</h4>
          <p className="text-muted mb-4">You haven't created or saved any dynamic forms yet.</p>
          {onEditForm && (
            <button 
              className="btn btn-primary px-4 py-2"
              onClick={() => onEditForm([])}
              style={{ borderRadius: "12px", background: "var(--primary)", border: "none" }}
            >
              ➕ Create Your First Form
            </button>
          )}
        </div>
      ) : (
        <div className="row g-4">
          {forms.map((form) => (
            <div className="col-md-6 col-lg-4" key={form._id}>
              <div 
                className="card h-100 shadow-sm border hover-shadow"
                style={{ 
                  background: "var(--bg-card)",
                  color: "var(--text-main)",
                  borderColor: "var(--border-color)",
                  borderRadius: "16px",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
              >
                <div className="card-body d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h4 className="fw-bold text-truncate mb-0" style={{ maxWidth: "80%" }}>
                      {form.title || "Untitled Form"}
                    </h4>
                    <span className="badge bg-primary-subtle text-primary rounded-pill px-2.5 py-1 small">
                      {form.fields?.length || 0} fields
                    </span>
                  </div>

                  <p className="text-muted small flex-grow-1">
                    Form ID: <code className="bg-light text-dark p-1 rounded small">{form._id}</code>
                  </p>

                  <div className="d-flex gap-2 mt-4 pt-3 border-top" style={{ borderColor: "var(--border-color)" }}>
                    {onPreviewForm && (
                      <button 
                        className="btn btn-outline-primary flex-fill px-2 py-2 small"
                        onClick={() => onPreviewForm(form)}
                        style={{ borderRadius: "8px", fontSize: "0.85rem" }}
                      >
                        👁 Preview
                      </button>
                    )}
                    {onEditForm && (
                      <button 
                        className="btn btn-outline-warning flex-fill px-2 py-2 small"
                        onClick={() => onEditForm(form)}
                        style={{ borderRadius: "8px", fontSize: "0.85rem" }}
                      >
                        ✏ Edit
                      </button>
                    )}
                    <button 
                      className="btn btn-outline-danger px-3 py-2 small"
                      onClick={() => handleDelete(form._id)}
                      style={{ borderRadius: "8px", fontSize: "0.85rem" }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyForms;