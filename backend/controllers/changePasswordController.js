const User = require("../model/userSchema");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let changePasswordController = async (req, res) => {
  let { token, password } = req.body;
  console.log(token, password);

  bcrypt.hash(password, 10, async function (err, hash) {
    // Store hash in your password DB.
    jwt.verify(token, "123234", async function (err, decoded) {
      // console.log(decoded.email); // bar

      let existingUser2 = await User.updateOne(
        { email: decoded.email },
        {
          $set: {
            password: hash,
            token: "",
          },
        },
        {
          //options
          returnNewDocument: true,
          new: true,
          strict: false,
        }
      );
    });
  });

  // let data = await User.find({ email: email });
  //   if (data[0].otp == otp) {
  //     await User.findOneAndUpdate({ email: email }, { otp: "", verify: true });
  //     res.send({ success: "Verify" });
  //   } else {
  //     res.send("otp did't match,try again.....");
  //   }
};

module.exports = changePasswordController;
//===========================================================
//===============HOME WORK: have to match token =============
//===========================================================
