const db = require("../models");
const Admin = db.admin;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// register new user
exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        [Op.or]: {
            email: req.body.email,
            user_name: req.body.user_name
        }
      },
    });
    if (admin) {
      return res.status(400).json({
        message: "User already exists",
        statua_code: 400,
      });
    }
    await Admin.create({ ...req.body });
    res.status(200).json({
      message: "User added Successfully",
      statusCode: 200,
    });
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};

