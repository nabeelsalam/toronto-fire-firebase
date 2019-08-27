
'use strict';

const functions = require('firebase-functions');

const cors = require('cors')({
  origin: true,
});

exports.date = functions.https.onRequest((req, res) => {

  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }

  return cors(req, res, () => {
    const formattedDate = Date.now();
    console.log('Sending Formatted date:', formattedDate);
    res.status(200).send(formattedDate);
  });
});