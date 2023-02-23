const prisma = require("../../prisma/prismaDB");

const getQuotes = async (req, res) => {
  const { dni } = req.body;
  try {
    if (dni) {
      const quote = await prisma.quote.findMany({
        where: {
          clientDni: Number(dni),
        },
        include: {
          Items: true,
        },
      });

      if (quote) {
        return res.json(quote);
      } else {
        return res.status(261).json(`Quote with DNI ${id} wasn't found.`);
      }
    }

    const quotes = await prisma.quote.findMany({
      include: {
        Items: true,
      },
    });

    quotes.sort((a, b) => {
      return a.dni - b.dni;
    });

    res.send(quotes);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const getQuoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const quote = await prisma.quote.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Items: true,
      },
    });

    quote ? res.json(quote) : res.status(261).json(`Quote with ID ${id} wasn't found.`);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const createQuote = async (req, res) => {
  const { dni, items } = req.body;

  try {
    const clientExists = await prisma.client.findUnique({
      where: {
        dni: Number(dni),
      },
    });

    if (!clientExists) return res.status(261).json(`Client with DNI ${dni} wasn't found.`);

    const createQuote = await prisma.quote.create({
      data: {
        clientDni: Number(dni),
        Items: {
          createMany: {
            data: items,
          },
        },
      },
      include: {
        Items: true,
      },
    });

    res.send(createQuote);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const updateQuote = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const deleteQuote = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

module.exports = { getQuotes, getQuoteById, createQuote, updateQuote, deleteQuote };
