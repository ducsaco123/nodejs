import express from "express";
import "dotenv/config";
import webRoutes from "./routes/web";

const app = express();
const port = process.env.PORT || 8080;

//config view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

//config routes
webRoutes(app);

//config static files: image, css, js
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`My app is running on port: ${port}`);
  console.log("env port: ", process.env.PORT);
});
