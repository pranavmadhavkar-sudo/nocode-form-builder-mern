import React, { useState } from "react";

function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        if (!name || !email || !message) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const response = await fetch("http://localhost:5000/api/contact/send", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })

            });

            const data = await response.json();

            alert(data.message);

            setName("");
            setEmail("");
            setMessage("");

        } catch (error) {

            alert("Server Error!");

        }

    }

    return (

        <section id="contact" className="container py-5">

            <div className="card shadow-lg rounded-4">

                <div className="card-header bg-success text-white">

                    <h2 className="text-center">
                        📩 Contact Us
                    </h2>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Message
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Enter your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>

                        </div>

                        <button
                            className="btn btn-success rounded-pill px-4"
                            type="submit"
                        >
                            📤 Send Message
                        </button>

                    </form>

                </div>

            </div>

        </section>

    );
}

export default Contact;