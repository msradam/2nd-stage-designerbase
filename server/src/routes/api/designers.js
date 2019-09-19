const express = require('express');
const router = express.Router();

const gSheet = require('google-spreadsheet');
var creds = require('../../designerbase_secret.json');

// Initialize a new gSheet object with the ID of the Google Sheet
var doc = new gSheet('1eJ33RnNv26R9hP5Cv0VwguMaQ9rTvF47H19bWO9WWEs');

// @route    GET api/designers
// @desc     Retrieve a list of designers
// @access   Public

router.get('/', async (req, res) => {
  try {
    doc.useServiceAccountAuth(creds, function (err) {
      // Retrieve Google Spreadsheet rows response
      //
      doc.getRows(1, function (err, rows) {
        designers = rows.map(designer => ({
          
          first_name: designer['first-name'],
          last_name: designer['last-name'],
          email: designer['email'],
          class_year: designer['class-year'],
          design_positions: designer['design-positions'],
          specialized_positions: designer['specialized-positions'],
          opentoassistantco: designer['assistant-yes-no'],
          relevant_experience: designer['experience'],
          additional_info: designer['additionalinfo']
        }));

        console.log(rows[0]);
        res.json(designers);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/designers
// @desc     Retrieve Typeform response to register designer
// @access   Public

router.post('/', async (req, res) => {
  try {

    const answers = req.body.form_response.answers;
    const parse_answer = (ans_value) => {

      let ans_obj = {
        ref: ans_value.field.ref
      }

      if (ans_value.type === 'choices') {
        ans_obj.ans_response = ans_value.choices.labels
      }

      else {
        ans_obj.ans_response = ans_value[ans_value.type]
      }

      return ans_obj
    }
    parsed_answers = answers.map(parse_answer)
    // console.log(parsed_answers)
    designer_form_submission = {}
    parsed_answers.forEach(value =>
      designer_form_submission[value.ref] = value.ans_response
    )
    console.log(designer_form_submission)
    doc.useServiceAccountAuth(creds, function (err) {
      doc.addRow(1, designer_form_submission, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
    res.status(200).send('Success');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
