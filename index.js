const core = require('@actions/core');
const { execFileSync, execSync } = require('child_process');
const fs = require('fs');

const hasValue = (input) => {
  return input.trim().length !== 0;
};

const github_pat = core.getInput('github_pat');

const actionsList = JSON.parse(core.getInput('actions_list'));
const basePath = core.getInput('checkout_base_path');

const regex = /^(inmar)\/(.+)@(.+)$/;
actionsList.forEach((action) => {
  const match = regex.exec(action);
  if(match.length === 4) {
    const owner = match[1];
    const repo = match[2];
    const ref = match[3];

    if(owner !== "inmar") {
      console.log(`Skipping repo ${repo} as it is now owned by inmar.`);
      return;
    }

    const cloneUrl = `https://${github_pat}@github.com/${owner}/${repo}.git`
    const cloneDir = `${basePath}/${repo}`;
    const cloneCommand = `git clone --depth=1 --single-branch --branch ${ref} ${cloneUrl} ${cloneDir}`;

    console.log(cloneCommand);
    execSync(cloneCommand);
  } else {
    console.log(`The value ${action} does not follow the required format: inmar/repo@ref`);
  }
});