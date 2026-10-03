import express from "express";
import "dotenv/config";
import webRoutes from "routes/web";
import initDatebase from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";

const app = express();
const port = process.env.PORT || 8080;

//config view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static files: image, css, js
app.use(express.static("public"));

//config session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  }),
);

//config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

//config routes
webRoutes(app);

//seeding data
initDatebase();

//handle 404 not found
app.use((req, res) => {
  res.status(404).render("client/404.ejs");
});
app.listen(port, () => {
  console.log(`My app is running on port: ${port}`);
  console.log("env port: ", process.env.PORT);
});
