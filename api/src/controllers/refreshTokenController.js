const prisma = require("../../prisma/prismaDB");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
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

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
    if (error || user.dni !== decoded.dni) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        dni: user.dni,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
