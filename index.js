const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise');

admin.initializeApp();

exports.lincoln = functions.database.ref('lincoln').onWrite((change, context) => {
  let beforeData = change.before.val();
  let afterData = change.after.val();

  let beforeDataLength = Object.keys(beforeData).length;
  let afterDataLength = Object.keys(afterData).length;
  let newDonations = afterDataLength - beforeDataLength;
  console.log(beforeDataLength, afterDataLength);
  let anonDonorsCount = 0;

  let anonDonors = afterData.forEach(x => {
    if(x.donor_name === ""){
      anonDonorsCount++;
    }
  })

  let percentage = anonDonorsCount / Object.keys(afterData).length;
  let percentageValue = percentage.toFixed(2) * 100

  var options = {
    url: "https://hooks.slack.com/services/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",
    method: "POST",
    body: {
      text: "A file was successfully uploaded",
      "attachments": [
        {
          name: "Number of new donations",
          text: "Number of new donations: " + newDonations
        },{
          name: "Total number of donations",
          text: "Total number of donations: " + Object.keys(afterData).length
        },{
          name: "Percentage of anon donations",
          text: "Percentage of anonymous donations: " + Math.floor(percentageValue) + "%"
        }
      ]
    },
    json: true // Automatically stringifies the body to JSON
  };
  return request(options);
});

// webhook todo
 // Total number of records uploaded
 // Total value of newly uploaded donations
 // Percentage of Anonymous donations