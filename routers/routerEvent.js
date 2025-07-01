const express = require("express");
const router = express.Router();
const Account = require("../module/Account");
const Event = require("../module/Event");
const {checklogin} = require('../helper/helper');
const {scheduleEvent} = require('./Scheduler'); 



async function createEvent(id,username,name, deadline, describe, option){
  var newEvent = new Event({
    userId: id,
    name: name,
    deadline: deadline,
    describe: describe,
    option: option,
  });
  await newEvent.save();
  await Account.updateOne(
    { username: username },
    { $inc: { totalEvent: 1 } }
  );
  scheduleEvent(newEvent,id);
}
async function updateEvent(id,name, deadline, describe,option,creatAt) {
  // Cập nhật sự kiện
  await Event.updateOne(
    { userId: id, creatAt: creatAt },
    {
      $set: {
        name: name,
        deadline: deadline,
        describe: describe,
        option: option,
      },
    }
  );
}

//new event
router.post("/addEvent/",checklogin , async (req, res) => {
  const decode = req.decode; // id,
  const { name, deadline, describe, option } = req.body;
  try {
    createEvent(decode.id,decode.username,name, deadline, describe, option);
    return res.status(200).json({ message: "add new event successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "add new event failed" });
  }
});
//update
router.post("/updateEvent",checklogin, async (req, res) => {
  const decode = req.decode; // id,
  const { name, deadline, describe, option,creatAt } = req.body;
  try {
    updateEvent(decode.id,name, deadline, describe, option,creatAt);
    return res.status(200).json({ message: "update event successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "update event failed" });
  }
});
//getEven
router.get("/getEvent", checklogin,async (req, res) => {
  const decode = req.decode; // id,
  try {
    const events = await Event.find({ userId: decode.id }).sort({ deadline: 1 }); // tăng dần
    return res
      .status(200)
      .json({ message: "get event successfully", events: events });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "get event failed" });
  }
});
// delete event
router.delete("/deleteEvent",checklogin, async (req, res) => {
  const decode = req.decode; // id,
  const { creatAt,name } = req.body;
  try {
    await Event.deleteOne({
      userId: decode.id,
      creatAt: creatAt,
      name:name
    });
    await Account.updateOne({username:decode.username},{$inc:{totalEvent:-1}});
    return res.status(200).json({ message: "delete event successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "delete event failed" });
  }
});

// delete all event
router.delete("/deleteAllEvent",checklogin,async (req, res) => {
  const decode = req.decode; // id,
  try {
    await Event.deleteMany({ userId: decode.id });
    await Account.updateOne({id:decode.id},{$set:{totalEvent:0}});
    return res.status(200).json({ message: "delete all event successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "delete all event failed" });
  }
});


module.exports = router;
