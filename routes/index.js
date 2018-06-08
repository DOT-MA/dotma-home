let express = require("express");
let router = express.Router();

router.get("/", (req, res, next) =>
{
    res.render("index", {
        "title": "DOTMA"
    });
});

module.exports = router;