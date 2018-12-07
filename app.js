const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// const logger = function(req, res, next) {
//     console.log("Logging...");
//     next();
// };

// app.use(logger);

// View Engine
app.set("view engine", "ejs");
app.set("vies", path.join(__dirname, "views"));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use(express.static(path.join(__dirname, "public")));

// const person = {
//     name: "Jeff",
//     age: 30
// };

// const people = [
//     { name: "jeff", age: 30 },
//     { name: "Sara", age: 22 },
//     { name: "Bill", age: 40 }
// ];

const users = [
    { firstName: "John", lastName: "Doe", email: "johndoe@gmail.com" },
    { firstName: "Bob", lastName: "Smith", email: "bobsmith@gmail.com" },
    { firstName: "Jill", lastName: "Jacksom", email: "jjackson@gmail.com" }
];

app.get("/", function(req, res) {
    res.render("index", { title: "Customers", users: users });
});

app.post("/users/add", function(req, res) {
    const { firstName, lastName, email } = req.body;
    const newUser = {
        firstName,
        lastName,
        email
    };
    console.log(newUser);
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
