var Airtable = require("airtable");
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY_2}).base("appMmtGZZe1kN10Uy");
const Pageres = require("pageres");
const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const s3 = new AWS.S3();

const read_and_upload = (fname, key) => {
  fs.readFile(fname, function(err, buffer) {
    if (err) throw err;
    uploadFile(buffer, key);
  });
};

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
      console.log(err);
    } else {
      console.log("Successfully uploaded data to vac-screenshots/" + key);
    }
  });
};

const snapshot = (project, url, fileName, date) => {
  if (date === undefined) {
    const now = new Date();
    date = [
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    ].join("-");
  }
  const fname = fileName + "-" + date;
  const key = project + "/" + fileName + "/" + fname + ".png"
  new Pageres({
    delay: 2,
    filename: fname
  })
    .src(url, ["1024x768"])
    .dest(__dirname + "/img")
    .run()
    .then(() => {
      console.log("took snapshot of", url);
      console.log("saved locally:", "img/"+ fname + ".png");
      read_and_upload(__dirname + "/img/" + fname + ".png", key)
    });
};

/****** Main ******/

let date = undefined
if (process.argv.length === 3) {
  date = process.argv[2]
}

base("urls").select({
  maxRecords: 100,
  view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
  records.forEach(function(record) {
    const project = record.get("project")
    const url = record.get("url");
    const fileName = record.get("fileName")
    console.log("Airtable:", project, url, fileName);
    snapshot(project, url, fileName, date);
  });
  fetchNextPage();

}, function done(err) {
  if (err) {
    console.error(err);
  }
});
