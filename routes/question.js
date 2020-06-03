const express = require('express');
const Questionnaire = require('../models/Questionnaire');
const { parse } = require('json2csv');

const router = express.Router();

// Questionnaire Download Page
router.get("/", async function (req, res) {
	Questionnaire.find({}, (err, questionnaires) => {
	  if (err) throw err;
  
	  const questions = [];
	  questionnaires.forEach(questionnaire => {
		  questionnaire.questions.forEach(question => {
			questions.push({
				  questionnaireId: questionnaire._id,
				  name: questionnaire.name,
				  questionId: question.id,
				  text: question.text,
				  type: question.type,
				  answer: question.answer
			  })
		  });
	  });
  
	  const fields = ['questionnaireId','name','questionId', 'text', 'type', 'answer'];
	  const questionsCsvString = parse(questions, { fields });
	  res.setHeader('Content-disposition', 'attachment; filename=questions.csv');
	  res.set('Content-Type', 'text/csv');
	  res.status(200).send(questionsCsvString);
	});
  });

  module.exports = router;