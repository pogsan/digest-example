// Express module.
// eslint-disable-next-line node/no-unpublished-require
const express = require("express");

// Authentication module.
// eslint-disable-next-line node/no-unpublished-require
const auth = require("http-auth");
// eslint-disable-next-line node/no-unpublished-require
const authConnect = require("http-auth-connect");

const digest = auth.digest({
    realm: "realm",
    file: __dirname + "/pass" // gevorg:gpass, Sarah:testpass
});

// Application setup.
const app = express();

// const passport = require("passport");
// passport.use(authPassport(digest));

// app.get("/", passport.authenticate("http", { session: false }), (req, res) => {
//     res.end(`Welcome to private area - ${req.user}!`);
// });

// app.use(authConnect(digest));

app.use((req, res, next) => {
    console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    next();
});

// Setup route.
app.get("/", authConnect(digest), (req, res) => {
    res.send(`Hello from express - ${req.user}!`);
});


app.get("/hoge", (req, res) => {
    res.send(`hoge!`);
});

// Start server.
app.listen(3000, () => {
    // Log URL.
    console.log("Server running at localhost:3000/");
});