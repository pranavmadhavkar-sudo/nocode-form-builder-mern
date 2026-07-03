function Navbar({ setIsLoggedIn, isLoggedIn, setShowLogin }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow fixed-top">
      <div className="container">

        <a className="navbar-brand fw-bold" href="#">
          No-Code Form Builder
        </a>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#problem">Problem</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#builder">Builder</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>

      <li className="nav-item ms-3">

    {
        isLoggedIn ? (

            <button
    className="btn btn-danger rounded-pill px-4"
    onClick={() => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);

        alert("Logged Out Successfully!");

    }}
>
    🚪 Logout
</button>


        ) : (
          

            <button
  className="btn btn-success rounded-pill px-4"
  onClick={() => {
    console.log("Login clicked");
    alert("Login clicked");
    setShowLogin(true);
  }}
>
  
  Login
</button>

        )
    }

</li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;