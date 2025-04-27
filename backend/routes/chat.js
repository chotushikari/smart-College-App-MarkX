const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");

router.post("/:classId/send", chatController.sendMessage);
router.get("/:classId", chatController.getChat);

module.exports = router;
