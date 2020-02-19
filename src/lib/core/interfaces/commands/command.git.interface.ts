export interface IGitCommand {
   push(): void;
   pull(): void;
   checkout(branchName: string): void;
   currentBranchName: string;
   merge(branchName: string): void;
   clean(): void;
}