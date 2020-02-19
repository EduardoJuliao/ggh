import { IGulpCommand } from './interfaces/commands/command.gulp.interface';
import { exec } from 'shelljs';
import { sync } from 'rimraf';
import { IGitCommand } from './interfaces/commands/command.git.interface';

export class Runner {

   private readonly command: string;
   private readonly originBranchName: string = 'develop';
   private readonly gitCommands: IGitCommand;
   private readonly gulpCommands: IGulpCommand;

   constructor(
      command: string,
      gitCommands: IGitCommand,
      gulpCommands: IGulpCommand) {
      this.command = command;
      this.gulpCommands = gulpCommands;
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
      this.gulpCommands.runUnderServices(() => {
         this.gitCommands.clean();
         this.restore();
         this.gulpCommands.buildSolution();
         this.gulpCommands.gulp();
         this.gulpCommands.buildDb();
      });
   }

   private pull(): void {
      this.gitCommands.pull();
      this.gulpCommands.gulp();
   }

   private merge(): void {
      const branchName = this.gitCommands.currentBranchName;
      this.gulpCommands.runUnderServices(() => {
         this.cleanFolders();
         this.gitCommands.checkout(this.originBranchName);
         this.gitCommands.pull();
         this.gitCommands.checkout(branchName);
         this.gitCommands.merge(this.originBranchName);
         this.gitCommands.push();
         this.restore();
         this.gulpCommands.gulp();
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
}