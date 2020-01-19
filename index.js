#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');
const exec = require('child_process').exec;

program.version(package);
program.description('some git utilities');
program.option('-c, --commit <commit>', 'commit hash to run. min length = 7');

program.parse(process.argv);

if (program.commit) {
    if (program.commit.length < 7) {
        console.error('commit hash too short :/');
        process.exit(1);
    }

    exec(`git show --pretty="" --name-only ${program.commit}`, (error, stdout, stderr) => {
        console.log('error', error);

        if (error) {
            console.error('execution failed :/', error);
            process.exit(1);
        }

        console.log('stdout', stdout.split('\n'));
        console.log('stderr', stderr);

        stdout.split('\n').forEach((file) => {
            if (!file) return;

            exec(`echo >> `, () => {

            });
        });
    });
} else {
    program.help();   
}
