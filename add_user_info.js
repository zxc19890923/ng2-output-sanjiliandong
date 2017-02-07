var express = require("express");
var router = express.Router();
// 数据库
var connection = require("../conf/db");
router.get("/", function (req, res, next) {
    var username = req.query.username;
    var sex = req.query.sex;
    var age = req.query.age;
    var address = req.query.address;
    var position = req.query.position;
    var hobby = req.query.hobby;
    var remark = req.query.remark;
    var province = req.query.province;
    var city = req.query.city;
    var country = req.query.country;

    connection("update users set province='" + province + "', city='" + city + "', country='" + country + "', sex='" + sex + "', age='" + age + "', address='" + address + "', position='" + position + "', hobby='" + hobby + "', remark='" + remark + "'  where username='" + username + "'", function (err, rows, field) {
        console.log(rows);
        res.jsonp(rows);
    })

});
module.exports = router;