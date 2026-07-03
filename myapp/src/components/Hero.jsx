function Hero() {

  return (

    <section id="home" className="hero">

      <div className="container text-center">

        <h1 className="display-3 fw-bold">
          No-Code Dynamic Form Builder
        </h1>

        <p className="lead mt-3">
          Create professional digital forms without writing code.
        </p>

        <div className="mt-4">

    <span className="badge bg-light text-dark me-2 p-2">
        ⚛ React
    </span>

    <span className="badge bg-success me-2 p-2">
        🟢 Node.js
    </span>

    <span className="badge bg-warning text-dark me-2 p-2">
        🍃 MongoDB
    </span>

    <span className="badge bg-danger p-2">
        🔐 JWT
    </span>

</div>

        <div className="student-card mt-5">

          <h3>👨‍💻 Developed By</h3>

          <h2>Pranav Madhavkar</h2>

          <h4>USN : CS25D016</h4>

          <a href="#problem" className="btn btn-light mt-3">
            📄 View Problem Statement
          </a>

        </div>

      </div>

    </section>

  );

}

export default Hero;