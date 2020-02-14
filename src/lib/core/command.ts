import { exec } from 'shelljs';

export class Runner {

   private readonly command: string;

   constructor(command: string) {
      this.command = command;
   }

   public run(): void {
      switch (this.command) {
         case 'pull':
            this.pull();
            break;
         case 'clean':
            this.clean();
            break;
      };
   }

   private clean(): void {
      exec('gulp services:console:stop');
      exec('git clean -fdxq');
      exec('git pull --rebase');
      exec('gulp solution:build');
      exec('gulp db:deploy');
      exec('gulp js:app');
      exec('gulp css:build');
      exec('gulp services:console:start');
   }

   private pull(): void {
      exec('git pull');
      exec('gulp js:app');
      exec('gulp css:build');
   }
}