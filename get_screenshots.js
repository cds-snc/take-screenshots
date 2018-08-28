var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY_2}).base('appMmtGZZe1kN10Uy');
const Pageres = require('pageres');
const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const read_and_upload = (fname) => {
  fs.readFile(fname, function (err, buffer) {
    if (err) throw err;
    uploadFile(buffer, fname)
  });
}

const uploadFile = (buffer, key) => {
  const params = {
    Bucket: "vac-screenshots",
    ACL: "private",
    Body: buffer,
    Key: key,
    ContentType: "image/png"
  };
  s3.putObject(params, function(err) {
      if (err) {
          console.log(err)
      } else {
          console.log("Successfully uploaded data to vac-screenshots/" + key);
   }
 });
}

const url2Fname = url => url.replace(/\//g, "-")
  .replace("?", "-")
  .replace("=", "-")
  .replace(":", "-");

const snapshot = (url) => {
  fname = url2Fname(url)
  new Pageres({delay: 2, filename: fname})
    .src(url, ['1024x768'])
    .dest(__dirname + "/img")
    .run()
    .then(() => {
      console.log("took snapshot of", url)
      read_and_upload(__dirname + "/img/" + fname + ".png")
    });
}


base('urls').select({
    maxRecords: 100,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function(record) {
      const url = record.get('url')
        console.log('Airtable:', url);
        snapshot(url)
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
