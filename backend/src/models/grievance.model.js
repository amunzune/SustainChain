module.exports = (sequelize, Sequelize) => {
  const Grievance = sequelize.define("grievance", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    source: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.ENUM('deforestation', 'labor', 'land_rights', 'pollution', 'other'),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    location: {
      type: Sequelize.STRING
    },
    coordinates: {
      type: Sequelize.GEOMETRY('POINT'),
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('reported', 'under_investigation', 'resolved', 'dismissed'),
      defaultValue: 'reported'
    },
    severity: {
      type: Sequelize.ENUM('low', 'medium', 'high', 'critical'),
      defaultValue: 'medium'
    },
    resolutionNotes: {
      type: Sequelize.TEXT
    },
    resolutionDate: {
      type: Sequelize.DATE
    },
    attachments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    }
  });

  return Grievance;
};
