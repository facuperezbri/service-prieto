const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const prisma = require("../prisma/prismaDB");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
