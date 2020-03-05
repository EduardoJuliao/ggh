#!/usr/bin/env node
import { RestorerCommands } from './lib/core/commands/command.restorer';
import { CleanerCommands } from './lib/core/commands/command.cleaner';
import { IEnvironmentRunner } from './lib/core/interfaces/validator/environment.runner';
import { GulpCommands } from './lib/core/commands/command.gulp';
import { GitCommands } from './lib/core/commands/command.git';
import { EnvironmentValidator } from './lib/environment.validator';
import { getRemainingProperties } from './lib/helpers/parameters.helper';
import { Runner } from './lib/core/command';
import { showCLIName } from './lib/display';
import configureHelper from './ggh.args';

showCLIName();

var argv = configureHelper();

const environmentChecker: IEnvironmentRunner = new EnvironmentValidator();

const primaryCommand = argv._[0];
const secondaryCommands = argv._.slice(1);
const parameters = getRemainingProperties(argv);

const gitCommands = new GitCommands(secondaryCommands);
const gulpCommands = new GulpCommands(parameters);
const cleanerCommands = new CleanerCommands();
const restorerCommands = new RestorerCommands();

if (!environmentChecker.runEnvCheck()) process.exit();
if (!environmentChecker.runCommandCheck(primaryCommand)) process.exit();
if (!environmentChecker.runOptionalCheck(parameters)) process.exit();
if (!environmentChecker.runSecondaryCommandCheck(secondaryCommands)) process.exit();

const runner = new Runner(primaryCommand, gitCommands, gulpCommands, cleanerCommands, restorerCommands);
runner.run();
