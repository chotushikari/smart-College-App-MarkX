const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncementsForUser,
  editAnnouncement,
  togglePinAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcement.controller");



router.post("/create", createAnnouncement);
router.get("/all", getAnnouncementsForUser);
router.patch("/edit/:id", editAnnouncement);
router.patch("/pin/:id", togglePinAnnouncement);
router.delete("/delete/:id", deleteAnnouncement);


module.exports = router;
