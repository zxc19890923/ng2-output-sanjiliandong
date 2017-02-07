var express = require("express");
var router = express.Router();
var connection = require("../conf/db");

router.get("/", function (req, res, next) {
    var proId = req.query.ProID;
    connection("select * from city where ProID='" + proId + "'", function (err, rows, fields) {
        console.log(rows);
        res.jsonp(rows);
    })
});
module.exports = router;