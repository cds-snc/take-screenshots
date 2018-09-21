var readKey = process.env.VAC_CDS_SNC_KEY;
require("isomorphic-fetch");
var airtableConstants = require("./airtable_constants");

var fetchTableFromAirtable = async function fetchTableFromAirtable(table) {
  var offset = undefined;
  var jsonRecords = [];
  do {
    var url =
      "https://api.airtable.com/v0/app5B7wVD0mviQcc0/" +
      table +
      "?view=Grid%20view";
    if (offset) {
      url = url + "&offset=" + offset;
    }
    var resp = await fetch(url, {
      headers: {
        Authorization: "Bearer " + readKey
      }
    });
    var json = await resp.json();
    jsonRecords = jsonRecords.concat(json.records);
    offset = json.offset;
  } while (offset);

  try {
    return jsonRecords.map(function(item) {
      return item.fields;
    });
  } catch (e) {
    console.log(`Error in downloading table ${table}:`, e);
    exit(1);
  }
};

var hydrateFromAirtable = (exports.hydrateFromAirtable = async function hydrateFromAirtable() {
  let dataStore = {};
  airtableConstants.tableNames.forEach(function(tableName) {
    dataStore[tableName] = [];
  });

  let promises = airtableConstants.tableNames.map(async function(tableName) {
    dataStore[tableName] = await fetchTableFromAirtable(tableName);
  });
  await Promise.all(promises);

  dataStore["templateList"] = dataStore["Template List"]
    .map(row => row.Name)
    .filter(s => s !== undefined);

  promises = dataStore.templateList.map(async function(templateName) {
    dataStore[templateName] = await fetchTableFromAirtable(templateName);
  });
  await Promise.all(promises);

  dataStore["errors"] = [];

  dataStore.timestamp = await Date.now();
  return dataStore;
});
