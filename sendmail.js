const express = require("express");
const bodyParser = require("body-parser");
const validateEmail = require("email-validator");
const app = express();
const PORT = 3000;
const nodemailer = require("nodemailer");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/sendmail", (req, res) => {
  var m1 = req.body.mail1;
  var m2 = req.body.mail2;
  var me = req.body.message;

  const correctemail = validateEmail.validate(m2);
  if (!correctemail) {
    console.log("Please Enter valid recipient email and try agian");
    res.sendFile(__dirname + "/public/error.html");
  } else {
    console.log("Email validation Successfully Complete");
    // Email work start here
    const EMAIL_ID = m1;
    const EMAIL_PASS = "awguxwmhkwqiovzn";
    // sender code
    const sender = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASS,
      },
    });

    // send Basic Mail function
    const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
      try {
        const response = await sender.sendMail({
          from: mailFrom,
          to: mailTo,
          subject: mailSubject,
          text: mailBody,
        });
        console.log("YOUR MAIL SEND SUCCESSFULLY");
      } catch (error) {
        console.log(error);
      }
    };

    // sendbasic mail function call
    sendBasicEmail(m1, m2, "RICK MAIL APP", me);

    // Final Response after sending mail
    res.send(
      `<h1>Hey <i><mark>${m1}</mark></i><br/>your mail successfully delivered to<br/><i><mark>${m2}</mark></i><br/>Thankyou to use &copy;RICK MAIL APP<br/>Bye! SEE YOU SOON!</h1>`
    );
  }
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server Running at ${PORT}`);
  } else {
    throw err;
  }
});
