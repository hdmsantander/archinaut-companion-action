const core = require('@actions/core');
const github = require('@actions/github');
const csv = require("csvtojson"); 

import Lambda from 'aws-sdk/clients/lambda';
import AWS from 'aws-sdk/global'

const apiVersion = '2015-03-31';

try {

  // Our github context
  const payload = github.context.payload;

  const input = core.getInput('results');

  const commitId = payload.commits[0].id
  const date = payload.commits[0].timestamp;
  const repoFullName = payload.repository.full_name;

  const awsCredentials = new AWS.Credentials();
  awsCredentials.accessKeyId = core.getInput('AWS_ACCESS_KEY_ID');
  awsCredentials.secretAccessKey = core.getInput('AWS_SECRET_ACCESS_KEY');

  const awsConfig = new AWS.Config({
    credentials: awsCredentials, region: core.getInput('REGION')
  })

  const lambda = new Lambda({apiVersion, region: core.getInput('REGION')});

  csv().fromFile(input).then((parseResult) => {

    let output = {};

    output.idCommit = commitId;
    output.date = date;
    output.id = repoFullName.replaceAll("/", "-");
    output.files = parseResult;

    console.log("Results: " + JSON.stringify(output));

    const response = lambda.invoke({FunctionName:'putDataAnalysis', Payload: JSON.stringify(output), InvocationType: 'RequestResponse'});

    core.setOutput('response', response);

  })

} catch (error) {
  core.setFailed(error.message);
}