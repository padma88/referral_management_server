const bcrypt = require("bcrypt");
const SALTROUNDS = 2;
const hash = (value) => {
  return bcrypt.hashSync(value, SALTROUNDS);
};
const decrrypt = (value) => {

}
module.exports = {
  hash,
};
