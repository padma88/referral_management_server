const db = require("../app/models");
const User = db.users;
const Admin = db.admin;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
module.exports = async function auth(req, res, next) {
  try {
    console.log("test")
    const decoded = jwt.verify(
      req.headers["access-token"],
      "this is the secret key to encoded with"
    );
    let user = await User.findOne({
      where: {
        [Op.and]: {
          id: decoded.id,
          email: decoded.email
        }
      },
    });
    if (!user) {
      user = await Admin.findOne({
        where: {
          [Op.and]: {
            id: decoded.id,
            email: decoded.email
          }
        },
      });
    }
    if (user) {
      next();
    } else {
      res.status(400).json({
        message: "User not found",
        data: null,
        statusCode: 200,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message, statusCode: 500 });
  }
};
