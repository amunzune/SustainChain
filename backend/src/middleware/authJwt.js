// Authentication middleware
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === 'admin') {
      next();
      return;
    }
    res.status(403).send({
      message: 'Require Admin Role!'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Unable to validate user role!'
    });
  }
};

isAnalyst = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === 'admin' || user.role === 'analyst') {
      next();
      return;
    }
    res.status(403).send({
      message: 'Require Analyst Role!'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Unable to validate user role!'
    });
  }
};

isSupplier = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === 'supplier') {
      next();
      return;
    }
    res.status(403).send({
      message: 'Require Supplier Role!'
    });
  } catch (error) {
    res.status(500).send({
      message: 'Unable to validate user role!'
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isAnalyst,
  isSupplier
};

module.exports = authJwt;
