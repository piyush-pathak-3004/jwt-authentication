const User = require('../Models/UserSchema');

exports.create = (user) => {
  const newUser = new User(user);
  newUser.save();
};
exports.createMany = (users) => User.insertMany(users);
exports.getUserById = (userId) => User.findById(userId);
exports.getAllusers = () => User.find();
exports.deleteUser = (userId) => User.findByIdAndDelete(userId);
exports.updateUser = (userId, newData) => User.findByIdAndUpdate(userId, newData, { new: true });
exports.authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }
  if (user.isValidPassword(password)) {
    return user;
  }
  throw new Error('Incorrect password');
};
