#!/usr/bin/env node
import { argv } from 'yargs';
import { runEnvCheck, runCommandCheck } from './lib/environment.validator';
import { Runner } from './lib/core/command';

const command = argv._[0];

if (!runCommandCheck(command)) process.exit();
if (!runEnvCheck()) process.exit();

const runner = new Runner(command);
runner.run();
