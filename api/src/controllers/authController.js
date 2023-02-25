const prisma = require("../../prisma/prismaDB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  const { dni, name, lastName, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        dni: Number(dni),
      },
    });

    if (userExists) return res.status(260).json(`Client with ${dni} already exists`);

    const user = await prisma.user.create({
      data: {
        dni: Number(dni),
        name,
        lastName,
        email,
        hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const handleLogin = async (req, res) => {
  const { dni, password } = req.body;

  try {
    if (!dni || !password) return res.status(400).json({ message: "DNI and password are required." });

    const userExists = await prisma.user.findUnique({
      where: {
        dni: Number(dni),
      },
    });

    if (!userExists) return res.sendStatus(401);

    const matchPassword = bcrypt.compareSync(password, userExists.hashedPassword);

    if (matchPassword) {
      const accessToken = jwt.sign(
        {
          dni: userExists.dni,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      const refreshToken = jwt.sign(
        {
          dni: userExists.dni,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await prisma.user.update({
        where: {
          dni: userExists.dni,
        },
        data: {
          refreshToken,
        },
      });

      res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;

    const user = await prisma.user.findUnique({
      where: {
        refreshToken,
      },
    });

    res.clearCookie("jwt", { httpOnly: true });

    if (!user) return res.sendStatus(403);

    await prisma.user.update({
      where: {
        refreshToken,
      },
      data: {
        refreshToken: null,
      },
    });
    res.json({ message: "Logout succesfull" });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports = { handleRegister, handleLogin, handleLogout };
