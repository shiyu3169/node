const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// const logger = function(req, res, next) {
//     console.log("Logging...");
//     next();
// };

// app.use(logger);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use(express.static(path.join(__dirname, "public")));

// const person = {
//     name: "Jeff",
//     age: 30
// };

const people = [
    { name: "jeff", age: 30 },
    { name: "Sara", age: 22 },
    { name: "Bill", age: 40 }
];

app.get("/", function(req, res) {
    res.json(people);
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
