#!/usr/bin/env node
import { argv } from 'yargs';
import { exec } from 'shelljs';
import { runEnvCheck, runCommandCheck } from './lib/environment.validator';

const command = argv._[0];

if (!runCommandCheck(command)) process.exit();
if (!runEnvCheck()) process.exit();

if (command === 'pull') {
   exec('git pull');
   exec('gulp js:app');
   exec('gulp css:build');
}