const router = require("express").Router();
const {productCreate,productGet} = require("../controler/product");

router.post('/create',productCreate);
router.get('/get',productGet);

module.exports = router;