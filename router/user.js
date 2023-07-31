const router = require("express").Router();

const {
    register,login,saveclick,deletesaveclick,editsaveclick,fetchsaveclick
} = require("../Controller/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/saveclick", saveclick);
router.patch("/editsaveclick/:click_id", editsaveclick);
router.delete("/delete/:id/:click_id", deletesaveclick);
router.get("/fetchsaveclick/:id", fetchsaveclick);


module.exports = router;
