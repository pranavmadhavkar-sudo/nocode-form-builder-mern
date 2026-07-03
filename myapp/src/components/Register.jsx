import React, { useState } from "react";

function Login({ setIsLoggedIn, setShowLogin }) {

const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

 

    async function handleRegister() {

           if (!email || !password) {
    alert("Please fill all fields.");
    return;
}

        try {

            const response = await fetch("http://localhost:5000/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (response.ok) {

                alert(data.message);

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                setIsLoggedIn(true);
                setShowLogin(false);

            } else {

                alert(data.message);

            }

        } catch (error) {

            alert("Server Error!");

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
                background: "rgba(0,0,0,0.5)",
                zIndex: 99999
            }}
        >

            <div
                className="card shadow-lg p-4 position-relative"
                style={{ width: "400px" }}
            >

                <button
                    className="btn-close position-absolute"
                    style={{
                        top: "15px",
                        right: "15px"
                    }}
                    onClick={() => setShowLogin(false)}
                ></button>

                <h2 className="text-center mb-4">
                    🔐 Login
                </h2>

                <div className="mb-3">
                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={handleRegister}
                >
                    Register
                </button>

            </div>

        </div>

    );

}

export default Login;