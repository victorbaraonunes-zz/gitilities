#!/usr/bin/env node

const program = require('commander'),
    package = require('./package.json');

program.version(package);
program.description('some git utilities');
program.option('-c, --commit <commit>', 'commit hash to run. min length = 7');

program.parse(process.argv);

if (program.commit) {
    if (program.commit.length < 7) return console.log('commit hash too short :/');
} else {
    program.help();   
}
