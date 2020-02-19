import { IGulpCommand } from '../interfaces/commands/command.gulp.interface';
import { exec } from "shelljs";
import { findObjectInArray } from '../../helpers/array.helper';


export class GulpCommands implements IGulpCommand {
   optionals: { [s: string]: string; }[];

   constructor(optionals: Array<{ [s: string]: string }>) {
      this.optionals = optionals;
   }

   gulp(): void {
      exec('gulp');
   }

   buildSolution(): void {
      exec('gulp solution:build');
   }

   buildDb(): void {
      var dbOption = findObjectInArray<string>(this.optionals, 'db');
      if (dbOption) {
         exec('gulp ' + dbOption);
      }
   }

   public runUnderServices(callback: () => void) {
      exec('gulp services:console:stop');
      callback();
      exec('gulp services:console:start');
   }
}