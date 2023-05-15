const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let guests = [];
let times = [];

app.get("/", (req, res) =>
{
    res.render("guest", {guestsName: guests, timeSignIn: times});
});

app.post("/", (req, res) =>
{
    let today = new Date();
    let options = {day: "numeric", weekday: "short", year: "numeric",
        month: "short", hour: "2-digit", minute: "2-digit",
        hour12: false};
    let currentDate = today.toLocaleDateString("en-US", options);
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    guests.push(firstName + " " + lastName);
    times.push(currentDate);
    res.redirect("/");
});

app.listen(3000, ()=>
{
    console.log("Server started on port 3000");
});