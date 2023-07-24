// Import the 'mongoose' library and assign its 'default' property to the 'mongoose' variable.
const { default: mongoose } = require('mongoose');

// Import the 'mongoose' library and assign it to the 'mongosse' variable (note the typo in the variable name, it should be 'mongoose' instead).
const mongose = require('mongoose');

// Create a new Mongoose Schema for defining the structure of a 'contact' document in the MongoDB collection.
const contactSchema = new mongose.Schema({
    name: {
        type: String,
        required: true // 'name' field is required and should be of type String.
    },
    phone: {
        type: String,
        required: true // 'phone' field is required and should be of type String.
    }
});

// Create a Mongoose model based on the 'contactSchema'. This model will be used to interact with the 'Contact' collection in MongoDB.
const Contact = mongoose.model("Contact", contactSchema);

// Export the 'Contact' model so that it can be used in other parts of the application.
module.exports = Contact;
