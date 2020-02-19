import { exec } from "shelljs";
import { IGitCommand } from "../interfaces/commands/command.git.interface";
import { showCommand } from "../../display";


export class GitCommands implements IGitCommand {
   secondaryCommands: string[];

   constructor(secondaryCommands: string[]) {
      this.secondaryCommands = secondaryCommands;
   }

   public push(): void {
      if (this.secondaryCommands.indexOf('push') >= 0) {
         showCommand('pushing your changes...');
         exec('git push');
      }
   }

   public pull(): void {
      let command = 'git pull';
      if (this.secondaryCommands.indexOf('rebase') >= 0) {
         command += ' --rebase';
      }
      showCommand('pulling from source...');
      exec(command);
   }

   public checkout(branchName: string): void {
      showCommand('changing branches...');
      exec('git checkout ' + branchName);
   }

   public currentBranchName: string = exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout;

   public merge(branchName: string): void {
      showCommand('merging...');
      exec('git merge ' + branchName);
   }

   public clean(): void {
      showCommand('cleaning repository...');
      exec('git clean -fdx');
   }
}