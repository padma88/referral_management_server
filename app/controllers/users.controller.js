const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 2;

// authentication
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
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
      res.status(400).json({
        message: "In Valid User",
        statusCode: 400,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};

// register new user
exports.createUser = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      res.status(400).json({
        message: "User already exists",
        statua_code: 400
      });
    }
    await User.create({ ...req.body, password: hash });
    res.status(200).json({
      message: "User added Successfully",
      statusCode: 200,
    });
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
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
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
