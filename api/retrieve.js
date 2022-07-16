const router=require("express").Router();
const {fileReport,sendReport}=require("../controller/report_routes");
const upload=require("../config/upload");

//Get  message page.
router.get("/:id",fileReport);

//post a message.
router.post("/:id",upload.single('image'),sendReport);


module.exports=router;
