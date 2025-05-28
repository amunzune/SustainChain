module.exports = (sequelize, Sequelize) => {
  const Response = sequelize.define("response", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    value: {
      type: Sequelize.TEXT
    },
    fileUrl: {
      type: Sequelize.STRING
    },
    submittedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    status: {
      type: Sequelize.ENUM('draft', 'submitted', 'approved', 'rejected'),
      defaultValue: 'submitted'
    },
    notes: {
      type: Sequelize.TEXT
    },
    reviewedBy: {
      type: Sequelize.UUID
    },
    reviewedAt: {
      type: Sequelize.DATE
    }
  });

  return Response;
};
