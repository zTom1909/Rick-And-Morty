const express = require("express");
const router = express.Router();

const getCharById = require("../controllers/getCharById");
const login = require("../controllers/login");
const { getFav, postFav, deleteFav } = require("../controllers/handleFavorites");
const getSearchResult = require("../controllers/getSearchResult");
const register = require("../controllers/register");

router.get("/character/:id", getCharById);
router.post("/register", register)
router.get("/login", login);
router.get("/fav", getFav);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);
router.get("/search", getSearchResult)

module.exports = router;