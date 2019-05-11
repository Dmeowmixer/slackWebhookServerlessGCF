const functions = require('firebase-functions');
const webhookURL = "https://hooks.slack.com/services/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";
const admin = require('firebase-admin');
const request = require('request-promise');

admin.initializeApp();

exports.lincoln = functions.database.ref('lincoln').onWrite((change, context) => {
  const afterData = change.after.val();

  const anonDonations = 


  console.log(afterData)
  var options = {
    url: "https://hooks.slack.com/services/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",
    method: "POST",
    body: {
      "text": "Total Number of Uploads: " + Object.keys(afterData).length,
      "text": "Hello world?"
    },
    json: true // Automatically stringifies the body to JSON
  };
  return request(options)
});

// webhook todo
 // Total number of records uploaded
 // Total value of newly uploaded donations
 // Percentage of Anonymous donations