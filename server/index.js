const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/contact",contactRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 No-Code Form Builder Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});