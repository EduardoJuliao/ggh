#!/usr/bin/env node
import { echo } from 'shelljs';
import { IEnvironmentRunner } from './lib/core/interfaces/validator/environment.runner';
import { GulpCommands } from './lib/core/commands/command.gulp';
import { GitCommands } from './lib/core/commands/command.git';
import { argv } from 'yargs';
import { EnvironmentValidator } from './lib/environment.validator';
import { getRemainingProperties } from './lib/helpers/parameters.helper';
import { Runner } from './lib/core/command';
import { showCLIName } from './lib/display';

showCLIName();

const environmentChecker: IEnvironmentRunner = new EnvironmentValidator();

const primaryCommand = argv._[0];
const secondaryCommands = argv._.slice(1);
const parameters = getRemainingProperties(argv);

const gitCommands = new GitCommands(secondaryCommands);
const gulpCommands = new GulpCommands(parameters);

if (!environmentChecker.runEnvCheck()) process.exit();
if (!environmentChecker.runCommandCheck(primaryCommand)) process.exit();
if (!environmentChecker.runOptionalCheck(parameters)) process.exit();
if (!environmentChecker.runSecondaryCommandCheck(secondaryCommands)) process.exit();

const runner = new Runner(primaryCommand, gitCommands, gulpCommands);
runner.run();
