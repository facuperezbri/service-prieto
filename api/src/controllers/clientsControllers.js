const prisma = require("../../prisma/prismaDB");

const getClients = async (_req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        Quotes: true,
      },
    });

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
      include: {
        Quotes: true,
      },
    });

    client ? res.json(client) : res.status(261).json(`Client with DNI ${dni} wasn't found.`);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const createClient = async (req, res) => {
  const { dni, name, lastName, email, phoneNumber, address, location, department, province } = req.body;

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
        department,
        province,
      },
      include: {
        Quotes: true,
      },
    });

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const updateClient = async (req, res) => {
  const { dni, name, lastName, email, phoneNumber, address, location, department, province } = req.body;

  try {
    const clientExists = await prisma.client.findUnique({
      where: {
        dni: Number(dni),
      },
    });

    if (!clientExists) return res.status(261).json(`Client with DNI ${dni} wasn't found.`);

    const updateClient = await prisma.client.update({
      where: {
        dni: Number(dni),
      },
      data: {
        name,
        lastName,
        email,
        phoneNumber,
        address,
        location,
        department,
        province,
      },
      include: {
        Quotes: true,
      },
    });

    res.status(201).json(updateClient);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const deleteClient = async (req, res) => {
  const { dni } = req.body;
  try {
    const clientExists = await prisma.client.findUnique({
      where: {
        dni: Number(dni),
      },
    });

    if (!clientExists) return res.status(261).json(`Client with DNI ${dni} wasn't found.`);

    const deletedClient = await prisma.client.delete({
      where: {
        dni: Number(dni),
      },
      include: {
        Quotes: true,
      },
    });

    res.json(deletedClient);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports = { getClients, getClientByDni, createClient, updateClient, deleteClient };
