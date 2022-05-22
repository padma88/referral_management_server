const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// register new user
exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).json({
      message: "User added Successfully",
      statusCode: 200,
    });
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};

// user by email
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(200).json({
        message: "Valid User",
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        message: "In Valid User",
        statusCode: 400,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};
