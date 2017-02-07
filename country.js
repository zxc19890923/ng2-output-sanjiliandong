var express = require("express");
var router = express.Router();
var connecion = require("../conf/db");

router.get("/", function (req, res, next) {
    var CityID = req.query.CityID;
    connecion("select * from country where CityID = '" + CityID + "'", function (err, rows, fields) {
        console.log(rows);
        res.jsonp(rows);
    })
});

module.exports = router;