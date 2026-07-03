const express = require("express");


const router = express.Router();

const {
  saveForm,
    getForms,
deleteForm
} = require("../controllers/formController");

router.post("/save", saveForm);
router.delete("/:id", deleteForm);

router.get("/all/:userId", getForms);

module.exports = router;