import { exec } from "shelljs";
import { showCommand } from '../../display';
import { IRestorerCommands } from "../interfaces/commands/command.restorer.interface";

export class RestorerCommands implements IRestorerCommands {
   public restore(): void {
      showCommand('restoring packages...');
      exec('nuget restore');
      exec('npm ci');
   }
}