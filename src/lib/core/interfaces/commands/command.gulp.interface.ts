export interface IGulpCommand {
   gulp(): void;
   runUnderServices(callback: () => void): void;
   buildSolution(): void;
   buildDb(): void;
}