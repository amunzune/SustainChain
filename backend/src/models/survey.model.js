module.exports = (sequelize, Sequelize) => {
  const Survey = sequelize.define("survey", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.ENUM('draft', 'active', 'closed'),
      defaultValue: 'draft'
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
    },
    targetAudience: {
      type: Sequelize.ENUM('all_suppliers', 'high_risk_suppliers', 'specific_suppliers'),
      defaultValue: 'all_suppliers'
    },
    responseRate: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0
    },
    isRequired: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    reminderFrequency: {
      type: Sequelize.ENUM('none', 'weekly', 'biweekly', 'monthly'),
      defaultValue: 'none'
    },
    notes: {
      type: Sequelize.TEXT
    }
  });

  return Survey;
};
