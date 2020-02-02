#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');
const shell = require('shelljs');

program.version(package);
program.description('some git utilities');
program.option('-c, --commit <commit>', 'commit hash to run. min length = 7');

program.parse(process.argv);

if (!shell.which('git')) {
    console.error('git is required :/');
    shell.exit(1);
}

if (!program.commit) {
    program.help();
    shell.exit(1);
}

if (program.commit.length < 7) {
    console.error('commit hash too short :/');
    shell.exit(1);
}

let commitFiles = [];

try {
    commitFiles = shell.exec(`git show --pretty="" --name-only ${program.commit}`, { encoding: 'utf8' }).split('\n');
} catch (e) {
    console.error('error fetching commit files :/', e);
    shell.exit(1);
}

if (!commitFiles || !commitFiles.length) shell.exit(1);

commitFiles.forEach((file) => {
    if (!file) return;

    try {
        const fileLastCharacter = shell.tail({ '-n': 1 }, file);
        let command = `echo >> ${file}`;

        if (fileLastCharacter.includes('\n')) command = `truncate -s-1 ${file}`;

        shell.exec(command, { encoding: 'utf8' });
    } catch (e) {
        console.error(`error editing file ${file}`);
    }
});
