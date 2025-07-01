
const schedule = require("node-schedule");
const Event = require("../module/Event");
const Account = require("../module/Account");
const { SendMailEvent } = require("../Action/Sending");

function scheduleEvent(event, userId) {
  schedule.scheduleJob(new Date(event.deadline), () => {
    console.log(` Gửi nhắc nhở cho event: ${event.name} của ${userId}`);
    // Gửi email hoặc push notification ở đây
    var email;

    Account.findById(userId)
      .then((account) => {
        if (account) {
          console.log("Email của account:", account.email); // ✅ Lấy thuộc tính ở đây
          email = account.email;
          SendMailEvent(event, email);
        } else {
          console.log("Không tìm thấy account");
        }
      })
      .catch((err) => {
        console.error("Lỗi tìm account:", err);
      });

    
  });
}

async function restoreScheduledEvents() {
  const events = await Event.find({ deadline: { $gte: new Date() } });
  events.forEach(scheduleEvent);
  console.log(` Khôi phục ${events.length} event`);
}

module.exports = { restoreScheduledEvents, scheduleEvent };
