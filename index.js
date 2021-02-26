const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const csv = require("csvtojson"); 
const aws = require('aws-sdk/clients/lambda');


try {

  // Our github context
  const payload = github.context.payload;

  const input = core.getInput('results');

  const commitId = payload.commits[0].id
  const date = payload.commits[0].timestamp;
  const repoFullName = payload.repository.full_name;

  csv().fromFile(input).then((parseResult) => {
    console.log("Results: " + JSON.stringify(parseResult));
  })
  
  console.log(`Commit id: ${commitId} date: ${date} repository name: ${repoFullName}`);

} catch (error) {
  core.setFailed(error.message);
}