const db = require('../models');
const Survey = db.survey;
const Question = db.question;
const Response = db.response;
const Supplier = db.supplier;

exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      include: [{
        model: Question,
        attributes: ['id', 'text', 'type', 'required']
      }]
    });
    res.status(200).send(surveys);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving surveys."
    });
  }
};

exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id, {
      include: [{
        model: Question,
        attributes: ['id', 'text', 'type', 'options', 'required', 'order', 'helpText']
      }]
    });
    
    if (!survey) {
      return res.status(404).send({
        message: `Survey with id ${req.params.id} not found.`
      });
    }
    
    res.status(200).send(survey);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving survey."
    });
  }
};

exports.createSurvey = async (req, res) => {
  try {
    const survey = await Survey.create(req.body);
    res.status(201).send(survey);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the survey."
    });
  }
};

exports.updateSurvey = async (req, res) => {
  try {
    const num = await Survey.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Survey was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Survey with id=${req.params.id}. Maybe Survey was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating survey."
    });
  }
};

exports.deleteSurvey = async (req, res) => {
  try {
    const num = await Survey.destroy({
      where: { id: req.params.id }
    });
    
    if (num == 1) {
      res.status(200).send({
        message: "Survey was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Survey with id=${req.params.id}. Maybe Survey was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete survey."
    });
  }
};

exports.getSurveysByOrganization = async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      where: { organizationId: req.params.organizationId }
    });
    res.status(200).send(surveys);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving surveys for organization."
    });
  }
};

exports.addQuestionToSurvey = async (req, res) => {
  try {
    const question = await Question.create({
      ...req.body,
      surveyId: req.params.surveyId
    });
    res.status(201).send(question);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error adding question to survey."
    });
  }
};

exports.getQuestionsBySurvey = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { surveyId: req.params.surveyId },
      order: [['order', 'ASC']]
    });
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving questions for survey."
    });
  }
};

exports.submitSurveyResponse = async (req, res) => {
  try {
    const { surveyId, supplierId, responses } = req.body;
    
    // Validate survey exists
    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      return res.status(404).send({
        message: `Survey with id ${surveyId} not found.`
      });
    }
    
    // Validate supplier exists
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return res.status(404).send({
        message: `Supplier with id ${supplierId} not found.`
      });
    }
    
    // Create responses
    const createdResponses = [];
    for (const response of responses) {
      const createdResponse = await Response.create({
        questionId: response.questionId,
        supplierId,
        value: response.value,
        fileUrl: response.fileUrl,
        status: 'submitted'
      });
      createdResponses.push(createdResponse);
    }
    
    // Update survey response rate
    const totalSuppliers = await Supplier.count({
      where: { organizationId: survey.organizationId }
    });
    
    const respondedSuppliers = await Response.count({
      distinct: true,
      col: 'supplierId',
      include: [{
        model: Question,
        where: { surveyId }
      }]
    });
    
    const responseRate = totalSuppliers > 0 ? respondedSuppliers / totalSuppliers : 0;
    
    await Survey.update({ responseRate }, {
      where: { id: surveyId }
    });
    
    res.status(201).send({
      message: "Survey responses submitted successfully.",
      responses: createdResponses
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error submitting survey responses."
    });
  }
};

exports.getSurveyResponses = async (req, res) => {
  try {
    const responses = await Response.findAll({
      include: [{
        model: Question,
        where: { surveyId: req.params.surveyId },
        attributes: ['id', 'text', 'type']
      }, {
        model: Supplier,
        attributes: ['id', 'name']
      }]
    });
    
    res.status(200).send(responses);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving survey responses."
    });
  }
};
