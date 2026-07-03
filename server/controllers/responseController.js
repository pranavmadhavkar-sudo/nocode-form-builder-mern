const Response = require("../models/Response");

// Save Response
const saveResponse = async (req, res) => {

    try {

        const { formId, answers } = req.body;

        const response = new Response({

            formId,
            answers

        });

        await response.save();

        res.status(201).json({

            message: "Response Submitted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Get Responses
const getResponses = async (req, res) => {

    try {

        const responses = await Response.find({
            formId: req.params.formId
        });

        res.json(responses);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    saveResponse,
    getResponses

};