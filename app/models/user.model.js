const { USER_ROLES, ADMIN_ROLES } = require("../../utils/enum");
const {hash} = require("../../utils/helper")
module.exports = (sequalize, Sequelize) => {
  const User = sequalize.define("users", {
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
    role: {
      type: Sequelize.ENUM(...USER_ROLES, ...ADMIN_ROLES),
    },
    user_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      set(value) {
        this.setDataValue("password", hash(value))
      } 
    }
  });
  return User;
};
