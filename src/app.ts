import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/about", (req, res) => {
  res.send("<h1>About page</h1>");
});

app.listen(port, () => {
  console.log(`My app is running on port: ${port}`);
  console.log("env port: ", process.env.PORT);
});
