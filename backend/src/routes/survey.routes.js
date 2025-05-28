const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, isAnalyst, isSupplier } = require('../middleware/authJwt');
const surveyController = require('../controllers/survey.controller');

// Protected routes
router.get('/', [verifyToken], surveyController.getAllSurveys);
router.get('/:id', [verifyToken], surveyController.getSurveyById);
router.post('/', [verifyToken, isAnalyst], surveyController.createSurvey);
router.put('/:id', [verifyToken, isAnalyst], surveyController.updateSurvey);
router.delete('/:id', [verifyToken, isAdmin], surveyController.deleteSurvey);
router.get('/organization/:organizationId', [verifyToken], surveyController.getSurveysByOrganization);
router.post('/:surveyId/questions', [verifyToken, isAnalyst], surveyController.addQuestionToSurvey);
router.get('/:surveyId/questions', [verifyToken], surveyController.getQuestionsBySurvey);
router.post('/responses', [verifyToken], surveyController.submitSurveyResponse);
router.get('/:surveyId/responses', [verifyToken, isAnalyst], surveyController.getSurveyResponses);

module.exports = router;
