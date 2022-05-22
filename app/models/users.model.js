module.exports = (sequalize, Sequelize) => {
    const Users = sequalize.define("users",  {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM("ADMIN", "SUPERADMIN", "PATIENT", "PROVIDER")
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