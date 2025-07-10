const UserModel = require("../models/UserModel");

// Register User
const registerUser = async ({ email, password, firstName, lastName } = {}) => {
  const data = await UserModel.findOne({ where: { email } });

  if (data) {
    return { exists: true, email: data.email };
  } else {
    const account = await UserModel.create({ email, password, firstName, lastName });
    return { created: true, firstName: account.firstName };
  }
};

// Login User
const loginUser = async ({ email, password } = {}) => {
  return await UserModel.findOne({
    where: { email, password }
  });
};

// Create user
const insertUser = async ({ email, password, firstName, lastName } = {}) => {
  const data = await UserModel.create({ email, password, firstName, lastName });
  return data;
};

// Get all users
const getUsers = async () => {
  return await UserModel.findAll();
};

// Get user by Id
const getUser = async ({ id } = {}) => {
  return await UserModel.findByPk(id);
};

// Update user
const updateUser = async ({ id, email, firstName, lastName } = {}) => {
  return await UserModel.update(
    { email, firstName, lastName },
    { where: { userId: id } }
  );
};

// Delete user
const deleteUser = async ({ id } = {}) => {
  return await UserModel.destroy({ where: { userId: id } });
};

module.exports = {
  registerUser,
  loginUser,
  insertUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
