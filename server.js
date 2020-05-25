const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });

connectDB();

const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const product = require("./routes/api/product");

// Init app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/product", product);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
