const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env;

const Admin = require('../models/Admin');

async function authenticateAdmin(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Not an admin.' });
    }

    // Find the admin using the decoded token
    const admin = await Admin.findById(decoded._id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Attach the admin to the request object for use in controllers
    req.admin = admin;

    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
}

module.exports = authenticateAdmin;