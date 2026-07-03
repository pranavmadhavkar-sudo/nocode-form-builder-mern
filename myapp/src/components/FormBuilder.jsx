import React, { useState } from "react";

function FormBuilder() {

    const [fields, setFields] = useState([]);

    const [selectedField, setSelectedField] = useState(null);
    const currentField = fields.find(
    (field) => field.id === selectedField
);
    const [darkMode, setDarkMode] = useState(false);

    function addField(type) {

   const newField = {

    id: Date.now(),

    type: type,

    label:
        type.charAt(0).toUpperCase() + type.slice(1),

    placeholder:
        "Enter " + type,

    required: false

};

    const updatedFields = [...fields, newField];

setFields(updatedFields);

setSelectedField(newField.id);

}

    function clearForm() {

        setFields([]);

    }
    function deleteField(id) {

    const updatedFields = fields.filter(

        (field) => field.id !== id

    );

    setFields(updatedFields);

}

function moveUp(index) {

    if (index === 0) return;

    const updated = [...fields];

    [updated[index], updated[index - 1]] =
    [updated[index - 1], updated[index]];

    setFields(updated);

}

function moveDown(index) {

    if (index === fields.length - 1) return;

    const updated = [...fields];

    [updated[index], updated[index + 1]] =
    [updated[index + 1], updated[index]];

    setFields(updated);

}

    async function saveForm() {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch("http://localhost:5000/api/forms/save", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                title: "My Dynamic Form",

                userId: user.id,

                fields: fields

            })

        });

        const data = await response.json();

        if (response.ok) {

            alert("✅ Form Saved to MongoDB");

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("❌ Error Saving Form");

    }

}

function loadForm() {

    const savedForm = localStorage.getItem("myForm");

    if(savedForm){

        setFields(JSON.parse(savedForm));

        alert("Form Loaded Successfully!");

    }

    else{

        alert("No Saved Form Found!");

    }

}

function exportJSON() {

    const jsonData = JSON.stringify(fields, null, 2);

    const blob = new Blob([jsonData], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "form_structure.json";

    a.click();

}

function lightTheme() {

    document.body.style.background = "#eef4ff";
    document.body.style.color = "black";

}

function darkTheme() {

    document.body.style.background = "#212529";
    document.body.style.color = "white";

}

    return (

        <section id="builder" className="container py-5">

            <h2 className="text-center mb-5">

                Dynamic Form Builder

            </h2>

            <div className="row">

                {/* Left Panel */}

                <div className="col-lg-4">

                    <div className="card shadow p-3">

                        <h4 className="mb-3">

                            Form Controls

                        </h4>

                        <button
                            className="btn btn-primary w-100 mb-2"
                            onClick={() =>
                                addField("text")
                            }
                        >
                            ➕ Text Field
                        </button>

                        <button
                            className="btn btn-success w-100 mb-2"
                            onClick={() =>
                                addField("email")
                            }
                        >
                            📧 Email
                        </button>

                        <button
                            className="btn btn-warning w-100 mb-2"
                            onClick={() =>
                                addField("number")
                            }
                        >
                            🔢 Number
                        </button>

                        <button
                            className="btn btn-info w-100 mb-2"
                            onClick={() =>
                                addField("date")
                            }
                        >
                            📅 Date
                        </button>

                        <button
                            className="btn btn-secondary w-100 mb-2"
                            onClick={() =>
                                addField("password")
                            }
                        >
                            🔒 Password
                        </button>

                        <button
                            className="btn btn-dark w-100 mb-2"
                            onClick={() =>
                                addField("textarea")
                            }
                        >
                            📝 Textarea
                        </button>

                        <button
                            className="btn btn-danger w-100 mt-3"
                            onClick={clearForm}
                        >
                            🗑 Clear Form
                        </button>

                        <button
className="btn btn-success w-100 mt-2"
onClick={saveForm}
>

💾 Save Form

</button>

<button
className="btn btn-primary w-100 mt-2"
onClick={loadForm}
>
📂 Load Saved Form


</button>

<button
className="btn btn-warning w-100 mt-2"
onClick={exportJSON}
>

📤 Export JSON

</button>

<hr/>

<h5 className="text-center">
Theme
</h5>

<button
className="btn btn-light border w-100 mt-2"
onClick={lightTheme}
>

☀️ Light Theme

</button>

<button
className="btn btn-dark w-100 mt-2"
onClick={darkTheme}
>

🌙 Dark Theme

</button>
                        <hr />

<h5 className="mt-4">Selected Field</h5>

{
    currentField ? (

        <div className="card p-3 mt-3">

            <h5>Field Properties</h5>

            <label className="form-label mt-2">
                Label
            </label>

            <input
                type="text"
                className="form-control"
                value={currentField.label}
                onChange={(e) => {

                    const updated = [...fields];

                    const index = updated.findIndex(
                        field => field.id === currentField.id
                    );

                    updated[index].label = e.target.value;

                    setFields(updated);

                }}
            />

        </div>

    ) : (

        <div className="alert alert-secondary mt-3">

            Select any field to edit its properties.

        </div>

    )
}

                    </div>

                </div>

                {/* Right Panel */}

                <div className="col-lg-8">

                    <div className="card shadow">

                        <div className="card-header bg-primary text-white">

                            <h4>

                                Live Preview

                            </h4>

                        </div>

                        <div className="card-body">

                            {

                                fields.length === 0 ?

                                    <p className="text-center text-muted">

                                        Your form fields will appear here.

                                    </p>

                                    :

                                    fields.map((field, index) =>(

                                        <div
    className={`card p-3 mb-3 ${
        selectedField === field.id
            ? "border border-primary border-3"
            : ""
    }`}
    key={field.id}
    onClick={() => setSelectedField(field.id)}
>

                                            <div className="d-flex justify-content-between align-items-center mb-2">

  <label className="form-label fw-bold">
    {field.label || field.type.charAt(0).toUpperCase() + field.type.slice(1)}
</label>

    <div className="d-flex">

    <button
        className="btn btn-secondary me-1"
        onClick={() => moveUp(index)}
    >
        ⬆️
    </button>

    <button
        className="btn btn-secondary me-1"
        onClick={() => moveDown(index)}
    >
        ⬇️
    </button>

    <button
        className="btn btn-danger"
        onClick={() => deleteField(field.id)}
    >
        ❌
    </button>

</div>

</div>

                                            {

                                                field.type === "textarea" ?

                                                    <textarea
                                                        className="form-control"
                                                        rows="4"
                                                    />

                                                    :

                                                    <input
    type={field.type}
    className="form-control"
    placeholder={field.label || "Enter Value"}
/>

                                            }

                                        </div>

                                    ))

                            }

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default FormBuilder;