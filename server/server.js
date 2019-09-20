const express = require('express');
const path = require('path');
const routes = require("./routes");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const PORT = process.env.PORT || 3001;

var app = express();

// Sets up static folder
app.use(express.static(path.join(__dirname, '../client/build')))

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/MERNPassport";
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true });

// We need to use sessions to keep track of our user's login status
// some comment about store
// maybe look up and explain resave, soaveUniniliazed
app.use(
    session({
        secret: 'some_random_string_abracadabra', //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
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