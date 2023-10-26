
const CountryController = require('../controllers/CountryController')
const router = require("express").Router();
const Authenticate = require('../middleware/Authenticate');

router.get("/name/:countryName", Authenticate.isLoggedIn, CountryController.getCountryByName);

module.exports = router;