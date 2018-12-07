const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const logger = function(req, res, next) {
    console.log("Logging...");
    next();
};

app.use(logger);

app.get("/", function(req, res) {
    res.send("hello world");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
