const { Router } = require("express");

const { getQuotes, getQuoteById, createQuote, updateQuote, deleteQuote } = require("../controllers/quotesControllers");

const router = Router();

router.route("/").get(getQuotes).post(createQuote).put(updateQuote).delete(deleteQuote);

router.use("/:id", getQuoteById);

module.exports = router;
