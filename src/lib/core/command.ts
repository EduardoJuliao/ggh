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
         case 'pull-full':
            this.pull();
            break;
      };
   }

   private pull(): void {
      exec('git pull');
      exec('gulp js:app');
      exec('gulp css:build');
   }

   private pull_full(): void {
      exec('git clean -fdxq');
      exec('git pull --rebase');
      exec('gulp db:deploy');
      exec('gulp js:app');
      exec('gulp css:build');
   }
}