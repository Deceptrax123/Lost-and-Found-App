const router=require("express").Router();
const {fileReport,ongoingSession,sendReport,verifyReport,invalidReport,deleteReport,preferences,getMessage}=require("../controller/report_routes");
const upload=require("../config/upload");


//Get  message page.
router.get("/file/:id",fileReport);

//post a message.
router.post("/file/:id",upload.single('image'),sendReport);

//Verify report
router.post("/:message_id/verify",verifyReport);

//invalid report
router.post("/:message_id/invalid",invalidReport);

//delete Report
router.post("/:message_id/delete",deleteReport);

//get a message
router.get("/:message_id",getMessage);

//ongoing status lost item session
router.get("/:message_id/:item_id",ongoingSession);

module.exports=router;
