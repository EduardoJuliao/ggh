import { IEnvironmentResultModel } from "../../../models/environment.result.model";

export interface IEnvironmentChecker {
   checkOptionalKeys(args: string[]): IEnvironmentResultModel;
   checkAcceptedSecondaryCommands(secondaryCommands: string[]): IEnvironmentResultModel;
   checkOptionalValues(args: string[], optionalCommands: Array<{ [s: string]: string }>): IEnvironmentResultModel;
   checkOptionalKeys(args: string[]): IEnvironmentResultModel;
   checkAcceptedCommands(command: string): IEnvironmentResultModel;
}