import { exec } from 'shelljs';
import { sync } from 'rimraf';
import { findObjectInArray } from '../helpers/array.helpers';

export class Runner {

   private readonly command: string;
   private readonly originBranchName: string = 'develop';
   private readonly optionals: { [s: string]: string; }[];

   constructor(command: string, optionals: Array<{ [s: string]: string }>) {
      this.command = command;
      this.optionals = optionals;
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
         exec('git clean -fdx');
         this.restore();
         exec('gulp solution:build');
         exec('gulp');
         exec('gulp db:tiny');
      });
   }

   private pull(): void {
      exec('git pull');
      exec('gulp');
   }

   private merge(): void {
      const branchName = this.currentBranchName;
      this.services(() => {
         this.cleanFolders();
         this.checkout(this.originBranchName);
         exec('git pull --rebase');
         this.checkout(branchName);
         exec('git merge ' + this.originBranchName);
         this.push();
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

   private checkout(branchName: string): void {
      exec('git checkout ' + branchName);
   }

   private push(): void {
      const shouldPush = findObjectInArray<string>(this.optionals, "push");
      if (shouldPush === "Y" || shouldPush === "y") {
         exec('git push');
      }
   }
}