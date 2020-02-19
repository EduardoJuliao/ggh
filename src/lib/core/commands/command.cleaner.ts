import { ICleanerCommands } from './../interfaces/commands/command.cleaner.interface';
import { sync } from "rimraf";
import { showCommand } from '../../display';

export class CleanerCommands implements ICleanerCommands {
   public cleanFolders(): void {
      showCommand('excluding folders...');
      sync('./bin');
      sync('./test-bin');
   }
}