const router=require("express").Router();
const bodyParser=require("body-parser");
const passport=require("passport");
const {getRegister,getLogin,postRegister,postLogin}=require("../controller/user_routes");


router.use(bodyParser.urlencoded({extended:true}));

router.get("/login",getLogin);
router.get("/register",getRegister);

router.post("/login",postLogin);
router.post("/register",postRegister);



module.exports=router;