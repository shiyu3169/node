const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { check, validationResult } = require("express-validator/check");
const mongojs = require("mongojs");

var db = mongojs("customerapp", ["users"]);

const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("vies", path.join(__dirname, "views"));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use(express.static(path.join(__dirname, "public")));

// Global Vars
app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
});

app.get("/", function(req, res) {
    db.users.find(function(err, docs) {
        console.log(docs);
        res.render("index", { title: "Customers", users: docs });
    });
});

app.post(
    "/users/add",
    [
        check("firstName")
            .isLength({ min: 1 })
            .withMessage("invalid first name"),
        check("lastName")
            .isLength({ min: 1 })
            .withMessage("invalid last name"),
        check("email")
            .isLength({ min: 1 })
            .withMessage("invalid email")
    ],
    (req, res) => {
        const { firstName, lastName, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            db.users.find(function(err, docs) {
                res.render("index", {
                    title: "Customers",
                    users: docs,
                    errors: errors.array()
                });
            });
        } else {
            const newUser = {
                firstName,
                lastName,
                email
            };
            db.users.insert(newUser, function(err, result) {
                if (err) {
                    console.log(err);
                }
                res.redirect("/");
            });
        }
    }
);

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
