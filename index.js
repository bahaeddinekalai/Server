const express = require("express");
const mongoose = require("mongoose");
const reservationRoutes = require("./routes/reservationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const offerRoutes = require("./routes/offerRoutes");
const dotenv = require("dotenv");
const offersCleanupJob = require('./schedules/offersCleanup');

// use offersCleanupJob 


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// console.log a success message if the connection is successful
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});
// console.log an error message if the connection fails
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ");
  console.log(err.message);
});

app.use(express.json());

app.use("/api", reservationRoutes);
app.use("/api", adminRoutes);
app.use("/api", offerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/ `);
  offersCleanupJob;
});

