const prisma = require("../../prisma/prismaDB");

const isAdmin = async (req, res, next) => {
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

  if (!user) return res.sendStatus(403);

  if (!user.admin) return res.sendStatus(403);

  next();
};

module.exports = isAdmin;
