
  let nodemailer = require('nodemailer');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AdminEmail,
      pass: process.env.AdminEmailPass
    }
  });



  function SendMail(event,email){
      let mailOptions = {
          from: process.env.AdminEmail,
          to: email,
          subject: event.name,
          text: event.describe + "\n"
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
  }


  module.exports = {SendMail};
