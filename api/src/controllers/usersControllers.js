const prisma = require("../../prisma/prismaDB");

const getUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
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
    user ? res.json(user) : res.json(`User with DNI ${dni} wasn't found.`);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const createUser = async (req, res) => {
  try {
    res.json("Post route");
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    res.json("Update route");
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    res.json("Deleter route");
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports = { getUsers, getUserByDni, createUser, updateUser, deleteUser };
