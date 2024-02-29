const User = require("../model/userSchema");
// const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");

let forgotpasswordController = async (req, res) => {
  let { email } = req.body;

  let existingUser = await User.find({ email: email });

  if (existingUser.length == 0) {
    res.send({ error: "Credential is not valid" });
  } else {
    jwt.sign({ email: email }, "123234", async function (err, token) {
      console.log(token);

      let existingUser2 = await User.updateOne(
        { email: email },
        {
          $set: {
            token: token,
          },
        },
        {
          //options
          returnNewDocument: true,
          new: true,
          strict: false,
        }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "mernmuhaimen2201@gmail.com",
          pass: "fbod vemt kkcd qaqa",
        },
      });

      await transporter.sendMail({
        from: process.env.BASE_EMAIL, // sender address
        to: existingUser[0].email, // list of receivers
        subject: "Change Password", // Subject line
        html: `<div>Please change your password by click on this button<a href='http://localhost:5173/changepassword/${token}'>Click here</a> </div>`, // html body
      });
      // console.log("existingUser2", existingUser2);
      // console.log("existingUser", existingUser);
    });

    // bcrypt.hash(email, 10, async function (err, hash) {
    //
    //   res.send({ success: "check your email" });
    // });
  }
};

module.exports = forgotpasswordController;
