const express = require('express');
const router = express.Router();
const fs = require('fs');
const Questionnaire = require('../models/Questionnaire');

getAnswer = function(body, questionId) {
  switch (questionId) {
    case 'name':
      return body.name;
    case 'quest':
      return body.quest;
    case 'col':
        return body.col;
    case 'velo':
      return parseInt(body.velo) || 0;
    case 'lord':
      return body.lord;
    case 'langs':
      return body.langs;
    default:
      return ''
  }
}

redirectToQuestionnaire = function(key, message, req, res) {
  req.flash(key, message);
  res.redirect('/questionnaire')
}

// Questionnaire Page
router.get('/', (req, res) => {
  // Read questionnaire from json file
  var obj = JSON.parse(fs.readFileSync('questionnaire.json'));

  // Return questionnaire page with questionnaire data
  res.render('questionnaire', obj)
});

router.post('/', (req, res, next) => {
  // Read questionnaire from json file
  var questionnaire = JSON.parse(fs.readFileSync('questionnaire.json'));

  // Parse question from request
  const questions = questionnaire.questions.map(question => 
    ({
      id: question.id,
      text: question.text,
      type: question.type,
      answer: getAnswer(req.body, question.id)
    })
  )

  // Instantiate new Questionnaire
  const newQuestionnaire = new Questionnaire({
    name: questionnaire.name,
    questions: questions
  });

  // Save Questionnaire to the database
  newQuestionnaire
  .save()
  .then(_ => {
    redirectToQuestionnaire('success_msg', 'Your answers have been successfully saved!', req, res)
  })
  .catch(err => {
    console.log(err)
    redirectToQuestionnaire('error_msg', 'Error! Your answers are not saved!', req, res)
  });
});

module.exports = router;
