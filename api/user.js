const bodyParser=require("body-parser");
const router=require("express").Router();
const passport=require("passport");
const {getRegister,getLogin,postRegister,postLogin}=require("../controller/user_routes");


router.use(bodyParser.urlencoded({extended:true}));

//Get the login page.
router.get("/login",getLogin);

//Get the register page.
router.get("/register",getRegister);

//Post login details.
router.post("/login",postLogin);

//Post register details.
router.post("/register",postRegister);



module.exports=router;