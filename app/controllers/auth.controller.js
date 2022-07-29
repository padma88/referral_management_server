const db = require("../models");
const User = db.users;
const Admin = db.admin;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// authentication
exports.login = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: {
          email: req.body.user_name,
          user_name: req.body.user_name,
        },
      },
    });
    if (!user) {
      user = await Admin.findOne({
        where: {
          [Op.or]: {
            email: req.body.user_name,
            user_name: req.body.user_name,
          },
        },
      });
    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      let code = jwt.sign(
        { id: user.id, email: user.email },
        "this is the secret key to encoded with",
        { expiresIn: "7d" }
      );
      res.status(200).json({
        message: "Valid User",
        statusCode: 200,
        access_token: code,
      });
    } else {
      return res.status(400).json({
        message: "In Valid User",
        statusCode: 400,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};
