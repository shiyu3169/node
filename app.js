const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// const logger = function(req, res, next) {
//     console.log("Logging...");
//     next();
// };

// app.use(logger);

// Body Parse Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    res.send("hello world");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
