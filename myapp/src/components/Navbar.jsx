import React from "react";

function Navbar({ 
  setIsLoggedIn, 
  isLoggedIn, 
  setShowLogin, 
  setShowRegister,
  activeTab,
  setActiveTab 
}) {
  return (
    <nav 
      className="navbar navbar-expand-lg sticky-top shadow-sm"
      style={{
        background: "var(--navbar-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-color)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="container">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a 
          className="navbar-brand fw-bold text-primary d-flex align-items-center" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (isLoggedIn) setActiveTab("dashboard");
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="me-2 fs-4">⚡</span> No-Code Form Builder
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "var(--border-color)" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "var(--text-main) === '#f8fafc' ? 'invert(1)' : 'none'" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto align-items-center gap-2 mt-3 mt-lg-0">
            {isLoggedIn ? (
              // Navigation options when logged in (Dashboard tabs)
              <>
                <li className="nav-item">
                  <button 
                    className={`nav-link border-0 bg-transparent fw-semibold ${activeTab === "dashboard" ? "text-primary" : "text-secondary"}`}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    📊 Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link border-0 bg-transparent fw-semibold ${activeTab === "builder" ? "text-primary" : "text-secondary"}`}
                    onClick={() => setActiveTab("builder")}
                  >
                    🛠️ Builder
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link border-0 bg-transparent fw-semibold ${activeTab === "myforms" ? "text-primary" : "text-secondary"}`}
                    onClick={() => setActiveTab("myforms")}
                  >
                    📂 My Forms
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link border-0 bg-transparent fw-semibold ${activeTab === "responses" ? "text-primary" : "text-secondary"}`}
                    onClick={() => setActiveTab("responses")}
                  >
                    📥 Responses
                  </button>
                </li>
                <li className="nav-item ms-lg-3">
                  <button
                    className="btn btn-danger btn-sm px-4 py-2"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      setIsLoggedIn(false);
                      alert("🚪 Logged Out Successfully!");
                    }}
                    style={{ borderRadius: "10px" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Navigation options when logged out (Landing page anchors)
              <>
                <li className="nav-item">
                  <a className="nav-link fw-semibold text-secondary" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-semibold text-secondary" href="#problem">Problem</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-semibold text-secondary" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-semibold text-secondary" href="#contact">Contact</a>
                </li>
                
                <li className="nav-item ms-lg-3 d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm px-3.5 py-2"
                    onClick={() => setShowLogin(true)}
                    style={{ borderRadius: "10px" }}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-primary btn-sm px-3.5 py-2"
                    onClick={() => setShowRegister(true)}
                    style={{ borderRadius: "10px", background: "var(--primary)", border: "none" }}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;