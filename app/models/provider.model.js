const { USER_ROLES, ADMIN_ROLES, PROVIDER_SPEC } = require("../../utils/enum");
const { hash } = require("../../utils/helper");
module.exports = (sequalize, DataType) => {
  const Provider = sequalize.define("providers", {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },
    firstName: {
      type: DataType.STRING,
    },
    lastName: {
      type: DataType.STRING,
    },
    role: {
      type: DataType.ENUM(...USER_ROLES, ...ADMIN_ROLES),
    },
    user_name: {
      type: DataType.STRING,
    },
    email: {
      type: DataType.STRING,
    },
    password: {
      type: DataType.STRING,
      set(value) {
        this.setDataValue(hash(value));
      },
    },
    specification: {
      type: DataType.ENUM(...PROVIDER_SPEC),
    },
  });
  return Provider;
};
