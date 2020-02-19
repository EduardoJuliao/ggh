import { IEnvironmentRunner } from './core/interfaces/validator/environment.runner';
import { IEnvironmentChecker } from './core/interfaces/validator/environment.checker';
import { which, echo } from 'shelljs';
import { pathDependencies, acceptedPrimaryCommands, acceptedSecondaryCommands, optionals } from '../env.json';
import { getKeys, diff, findOptionalInArray, findObjectInArray } from './helpers/array.helper';
import { IEnvironmentResultModel } from './models/environment.result.model.js';


export class EnvironmentValidator implements IEnvironmentChecker, IEnvironmentRunner {
   private readonly optionalKeys: string[] = getKeys(optionals);

   public runEnvCheck(): boolean {
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
   public runOptionalCheck(optionalCommands: Array<{ [s: string]: string }>): boolean {
      if (optionalCommands.length === 0)
         return true;

      var args = getKeys(optionalCommands);

      let isValid = this.printChecker(() => this.checkOptionalKeys(args));
      if (!isValid) return false;

      return this.printChecker(() => this.checkOptionalValues(args, optionalCommands));
   }

   public runCommandCheck(command: string): boolean {
      return this.printChecker(() => this.checkAcceptedCommands(command));
   }

   public runSecondaryCommandCheck(secondaryCommands: string[]): boolean {
      return this.printChecker(() => this.checkAcceptedSecondaryCommands(secondaryCommands));
   }

   public checkAcceptedCommands(command: string): IEnvironmentResultModel {
      return {
         valid: acceptedPrimaryCommands.indexOf(command) >= 0,
         wrongValue: `command \"${command}\" is not available.`,
         acceptedValues: acceptedPrimaryCommands.join('" , "')
      };
   }

   public checkOptionalKeys(args: string[]): IEnvironmentResultModel {
      const result: IEnvironmentResultModel = {
         valid: true
      };

      const nonRecognizedKeys = diff(args, this.optionalKeys);

      if (nonRecognizedKeys.length > 0) {
         result.wrongValue = `the keys "${nonRecognizedKeys.join('" , "')}" are not valid keys.`;
         result.acceptedValues = `accepted keys are: "${this.optionalKeys.join('" , "')}"`;
         result.valid = false;
      }

      return result;
   }

   public checkOptionalValues(args: string[], optionalCommands: Array<{ [s: string]: string }>): IEnvironmentResultModel {
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

   public checkAcceptedSecondaryCommands(secondaryCommands: string[]): IEnvironmentResultModel {
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

   private printChecker(checker: () => IEnvironmentResultModel): boolean {
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
}