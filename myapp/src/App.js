import React, { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemStatement from "./components/ProblemStatement";
import FormBuilder from "./components/FormBuilder";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (

    <>
      {

        <>
   <Navbar
  setIsLoggedIn={setIsLoggedIn}
  isLoggedIn={isLoggedIn}
  setShowLogin={setShowLogin}
/>

    <Hero />
    <Dashboard />

    <ProblemStatement />

    <FormBuilder />
   

    <About />

    <Contact />

    <Footer />
    {
  showLogin && (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        zIndex: 99999
      }}
    >
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setShowLogin={setShowLogin}
      />
    </div>
  )
}
</>

      }

    </>

  );

}

export default App;