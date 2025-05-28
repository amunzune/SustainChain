const db = require('../models');
const User = db.user;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users."
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).send({
        message: `User with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving user."
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Update password if provided
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    
    const num = await User.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "User was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update User with id=${req.params.id}. Maybe User was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating user."
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const num = await User.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "User was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete User with id=${req.params.id}. Maybe User was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete user."
    });
  }
};
