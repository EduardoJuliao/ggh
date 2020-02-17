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

   private cleanFolders(): void {
      sync('./bin');
      sync('./test-bin');
   }

   private pull(): void {
      exec('git pull');
      exec('gulp');
   }

   private merge(): void {
      exec('gulp services:console:stop');
      this.cleanFolders();
      exec('git checkout develop');
      exec('git pull --rebase');
      exec('git checkout ' + this.currentBranchName);
      exec('git merge develop');
      exec('nuget restore');
      exec('npm ci');
      exec('gulp');
      exec('gulp services:console:start');
   }

   private currentBranchName: string = exec('git rev-parse --abbrev-ref HEAD').stdout;
}