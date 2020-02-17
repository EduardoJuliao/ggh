import { which, echo } from 'shelljs';
import { pathDependencies, acceptedCommands } from '../env.json';

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
   const result = acceptedCommands.indexOf(command) >= 0;
   if (!result)
      echo(`command \"${command}\" is not available.`);
   return result;
}