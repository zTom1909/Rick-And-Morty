const express = require("express");
const router = express.Router();

const getCharById = require("../controllers/getCharById");
const getSearchResult = require("../controllers/getSearchResult");
const getUser = require("../controllers/getUser")
const register = require("../controllers/register");
const login = require("../controllers/login");
const updateLang = require("../controllers/updateLang");
const {
  getFav,
  postFav,
  deleteFav,
} = require("../controllers/handleFavorites");

router.get("/character/:id", getCharById);
router.get("/search", getSearchResult);
router.get("/user", getUser)
router.post("/register", register);
router.get("/login", login);
router.put("/lang", updateLang);
router.get("/fav", getFav);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFav);

module.exports = router;
