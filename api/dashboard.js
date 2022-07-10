const User=require("../models/users");
const router=require("express").Router();
const passport=require("passport");
const bodyParser=require("body-parser");

const {getContactInfo,getItems,getItemPage,postItems}=require("../controller/dashboard_routes");

router.use(bodyParser.urlencoded({ extended:true}));


//Get contact details of users.
router.get("/contact/:name",getContactInfo);

//Get dashboard for list of all lost items.
router.get("/",getItems);

//Get lost item page.
router.get("/lost",getItemPage);

//Post lost item data.
router.post("/lost",postItems);

//Get all details of requested lost item
router.get("/details/:id");


module.exports=router;