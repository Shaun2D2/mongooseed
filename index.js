#!/usr/bin/env node
const app = require('commander');
const fs = require('fs');
const path = require('path');
const casual = require('casual');

const seederTemplate = require('./src/templates/seeder');

/**
 * Need to create a seeder file template
 *
 */
app
  .command('run')
  .option('-p, --path <path>', 'path to seeder directory')
  .action((ops) => {
    const dirPath = ops.path ? ops.path : 'src';
    fs.readdir(path.resolve(__dirname, `./${dirPath}`), (err, files) => {
      files.forEach((file, index) => {
        console.log(`seending ${(index + 1)} of ${files.length}`);
        const seeder = require(path.resolve(__dirname, `${dirPath}/${file}`));
        seeder.up()(casual);
      });

      console.log('seed complete 🌱');
    });
  });

app
  .command('create <model>')
  .option('-p, --path <path>', 'path to seeder directory')
  .action((model, ops) => {
    fs.writeFile(`${model}Seeder.js`, seederTemplate(), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });

app.parse(process.argv);
