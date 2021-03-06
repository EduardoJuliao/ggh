import { IRestorerCommands } from './interfaces/commands/command.restorer.interface';
import { IGulpCommand } from './interfaces/commands/command.gulp.interface';
import { IGitCommand } from './interfaces/commands/command.git.interface';
import { ICleanerCommands } from './interfaces/commands/command.cleaner.interface';
import { showCommand } from '../display';

export class Runner {

   private readonly command: string;
   private readonly originBranchName: string = 'develop';
   private readonly gitCommands: IGitCommand;
   private readonly gulpCommands: IGulpCommand;
   private readonly cleanerCommands: ICleanerCommands;
   private readonly restorerCommands: IRestorerCommands;

   constructor(
      command: string,
      gitCommands: IGitCommand,
      gulpCommands: IGulpCommand,
      cleanerCommands: ICleanerCommands,
      restorerCommands: IRestorerCommands) {
      this.command = command;
      this.gulpCommands = gulpCommands;
      this.gitCommands = gitCommands;
      this.cleanerCommands = cleanerCommands;
      this.restorerCommands = restorerCommands;
   }

   public async run(): Promise<void> {
      showCommand('Preparing your environment...');

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
         this.restorerCommands.restore();
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
         this.cleanerCommands.cleanFolders();
         this.gitCommands.checkout(this.originBranchName);
         this.gitCommands.pull();
         this.gitCommands.checkout(branchName);
         this.gitCommands.merge(this.originBranchName);
         this.gitCommands.push();
         this.restorerCommands.restore();
         this.gulpCommands.gulp();
      });
   }
}