const admin = require("firebase-admin");

const serviceAccount = require("./stakezenc-firebase-adminsdk-u05n6-7ae55438fc.json"); // Replace with the path to your JSON key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://stakezenc.appspot.com",
});

module.exports = admin;
