module.exports = (sequelize, Sequelize) => {
  const KPI = sequelize.define("kpi", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
      type: Sequelize.ENUM('environmental', 'social', 'governance', 'economic'),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    value: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    target: {
      type: Sequelize.FLOAT
    },
    unit: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    period: {
      type: Sequelize.ENUM('daily', 'weekly', 'monthly', 'quarterly', 'yearly'),
      defaultValue: 'monthly'
    },
    trend: {
      type: Sequelize.ENUM('increasing', 'decreasing', 'stable'),
      defaultValue: 'stable'
    },
    status: {
      type: Sequelize.ENUM('on_track', 'at_risk', 'off_track'),
      defaultValue: 'on_track'
    },
    dataSource: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.TEXT
    }
  });

  return KPI;
};
