const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const csv = require("csvtojson"); 
const aws = require('aws-sdk/clients/lambda');
const { parse } = require('path');


try {

  // Our github context
  const payload = github.context.payload;

  const input = core.getInput('results');

  const commitId = payload.commits[0].id
  const date = payload.commits[0].timestamp;
  const repoFullName = payload.repository.full_name;

  csv().fromFile(input).then((parseResult) => {

    let output = {};

    output.commitId = commitId;
    output.date = date;
    output.repoFullName = repoFullName;
    output.files = parseResult;

    console.log("Results: " + JSON.stringify(output));

  })

} catch (error) {
  core.setFailed(error.message);
}