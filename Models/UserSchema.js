const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fname: String,
  lname: String,
  avatar: String,
  bio: String,
}, { collection: 'users' });
userSchema.pre(
  'save',
  async function hashPassword(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  },
);

userSchema.methods.isValidPassword = async (password) => {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
