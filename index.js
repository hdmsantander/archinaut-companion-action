const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const csvToJson = require('convert-csv-to-json');
const aws = require('aws-sdk/clients/lambda');


try {

  // Our github context
  const payload = github.context.payload;

  const input = core.getInput('results');

  const commitId = payload.commits[0].id
  const date = payload.commits[0].timestamp;
  const repoFullName = payload.repository.full_name;

  const archinautResults = csvToJson.getJsonFromCsv(input);

  console.log(`Commit id: ${commitId} date: ${date} repository name: ${repoFullName}`);
  console.log("Results: " + JSON.stringify(archinautResults));

} catch (error) {
  core.setFailed(error.message);
}