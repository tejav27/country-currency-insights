const express = require("express");
const cors = require("cors");

const authRoute = require("./routes/auth");
const countryRoute = require("./routes/country");
const logger = require("./middleware/Logger");
const notFoundRoute = require("./routes/404");

const { errorHandler } = require("./errors/errorHandler");

require("dotenv").config();

// express app
const app = express();

app.use(cors());

// middleware
app.use(logger);
app.use(express.json());

// routes
app.use("/api", authRoute);
app.use("/api/country", countryRoute);
app.use(errorHandler);
app.use(notFoundRoute);

// Listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
