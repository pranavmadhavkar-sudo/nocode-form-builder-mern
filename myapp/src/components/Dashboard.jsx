import React from "react";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("token");
    const username = user?.username || "Guest";
const email = user?.email || "Not Logged In";

    return (

        <section className="container py-5">

            <h2 className="text-center mb-5">
                📊 Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card shadow text-center p-4">

                        <h5>👤 Username</h5>

                        <h3>{username}</h3>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow text-center p-4">

                        <h5>📧 Email</h5>

                        <h6>{email}</h6>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow text-center p-4">

                        <h5>🟢 Status</h5>

                        <h5 className={isLoggedIn ? "text-success" : "text-danger"}>
    {isLoggedIn ? "🟢 Logged In" : "🔴 Logged Out"}
</h5>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Dashboard;