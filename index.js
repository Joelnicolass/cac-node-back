const express = require("express");
const cors = require("cors");
const { tokenValidator } = require("./utils");
const authRoutes = require("./routes/auth.routes");
const privateRoutes = require("./routes/private.routes");

require("./storages/connection");

const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use(privateRoutes);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
