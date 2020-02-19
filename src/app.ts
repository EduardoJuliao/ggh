#!/usr/bin/env node
import { GulpCommands } from './lib/core/command.gulp';
import { GitCommands } from './lib/core/command.git';
import { argv } from 'yargs';
import { runEnvCheck, runCommandCheck, runOptionalCheck } from './lib/environment.validator';
import { getRemainingProperties } from './lib/helpers/parameters.helper';
import { Runner } from './lib/core/command';

const primaryCommand = argv._[0];
const secondaryCommands = argv._.slice(1);
const parameters = getRemainingProperties(argv);

const gitCommands = new GitCommands(secondaryCommands);
const gulpCommands = new GulpCommands(parameters);

if (!runCommandCheck(primaryCommand)) process.exit();
if (!runOptionalCheck(parameters)) process.exit();
if (!runEnvCheck()) process.exit();

const runner = new Runner(primaryCommand, gitCommands, gulpCommands);
runner.run();
