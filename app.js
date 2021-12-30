const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const connectDb = require("./db/connectDb");
const notFound = require("./middleWare/errorPage");
const errorHandler = require("./middleWare/errorHandler");
const router = require("./routes/taskRoute");

const port = process.env.PORT || 5000;
const uri = process.env.URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/tasks", router);
app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connectDb(uri);
    app.listen(port, console.log(`server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => res.send("Salut"));

start();
