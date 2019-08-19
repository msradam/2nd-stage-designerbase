const express = require('express');
const router = express.Router();

const gSheet = require('google-spreadsheet');
var creds = require('../../designerbase_secret.json');

var doc = new gSheet('1eJ33RnNv26R9hP5Cv0VwguMaQ9rTvF47H19bWO9WWEs');

router.get('/', async (req, res) => {
  try {
    doc.useServiceAccountAuth(creds, function(err) {
      // Retrieve Google Spreadsheet rows response
      //
      doc.getRows(1, function(err, rows) {
        designers = rows.map(designer => ({
          first_name: designer.firstname,
          last_name: designer.lastname,
          email: designer.email,
          class_year: designer.classyear,
          design_positions: designer.design_positions,
          specialized_positions: designer.specializedpositions,
          opentoassistantco: designer.opentoassistantco,
          relevant_experience: designer.relevantexperience,
          additional_info: designer.additional_info
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
    // doc.useServiceAccountAuth(creds, function(err) {
    //   doc.addRow(1, req.body, function(err) {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    // });
    const answers = req.body.form_response.answers;
    designer_form = {
      first_name: answers[0].text,
      last_name: answers[1].text,
      email: answers[2].text,
      class_year: answers[3].text,
      design_positions: answers[4].text,
      specialized_positions: answers[5].text,
      opentoassistantco: answers[6].text,
      relevant_experience: answers[7].text,
      additional_info: answers[8].text
    };

    console.log(req.body.form_response.answers);
    res.status(200).send(designer_form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
