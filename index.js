// Import the Express module
const express = require("express");
const path = require('path');
const port = 4000;

const db = require("./config/mongoose");
const Contact = require("./models/contact.js");
// Create an instance of the Express application
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// 1. Middleware to parse incoming data from HTML forms
app.use(express.urlencoded());

// 2. Middleware to serve static files from the "assets" directory
app.use(express.static("assets"));


// middleware1
// app.use(function(req,res,next){
//     req.myName="venkatesh"
//     // console.log("middelware1")
//     next();

// })
// // middleware2
// app.use(function(req,res,next){
//     console.log("my name from mw2",req.myName)
//     // console.log("midddleware2");
//     next();
// })


var contactList=[
    { 
        name:"venkaetsh",
        phone:"8978451860"
    },
    {
        name:"thor",
        phone:"+415857493"
    },
    {
        name:"loki",
        phone:"+572090202"
    }

]

// Handle GET request for the root path ("/")
app.get("/", function(req, res) {
    // This route handles the GET request to the root URL ("/")

    // The callback function takes two parameters: req (request) and res (response)
    Contact.find({}, function(err,contacts){
        if(err){
            console.log("Error in fetching contacts from database");
            return;
        }
        return res.render('home', {
            // When the route is accessed, the 'home' template is rendered
    
            title: "Contact List", // A title variable is passed to the template with the value "Contact List"
    
            contact_list:contacts // The contactList variable is passed to the template as the contact_list variable
        });
    
    })

    // return res.render('home', {
    //     // When the route is accessed, the 'home' template is rendered

    //     title: "Contact List", // A title variable is passed to the template with the value "Contact List"

    //     contact_list: contactList // The contactList variable is passed to the template as the contact_list variable
    // });


    
    // Send the response with the message "cool, it is running"
    // res.send("<h1>cool, it's running</1h>");
});
app.get("/practice", function(req,res){

    return res.render("practice",{
        tittle:"hey how r u"
    })
});
// send the form data to the server from home.ejs file
app.post("/create-contact", function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err,newContact){
        if(err){
            console.log("error in creating contact");
            return;
        }
        console.log("******",newContact);
        return res.redirect('back');
    })

    // });
    // to append the form data to the contactList
    // console.log(req.body);
    // return res.redirect('back');
})
//  for deleting a contact
// This is an Express route handler for the GET request to "/delete-contact/".
app.get("/delete-contact/", function(req, res) {
    // Extract the 'phone' query parameter from the URL.
    // let phone = req.query.phone;
    let id = req.query.id;


    // Find the index of the contact in the 'contactList' array that matches the provided 'id'.
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting an objexct from database");
            return ;

    
        }
        return res.redirect('back');

    });
});

    // If a matching contact is found (contactIndex is not -1), remove it from the 'contactList' array using splice.
//     if (contactIndex != -1) {
//         contactList.splice(contactIndex, 1);
//     }

//     // Redirect the user back to the previous page (the page where the delete request originated from).
//     return res.redirect('back');
// });


// Start the server and listen for incoming requests
app.listen(port, function(err, data) {
    if (err) {
        console.log("Express server is not running");
    }
    console.log("Express server is running at port:", port);
});
