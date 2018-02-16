#!/usr/bin/env node
const app = require('commander');

app
  .arguments('<file>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action((file) => {
    console.log('user: %s pass: %s file: %s', app.username, app.password, file);
  })
  .parse(process.argv);
