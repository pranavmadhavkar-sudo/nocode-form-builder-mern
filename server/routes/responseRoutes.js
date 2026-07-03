const express = require("express");

const router = express.Router();

const {

    saveResponse,
    getResponses

} = require("../controllers/responseController");

router.post("/submit", saveResponse);

router.get("/:formId", getResponses);

module.exports = router;