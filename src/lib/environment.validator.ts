import { which, echo } from 'shelljs';
import { pathDependencies, acceptedPrimaryCommands, acceptedSecondaryCommands, optionals } from '../env.json';
import { getKeys, diff, findOptionalInArray, findObjectInArray } from './helpers/array.helper';
import { IEnvironmentResultModel } from './models/environment.result.model.js';

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

//TODO: still bad though 😳😢
export function runOptionalCheck(optionalCommands: Array<{ [s: string]: string }>): boolean {
   if (optionalCommands.length === 0)
      return true;

   var args = getKeys(optionalCommands);

   let isValid = printChecker(() => checkOptionalKeys(args));
   if (!isValid) return false;

   return printChecker(() => checkOptionalValues(args, optionalCommands));
}

export function runCommandCheck(command: string): boolean {
   return printChecker(() => checkAcceptedCommands(command));
}

export function checkAcceptedCommands(command: string): IEnvironmentResultModel {
   return {
      valid: acceptedPrimaryCommands.indexOf(command) >= 0,
      wrongValue: `command \"${command}\" is not available.`,
      acceptedValues: acceptedPrimaryCommands.join('" , "')
   };
}

export function checkOptionalKeys(args: string[]): IEnvironmentResultModel {
   const result: IEnvironmentResultModel = {
      valid: true
   };

   const nonRecognizedKeys = diff(args, optionalKeys);

   if (nonRecognizedKeys.length > 0) {
      result.wrongValue = `the keys "${nonRecognizedKeys.join('" , "')}" are not valid keys.`;
      result.acceptedValues = `accepted keys are: "${optionalKeys.join('" , "')}"`;
      result.valid = false;
   }

   return result;
}

export function checkOptionalValues(args: string[], optionalCommands: Array<{ [s: string]: string }>): IEnvironmentResultModel {
   const result: IEnvironmentResultModel = {
      valid: false
   };
   args.some(key => {
      const value = findObjectInArray<string>(optionalCommands, key);
      const opt = findOptionalInArray(optionals, key);
      result.valid = opt.acceptedValues.indexOf(value) >= 0;
      if (!result.valid) {
         result.wrongValue = `the value "${value}" is not valid for "${key}"`;
         result.acceptedValues = `accepted values are: "${opt.acceptedValues.join('" , "')}"`;
      }
      return !result.valid;
   });

   return result;
}

export function checkAcceptedSecondaryCommands(secondaryCommands: string[]): IEnvironmentResultModel {
   let result: IEnvironmentResultModel = {
      valid: secondaryCommands.length === 0,
   };

   if (result.valid) return result;

   const difference = diff(secondaryCommands, acceptedSecondaryCommands);
   if (difference.length === 0) {
      result.valid = true;
      return result;
   }

   result.valid = false;
   result.wrongValue = `Secondary commands "${difference.join('" , "')}" are not accepted.`;
   result.acceptedValues = `Accepted secondary commands are: "${acceptedSecondaryCommands.join('" , "')}"`;
   return result;

}

function printChecker(checker: () => IEnvironmentResultModel): boolean {
   const result = checker();
   if (!result.valid) {
      if (result.wrongValue) {
         echo(result.wrongValue);
      }
      if (result.acceptedValues) {
         echo(result.acceptedValues);
      }
   }
   return result.valid;
}