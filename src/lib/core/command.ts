import { exec } from 'shelljs';
import { sync } from 'rimraf';

export class Runner {

   private readonly command: string;

   constructor(command: string) {
      this.command = command;
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
      this.cleanFolders();
      exec('gulp services:console:stop');
      exec('git clean -fdxq');
      exec('git pull --rebase');
      exec('npm ci');
      exec('nuget restore');
      exec('gulp solution:build');
      exec('gulp db:deploy');
      exec('gulp');
      exec('gulp services:console:start');
   }

   private pull(): void {
      exec('git pull');
      exec('gulp');
   }

   private merge(): void {
      const branchName = this.currentBranchName;
      this.services(() => {
         this.cleanFolders();
         exec('git checkout develop');
         exec('git pull --rebase');
         exec('git checkout ' + branchName);
         exec('git merge develop');
         this.restore();
         exec('gulp');
      });
   }

   private currentBranchName: string = exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout;

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