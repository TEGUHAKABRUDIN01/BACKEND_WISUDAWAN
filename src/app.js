const express = require("express");
const authRoutes = require("./routes/auth.routes.js");
const admiWisudaRoutes = require("./routes/admin.routes.js");
// const prodiRoutes = require("./routes/prodi.routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// end point API
app.use("/wisudawan", authRoutes);
app.use("/admin", admiWisudaRoutes);
// app.use("/wisudawan", prodiRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

module.exports = app;
