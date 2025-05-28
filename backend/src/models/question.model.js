module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("question", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM('text', 'number', 'boolean', 'multiple_choice', 'single_choice', 'date', 'file_upload'),
      allowNull: false,
      defaultValue: 'text'
    },
    options: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },
    required: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    order: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    helpText: {
      type: Sequelize.STRING
    },
    validation: {
      type: Sequelize.JSON,
      defaultValue: {}
    }
  });

  return Question;
};
