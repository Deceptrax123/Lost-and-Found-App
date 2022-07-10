
const router=require('express').Router();
const chat=require("../controller/chat_routes");

//Start the chat server.
router.get("/:id",chat);

module.exports=router;