const db = require("../models");
const User = db.users;
const Admin = db.admin;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// register new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        statua_code: 400,
      });
    }
    await User.create({ ...req.body });
    res.status(200).json({
      message: "User added Successfully",
      statusCode: 200,
    });
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        statua_code: 400,
      });
    } else {
      await User.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.status(200).json({
        message: "User deleted Successfully",
        statusCode: 200,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};
// Get ALL users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      message: "Success",
      data: users,
      statusCode: 200,
    });
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};

// Find By Id
exports.getUser = async (req, res) => {
  try {
    let user = await User.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      user = await Admin.findOne({
        attributes: {
          exclude: ["password"],
        },
        where: {
          id: req.params.id,
        },
      });
    }
    if (user) {
      res.status(200).json({
        message: "Success",
        data: user,
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        message: "No user found",
        data: null,
        statusCode: 200,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};
