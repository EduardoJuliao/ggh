#!/usr/bin/env node
import { GitCommands } from './lib/core/command.git';
import { argv } from 'yargs';
import { runEnvCheck, runCommandCheck, runOptionalCheck } from './lib/environment.validator';
import { getRemainingProperties } from './lib/core/parameters';
import { Runner } from './lib/core/command';

const primaryCommand = argv._[0];
const secondaryCommands = argv._.slice(1);
const parameters = getRemainingProperties(argv);

const gitCommands = new GitCommands(secondaryCommands);

if (!runCommandCheck(primaryCommand)) process.exit();
if (!runOptionalCheck(parameters)) process.exit();
if (!runEnvCheck()) process.exit();

const runner = new Runner(primaryCommand, gitCommands, parameters);
runner.run();
