const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(bodyParser.json()); // map request to req.body

app.use("/api", indexRouter); // will concatenate /api in front of router path e.g. /tasks -> /api/tasks

const mongoURI = process.env.DB_LOCAL;

mongoose
  .connect(mongoURI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection failed: ", err));

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log("server error: ", err)
    return;
  }
  console.log("server running on " + process.env.PORT);
});
