const Contact = require("../models/Contact");

const saveContact = async(req,res)=>{

    try{

        const {name,email,message}=req.body;

        const contact=new Contact({
            name,
            email,
            message
        });

        await contact.save();
        console.log("✅ Contact Saved:", contact);

        res.status(201).json({
    success: true,
    message: "✅ Message Sent Successfully & Saved to MongoDB"
});

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}

module.exports={saveContact};