import React, { useState, useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemStatement from "./components/ProblemStatement";
import FormBuilder from "./components/FormBuilder";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import MyForms from "./components/MyForms";
import Responses from "./components/Responses";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | builder | myforms | responses
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [editingForm, setEditingForm] = useState(null);

  // Check auth status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setActiveTab("dashboard");
    }
  }, []);

  // When login state changes, handle default tabs
  const handleLoginSuccess = (status) => {
    setIsLoggedIn(status);
    if (status) {
      setActiveTab("dashboard");
    } else {
      setActiveTab("dashboard");
    }
  };

  const handleEditForm = (form) => {
    setEditingForm(form);
    setActiveTab("builder");
  };

  const handlePreviewForm = (form) => {
    setEditingForm(form);
    setActiveTab("builder");
  };

  const handleSaveSuccess = () => {
    // Refresh forms tab or redirect
    setEditingForm(null);
  };

  return (
    <>
      <Navbar
        setIsLoggedIn={handleLoginSuccess}
        isLoggedIn={isLoggedIn}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {isLoggedIn ? (
        // Logged In Dashboard Container
        <main className="dashboard-container" style={{ minHeight: "calc(100vh - 70px)", paddingTop: "20px" }}>
          <div className="container">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "builder" && (
              <FormBuilder 
                initialForm={editingForm} 
                onSaveSuccess={handleSaveSuccess} 
              />
            )}
            {activeTab === "myforms" && (
              <MyForms 
                onEditForm={handleEditForm} 
                onPreviewForm={handlePreviewForm} 
              />
            )}
            {activeTab === "responses" && <Responses />}
          </div>
        </main>
      ) : (
        // Logged Out Landing Page Layout
        <>
          <Hero />
          
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <ProblemStatement />
                
                {/* Form Builder Preview banner for logged out users */}
                <section className="text-center py-5 my-4 border rounded-4 shadow-sm" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
                  <h3 className="fw-bold mb-3">Build forms easily, without code</h3>
                  <p className="text-muted mb-4">Add form inputs, create validation limits, and export fields. Log in to save forms to the database.</p>
                  <button 
                    className="btn btn-primary px-4 py-2.5"
                    onClick={() => setShowLogin(true)}
                    style={{ background: "var(--primary)", border: "none", borderRadius: "10px" }}
                  >
                    🚀 Get Started Now
                  </button>
                </section>

                <About />
                <Contact />
              </div>
            </div>
          </div>
          
          <Footer />
        </>
      )}

      {/* Auth Overlay Modals */}
      {showLogin && (
        <Login
          setIsLoggedIn={handleLoginSuccess}
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
        />
      )}

      {showRegister && (
        <Register
          setIsLoggedIn={handleLoginSuccess}
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
        />
      )}
    </>
  );
}

export default App;