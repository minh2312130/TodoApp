let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AdminEmail,
    pass: process.env.AdminEmailPass,
  },
});

function SendMailEvent(event, email) {
  let mailOptions = {
    from: process.env.AdminEmail,
    to: email,
    subject: event.name,
    text: event.describe + "\n",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function SendMailCode(email,code) {
  let mailOptions = {
    from: process.env.AdminEmail,
    to: email,
    subject: "Mã xác nhận",
    text: "Mã xác nhận của bạn là: " + code + "\n"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { SendMailEvent,SendMailCode };
