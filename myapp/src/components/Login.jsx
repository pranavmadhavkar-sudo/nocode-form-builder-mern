import React, { useState } from "react";

function Login({ setIsLoggedIn, setShowLogin, setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ " + data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        setShowLogin(false);
      } else {
        alert("❌ " + (data.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error(error);
      alert("Server Error! Unable to connect to authentication server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(8px)",
        zIndex: 99999,
      }}
    >
      <div
        className="card shadow-lg p-4 position-relative"
        style={{
          width: "420px",
          background: "var(--bg-card)",
          color: "var(--text-main)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
        }}
      >
        <button
          className="btn-close position-absolute"
          style={{
            top: "20px",
            right: "20px",
          }}
          onClick={() => setShowLogin(false)}
        ></button>

        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary mb-1">🔐 Login</h2>
          <p className="text-muted small">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold small text-muted">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: "var(--input-bg)",
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small text-muted">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: "var(--input-bg)",
                color: "var(--text-main)",
                borderColor: "var(--border-color)",
              }}
            />
          </div>

          <button
            className="btn btn-primary w-100 py-2.5 mb-3"
            type="submit"
            disabled={loading}
            style={{
              borderRadius: "12px",
              background: "var(--primary)",
              border: "none",
            }}
          >
            {loading ? "⏳ Logging In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-2">
          <span className="text-muted small">Don't have an account? </span>
          <button
            className="btn btn-link p-0 small text-decoration-none fw-semibold"
            onClick={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
            style={{ color: "var(--primary)" }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;