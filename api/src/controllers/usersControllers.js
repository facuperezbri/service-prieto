const prisma = require("../../prisma/prismaDB");

const getUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    users.sort((a, b) => {
      return a.dni - b.dni;
    });
    res.send(users);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const getUserByDni = async (req, res) => {
  const { dni } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        dni: Number(dni),
      },
    });

    user ? res.json(user) : res.status(261).json(`User with DNI ${dni} wasn't found.`);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const createUser = async (req, res) => {
  const { dni, name, lastName, email, hashedPassword } = req.body;

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

const updateUser = async (req, res) => {
  const { dni, name, lastName, email, hashedPassword, phoneNumber, address, location, department, province, picture } =
    req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        dni: Number(dni),
      },
    });

    if (!userExists) return res.status(261).json(`User with DNI ${dni} wasn't found.`);

    const updateUser = await prisma.user.update({
      where: {
        dni: Number(dni),
      },
      data: {
        dni,
        name,
        lastName,
        email,
        hashedPassword,
        phoneNumber,
        address,
        location,
        department,
        province,
        picture,
      },
    });

    res.status(201).json(updateUser);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const deleteUser = async (req, res) => {
  const { dni } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        dni: Number(dni),
      },
    });

    if (!userExists) return res.status(261).json(`User with DNI ${dni} wasn't found.`);

    const deletedUser = await prisma.user.delete({
      where: {
        dni: Number(dni),
      },
    });

    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports = { getUsers, getUserByDni, createUser, updateUser, deleteUser };
