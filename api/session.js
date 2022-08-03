const router=require("express").Router();
const {getCurrentSession,preferences,getPreferencePage}=require("../controller/session_routes");

router.get("/:message_id/:item_id",getCurrentSession);

router.get("/:message_id/:item_id/preference",getPreferencePage);

router.post("/:message_id/:item_id/preference",preferences);

module.exports=router;