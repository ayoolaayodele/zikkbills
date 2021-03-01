const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API is on"));

// Define routes
app.use("/api/users", require("./routes/userRoute/users"));
app.use("/api/auth", require("./routes/authRoute/auth"));
app.use("/api/airtel", require("./routes/airtimeRoute/airtelVtu"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
