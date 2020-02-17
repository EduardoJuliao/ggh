import { which, echo } from 'shelljs';
import { pathDependencies, acceptedCommands, optionals } from '../env.json';
import { getKeys, diff } from './helpers/array.helpers.js';

const optionalKeys = getKeys(optionals);

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

export function runOptionalCheck(optionalCommands: Array<{ key: string, value: string }>): boolean {
   var args = getKeys(optionalCommands);
   const nonRecognizedKeys = diff(args, optionalKeys);

   if (nonRecognizedKeys.length > 0) {
      const keys = nonRecognizedKeys.join('" , "'); // this is horrible I know
      echo(`the keys "${keys}" are not valid keys.`);
      return false;
   }

   return true;
}

export function runCommandCheck(command: string): boolean {
   const result = acceptedCommands.indexOf(command) >= 0;
   if (!result)
      echo(`command \"${command}\" is not available.`);
   return result;
}