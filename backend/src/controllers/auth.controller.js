const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config/auth.config');

const User = db.user;

exports.signup = async (req, res) => {
  try {
    // Create user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      organizationId: req.body.organizationId
    });

    res.status(200).send({
      message: "User registered successfully!"
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the user."
    });
  }
};

exports.signin = async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Verify password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.expiresIn
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred during authentication."
    });
  }
};
