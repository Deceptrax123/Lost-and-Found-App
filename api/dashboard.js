const User=require("../models/users");
const router=require("express").Router();
const passport=require("passport");
const bodyParser=require("body-parser");
const upload=require("../config/upload");
const {profile,getItems,getItemPage,postItems,deleteItem,search,getFoundDetails}=require("../controller/dashboard_routes");



router.use(bodyParser.urlencoded({ extended:false}));
router.use(bodyParser.json());

//Get details of user.
router.get("/profile",profile);

//Get dashboard for list of all lost items.
router.get("/",getItems);

//Get report lost item form.
router.get("/lost",getItemPage);

//Get all item details.
router.get("/item/:id",getFoundDetails);

//Search by fields.
router.post("/",search)

//Post lost item data.
router.post("/lost",upload.single('image'),postItems);

//Delete lost item once claimed.
router.post("/profile",deleteItem)

module.exports=router;