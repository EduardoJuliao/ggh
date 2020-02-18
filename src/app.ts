#!/usr/bin/env node
import { argv } from 'yargs';
import { runEnvCheck, runCommandCheck, runOptionalCheck } from './lib/environment.validator';
import { getRemainingProperties } from './lib/core/parameters';
import { Runner } from './lib/core/command';

const command = argv._[0];
const parameters = getRemainingProperties(argv);

//if (!runCommandCheck(command)) process.exit();
if (!runOptionalCheck(parameters)) process.exit();
process.exit();
//if (!runEnvCheck()) process.exit();

const runner = new Runner(command);
runner.run();
