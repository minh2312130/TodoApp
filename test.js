let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hoangminh.truong1805@gmail.com',
    pass: 'qqin hnmg rqwp jmud'
  }
});

let mailOptions = {
  from: 'hoangminh.truong1805@gmail.com',
  to: '2021agl11.truonghoangminh@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});