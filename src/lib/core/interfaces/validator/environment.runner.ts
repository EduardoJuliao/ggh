export interface IEnvironmentRunner {
   runCommandCheck(command: string): boolean;
   runOptionalCheck(optionalCommands: Array<{ [s: string]: string }>): boolean;
   runEnvCheck(): boolean;
   runSecondaryCommandCheck(secondaryCommands: string[]): boolean;
}