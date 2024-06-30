const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 8070;

app.use(express.json());
app.use("/api/courses", require("./routes/courseRoutes") ); 
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/resource", require("./routes/resourceRoutes"));
app.use("/api/class_session", require("./routes/classSessionRoutes"));
app.use("/api/student_enrollment", require("./routes/studentRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});