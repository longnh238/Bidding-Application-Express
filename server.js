const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouters = require("./routes/UserRoutes");
const { importUsers } = require("./controllers/UserController");

const itemRoutes = require("./routes/ItemRoutes");
const { importItems } = require("./controllers/ItemController");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("");
    console.log("Connected to MongoDB...");

    // importUsers();
    // importItems();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const URL_PREFIX = process.env.URL_PREFIX || "/";
app.use(URL_PREFIX + "/items", itemRoutes);
app.use(URL_PREFIX + "/users", userRouters);
