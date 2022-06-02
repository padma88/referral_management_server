const { USER_ROLES, ADMIN_ROLES } = require("../../utils/enum")
module.exports = (sequalize, Sequelize) => {
    const Users = sequalize.define("users",  {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM(...USER_ROLES, ...ADMIN_ROLES),
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return Users;
}