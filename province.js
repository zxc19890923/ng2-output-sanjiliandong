var express = require("express");
var router = express.Router();
var connection = require("../conf/db");

router.get("/", function (req, res, next) {
    connection("select * from province", function (err, rows, fields) {
        console.log(rows);
        res.jsonp(rows);
    })
});
module.exports = router;