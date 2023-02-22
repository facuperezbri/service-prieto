const prisma = require("../../prisma/prismaDB");

const getClients = async (_req, res) => {
  try {
    const clients = await prisma.client.findMany();
    clients.sort((a, b) => {
      return a.dni - b.dni;
    });
    res.send(clients);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const getClientByDni = async (req, res) => {
  const { dni } = req.params;

  try {
    const client = await prisma.client.findUnique({
      where: {
        dni: Number(dni),
      },
    });
    client ? res.json(client) : res.json(`Client with DNI ${dni} wasn't found.`);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const createClient = async (req, res) => {
  const { dni, name, lastName, email, phoneNumber, address, location, province } = req.body;

  try {
    const clientExists = await prisma.client.findUnique({
      where: {
        dni: Number(dni),
      },
    });
    if (clientExists) return res.status(260).json(`Client with ${dni} already exists`);
    const client = await prisma.client.create({
      data: {
        dni: Number(dni),
        name,
        lastName,
        email,
        phoneNumber,
        address,
        location,
        province,
      },
    });
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const updateClient = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const deleteClient = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports = { getClients, getClientByDni, createClient, updateClient, deleteClient };
