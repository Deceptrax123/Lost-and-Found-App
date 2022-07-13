const User=require("../models/users");
const router=require("express").Router();
const passport=require("passport");
const bodyParser=require("body-parser");
const upload=require("../config/upload");
const {profile,getItems,getItemPage,postItems,deleteItem}=require("../controller/dashboard_routes");



router.use(bodyParser.urlencoded({ extended:false}));
router.use(bodyParser.json());

//Get details of user.
router.get("/profile",profile);

//Get dashboard for list of all lost items.
router.get("/",getItems);

//Get lost item page.
router.get("/lost",getItemPage);

//Post lost item data.
router.post("/lost",upload.single('image'),postItems);

//Delete lost item once claimed.
router.post("/profile",deleteItem)

module.exports=router;