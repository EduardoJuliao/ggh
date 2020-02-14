import { which, echo } from 'shelljs';

const pathDependencies = ['git', 'gulp', 'npm']
const acceptedCommands = ['pull'];

export function runEnvCheck(): boolean {
   for (let i = 0; i < pathDependencies.length; i++) {
      var d = pathDependencies[i];
      if (!which(d)) {
         echo('couldn\'t find cli: ' + d);
         return false;
      }
   }
   return true;
}

export function runCommandCheck(command: string): boolean {
   return acceptedCommands.indexOf(command) >= 0;
}