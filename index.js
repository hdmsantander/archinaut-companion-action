const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');

try {

  // Our github context
  const payload = github.context.payload;

  console.log("Context: " + JSON.stringify(github.context));

  // Get commit id and timestamp
  const commitId = payload.commits[0].id
  const date = payload.commits[0].timestamp;

} catch (error) {
  core.setFailed(error.message);
}