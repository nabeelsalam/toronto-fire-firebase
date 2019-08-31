
'use strict';

const functions = require('firebase-functions');

const cors = require('cors')({
  origin: true,
});

const rp = require('request-promise');

exports.date = functions.https.onRequest((req, res) => {

  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }

  return cors(req, res, () => {

    // Fetching Fire Incidents data from Toronto Open API
    let options = {
      method: "GET",
      json: true,
      uri: "http://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=64a26694-01dc-4ec3-aa87-ad8509604f50"
    };

    rp(options)
      .then(fireData => {
        var resource = fireData.result.resources[0];
        let url = `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${
        resource.id
        }`;
        let options = {
          method: "GET",
          json: true,
          uri: url
        };
        return rp(options);
      })
      .then(response => {
        console.log(response.result.records);
        return res.status(200).send(response.result.records);
      })
      .catch(err => {
        console.log("failure", err);
        return res.status(500).send(err);
      });

  });
});