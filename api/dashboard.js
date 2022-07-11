const User=require("../models/users");
const router=require("express").Router();
const passport=require("passport");
const bodyParser=require("body-parser");

const {profile,getItems,getItemPage,postItems,deleteItem}=require("../controller/dashboard_routes");

router.use(bodyParser.urlencoded({ extended:true}));


//Get details of user.
router.get("/profile",profile);

//Get dashboard for list of all lost items.
router.get("/",getItems);

//Get lost item page.
router.get("/lost",getItemPage);

//Post lost item data.
router.post("/lost",postItems);

//Delete lost item once claimed.
router.post("/profile",deleteItem)

module.exports=router;