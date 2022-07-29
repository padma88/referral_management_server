const { hash } = require("../../utils/helper");
module.exports = (sequalize, Sequelize) => {
  const Admin = sequalize.define("admin", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      unique: true
    },
    mobile: {
      type: Sequelize.INTEGER,
      is: ["^[0-9]{10}$",'i']
    },
    password: {
      type: Sequelize.STRING,
      set(value) {
        console.log(value)
        console.log(hash(value))
        this.setDataValue("password", hash(value));
      },
    },
  });
  return Admin;
};
