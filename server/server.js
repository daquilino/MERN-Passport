var express = require('express');
var path = require('path');
const routes = require("./routes");
const mongoose = require('mongoose');
const sessions = require('express-sessions');
const mongoStore = require("connect-mongo")(sessions);
const passport = requier("./passport");

var app = express();
var PORT = process.env.PORT || 3001;

// Sets up static folder
app.use(express.static(path.join(__dirname, '../client/build')))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MERNPassport";
var dbConnection = mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// We need to use sessions to keep track of our user's login status
app.use(
    session({
        secret: 'some_random_string', //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, //required
        saveUninitialized: false //required
    })
)

app.use(passport.initialize());
app.use(passport.session());


//Server Test Route
app.use(routes);
app.get("*", (req, res) => res.json("server works"));


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));