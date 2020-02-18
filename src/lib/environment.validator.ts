import { which, echo } from 'shelljs';
import { pathDependencies, acceptedCommands, optionals } from '../env.json';
import { getKeys, diff, findOptionalInArray, findObjectInArray, findIndex } from './helpers/array.helpers.js';

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

export function runOptionalCheck(optionalCommands: Array<{ [s: string]: string }>): boolean {
   //TODO: needs to be smaller and unit tested
   var args = getKeys(optionalCommands);
   const nonRecognizedKeys = diff(args, optionalKeys);

   if (nonRecognizedKeys.length > 0) {
      const keys = nonRecognizedKeys.join('" , "'); // this is horrible I know
      echo(`the keys "${keys}" are not valid keys.`);
      return false;
   }

   let result = false;
   args.some(key => {
      const value = findObjectInArray<string>(optionalCommands, key);
      const opt = findOptionalInArray(optionals, key);
      result = opt.acceptedValues.indexOf(value) >= 0;
      if (!result) {
         echo(`the value "${value}" is not valid for "${key}"`);
         const keys = opt.acceptedValues.join('" , "');
         echo(`accepted values are: "${keys}"`);
      }
      return !result;
   });

   console.log(result);

   return result;
}

export function runCommandCheck(command: string): boolean {
   const result = acceptedCommands.indexOf(command) >= 0;
   if (!result)
      echo(`command \"${command}\" is not available.`);
   return result;
}