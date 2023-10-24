// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env;

console.log(JWT_SECRET);
const adminSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

// Hash the admin user's password before saving
adminSchema.pre('save', async function (next) {
  const admin = this;
  if (!admin.isModified('password')) return next();
  const hash = await bcrypt.hash(admin.password, 12);
  admin.password = hash;
  next();
});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: true }, JWT_SECRET);
  return token;
};

adminSchema.statics.findByCredentials = async function (username, password) {
  const admin = await this.findOne({ username });

  if (!admin) {
    throw new Error('Admin not found');
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  return admin;
};

module.exports = mongoose.model('userAdmin', adminSchema);
