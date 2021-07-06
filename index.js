const core = require('@actions/core');
const github = require('@actions/github');
const csv = require('csvtojson');
const fs = require('fs');

try {
  const payload = github.context.payload;

  const input = core.getInput('results');

  const commitId = payload.commits[0].id;
  const date = payload.commits[0].timestamp;
  const repoFullName = payload.repository.full_name;

  csv()
    .fromFile(input)
    .then((parseResult) => {
      let output = {};

      output.idCommit = commitId;
      output.date = date;
      output.id = repoFullName.split('/').join('-');
      output.files = parseResult;

      fs.writeFile('archinaut.json', JSON.stringify(output), 'utf8');
    });
} catch (error) {
  core.setFailed(error.message);
}
