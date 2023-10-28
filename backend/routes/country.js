const CountryController = require("../controllers/CountryController");
const router = require("express").Router();
const Authenticate = require("../middleware/Authenticate");

router.get("/:countryName", Authenticate.isLoggedIn, CountryController.getCountryByName);
router.get("/", Authenticate.isLoggedIn, CountryController.getAllCountryNames);

module.exports = router;
