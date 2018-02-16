#!/usr/bin/env node
const app = require('commander');
const fs = require('fs');
const path = require('path');

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
        seeder.up();
      });

      console.log('seed complete 🌱');
    });
  });

app.parse(process.argv);
