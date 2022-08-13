const router=require("express").Router();
const {getCurrentSession,preferences,getPreferencePage,itemFound,updateSessionStatus}=require("../controller/session_routes");

router.get("/:message_id/:item_id",getCurrentSession);

router.get("/:message_id/:item_id/preference",getPreferencePage);

router.post("/:message_id/:item_id/found",itemFound);

router.post("/:message_id/:item_id/not_item",updateSessionStatus);

router.post("/:message_id/:item_id/preference",preferences);

module.exports=router;