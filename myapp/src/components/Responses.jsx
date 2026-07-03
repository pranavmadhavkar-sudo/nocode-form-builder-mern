import React, { useState } from "react";

function Responses() {

    const [formId, setFormId] = useState("");
    const [responses, setResponses] = useState([]);

    async function loadResponses() {

        try {

            const res = await fetch(
                `http://localhost:5000/api/responses/${formId}`
            );

            const data = await res.json();

            setResponses(data);

        } catch (error) {

            alert("Unable to load responses");

        }

    }

    return (

        <div className="container py-5">

            <h2 className="text-center">
                📊 Form Responses
            </h2>

            <input
                className="form-control mt-4"
                placeholder="Enter Form ID"
                value={formId}
                onChange={(e)=>setFormId(e.target.value)}
            />

            <button
                className="btn btn-primary mt-3"
                onClick={loadResponses}
            >
                Load Responses
            </button>

            <hr/>

            {
                responses.map((item)=>(
                    <div
                        className="card p-3 mb-3"
                        key={item._id}
                    >

                        <pre>
                            {JSON.stringify(item.answers,null,2)}
                        </pre>

                    </div>
                ))
            }

        </div>

    );

}

export default Responses;