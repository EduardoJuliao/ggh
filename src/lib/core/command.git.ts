import { exec } from "shelljs";
import { IGitCommand } from "./interfaces/command.git.interface";


export class GitCommands implements IGitCommand {
   secondaryCommands: string[];

   constructor(secondaryCommands: string[]) {
      this.secondaryCommands = secondaryCommands;
   }

   public push(): void {
      if (this.secondaryCommands.indexOf('push') >= 0) {
         exec('git push');
      }
   }

   public pull(): void {
      let command = 'git pull';
      if (this.secondaryCommands.indexOf('rebase') >= 0) {
         command += ' --rebase';
      }
      exec(command);
   }

   public checkout(branchName: string): void {
      exec('git checkout ' + branchName);
   }

   public currentBranchName: string = exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout;

   public merge(branchName: string): void {
      exec('git merge ' + branchName);
   }

   public clean(): void {
      exec('git clean -fdx');
   }
}