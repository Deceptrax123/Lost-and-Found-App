const router=require("express").Router();
const {getCurrentSession,preferences}=require("../controller/session_routes");

router.get("/:message_id/:item_id",getCurrentSession);

module.exports=router;