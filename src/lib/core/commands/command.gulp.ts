import { IGulpCommand } from '../interfaces/commands/command.gulp.interface';
import { exec } from "shelljs";
import { findObjectInArray } from '../../helpers/array.helper';
import { showCommand } from '../../display';


export class GulpCommands implements IGulpCommand {
   optionals: { [s: string]: string; }[];

   constructor(optionals: Array<{ [s: string]: string }>) {
      this.optionals = optionals;
   }

   gulp(): void {
      showCommand('running \"gulp\"...');
      exec('gulp');
   }

   buildSolution(): void {
      showCommand('building solution....');
      exec('gulp solution:build');
   }

   buildDb(): void {
      var dbOption = findObjectInArray<string>(this.optionals, 'db');
      if (dbOption) {
         showCommand('creating a "' + dbOption + '" database');
         exec('gulp ' + dbOption);
      }
   }

   public runUnderServices(callback: () => void) {
      showCommand('stopping services...');
      exec('gulp services:console:stop');
      callback();
      exec('gulp services:console:start');
      showCommand('starting services...');
   }
}