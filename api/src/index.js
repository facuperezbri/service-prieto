const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(require("./routes"));

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
