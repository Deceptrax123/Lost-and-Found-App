const router=require("express").Router();
const {fileReport,sendReport}=require("../controller/report_routes");
const upload=require("../config/upload");


router.get("/:id",fileReport);

router.post("/:id",upload.single('image'),sendReport);


module.exports=router;
