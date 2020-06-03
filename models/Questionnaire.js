const mongoose = require('mongoose');

const QuestionnaireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  questions:[{
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    answer: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
  },
  ]
});

const Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);

module.exports = Questionnaire;
