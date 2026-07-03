import React, { useEffect, useState } from "react";

function MyForms() {

    const [forms, setForms] = useState([]);

    useEffect(() => {

        fetchForms();

    }, []);

    async function fetchForms() {

        try {

            const user = JSON.parse(localStorage.getItem("user"));
            console.log("Forms:", data);


            const response = await fetch(
                `http://localhost:5000/api/forms/all/${user.id}`
            );

            const data = await response.json();

            setForms(data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <section className="container py-5">

            <h2 className="text-center mb-4">
                📂 My Forms
            </h2>

            <div className="row">

                {
                    forms.length === 0 ?

                        <h5 className="text-center text-muted">
                            No Forms Found
                        </h5>

                        :

                        forms.map((form) => (

                            <div
                                className="col-md-4 mb-4"
                                key={form._id}
                            >

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h4>{form.title}</h4>

                                        <p>

                                            Total Fields :
                                            {" "}
                                            {form.fields.length}

                                        </p>

                                        <button className="btn btn-primary me-2">
                                            👁 Preview
                                        </button>

                                        <button className="btn btn-warning me-2">
                                            ✏ Edit
                                        </button>

                                        <button className="btn btn-danger">
                                            🗑 Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                }

            </div>

        </section>

    );

}

export default MyForms;