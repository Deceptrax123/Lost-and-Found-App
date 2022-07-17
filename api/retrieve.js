const router=require("express").Router();
const {fileReport,sendReport,verifyReport,invalidReport,deleteReport}=require("../controller/report_routes");
const upload=require("../config/upload");

//Get  message page.
router.get("/:id",fileReport);

//post a message.
router.post("/:id",upload.single('image'),sendReport);

//Verify report
router.post("/inbox/verify",verifyReport);

//invalid report
router.post("/inbox/invalid",invalidReport);

//delete Report
router.post("/inbox/delete",deleteReport);

module.exports=router;
