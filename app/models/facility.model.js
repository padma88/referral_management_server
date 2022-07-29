module.exports = (sequalize, Sequelize) => {
    const Facility = sequalize.define("facility", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        address_line_1: {
            type: Sequelize.STRING,
        },
        address_line_2: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        pin_code: {
            type: Sequelize.INTEGER,
            is: ["^[0-9]{6}$",'i']
        }
    });
    return Facility;
}