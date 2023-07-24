// Import the Mongoose library

const mongoose = require('mongoose');

// Connect to the MongoDB database named 'contact_list' running locally on 'localhost'
mongoose.connect("mongodb://127.0.0.1:27017/contact_list");

// Get a reference to the default Mongoose connection
const db = mongoose.connection;

// Event listener for 'error' event of the connection
// db.on('error', console.error.bind(console, "error connecting to db"));
db.on('error', function(err){
    console.log("error occured while connecting the server to db")
})

// Event listener for 'open' event of the connection
db.once('open', function(){
    console.log("connected to the DataBase");
});
