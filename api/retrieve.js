const router=require("express").Router();
const {fileReport,sendReport,verifyReport,invalidReport,getMessage}=require("../controller/report_routes");
const upload=require("../config/upload");


//Get  message page.
router.get("/file/:id",fileReport);

//post a message.
router.post("/file/:id",upload.single('image'),sendReport);

//Verify report
router.post("/:message_id/verify",verifyReport);

//invalid report
router.post("/:message_id/invalid",invalidReport);

//get a message
router.get("/:message_id",getMessage);


module.exports=router;
