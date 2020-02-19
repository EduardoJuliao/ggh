#!/usr/bin/env node
import { IEnvironmentRunner } from './lib/core/interfaces/validator/environment.runner';
import { GulpCommands } from './lib/core/command.gulp';
import { GitCommands } from './lib/core/command.git';
import { argv } from 'yargs';
import { EnvironmentValidator } from './lib/environment.validator';
import { getRemainingProperties } from './lib/helpers/parameters.helper';
import { Runner } from './lib/core/command';

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
