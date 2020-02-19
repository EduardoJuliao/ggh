import { exec } from 'shelljs';
import { sync } from 'rimraf';
import { IGitCommand } from './interfaces/command.git.interface';

export class Runner {

   private readonly command: string;
   private readonly originBranchName: string = 'develop';
   private readonly optionals: { [s: string]: string; }[];
   private readonly gitCommands: IGitCommand;

   constructor(
      command: string,
      gitCommands: IGitCommand,
      optionals: Array<{ [s: string]: string }>) {
      this.command = command;
      this.optionals = optionals;
      this.gitCommands = gitCommands;
   }

   public async run(): Promise<void> {
      switch (this.command) {
         case 'pull':
            this.pull();
            break;
         case 'clean':
            this.clean();
            break;
         case 'merge-develop':
            this.merge();
            break;
      };
   }

   private clean(): void {
      this.services(() => {
         this.gitCommands.clean();
         this.restore();
         exec('gulp solution:build');
         exec('gulp');
         exec('gulp db:tiny');
      });
   }

   private pull(): void {
      this.gitCommands.pull();
      exec('gulp');
   }

   private merge(): void {
      const branchName = this.gitCommands.currentBranchName;
      this.services(() => {
         this.cleanFolders();
         this.gitCommands.checkout(this.originBranchName);
         this.gitCommands.pull();
         this.gitCommands.checkout(branchName);
         this.gitCommands.merge(this.originBranchName);
         this.gitCommands.push();
         this.restore();
         exec('gulp');
      });
   }



   private restore(): void {
      exec('nuget restore');
      exec('npm ci');
   }

   private cleanFolders(): void {
      sync('./bin');
      sync('./test-bin');
   }

   private services(callback: () => void) {
      exec('gulp services:console:stop');
      callback();
      exec('gulp services:console:start');
   }
}