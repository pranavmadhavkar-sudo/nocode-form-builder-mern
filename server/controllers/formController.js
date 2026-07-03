const Form = require("../models/Form");

// Save Form
const saveForm = async (req, res) => {
        console.log("Request Body:", req.body);
  try {
    const { title, userId, fields } = req.body;

    const form = new Form({
      title,
      userId,
      fields,
    });

    await form.save();

    res.status(201).json({
      success: true,
      message: "Form Saved Successfully",
      form,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Forms
const getForms = async (req, res) => {

    try {

        const { userId } = req.params;

        const forms = await Form.find({ userId });

        res.status(200).json(forms);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// Delete Form

const deleteForm = async (req, res) => {

    try {

        await Form.findByIdAndDelete(req.params.id);

        res.status(200).json({

            message: "Form Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
module.exports = {

    saveForm,
    getForms,
    deleteForm

};