export function getRemainingProperties(argv: any): any[] {
   var result = [];
   const allKeys = Object.keys(argv);
   const keys = allKeys.filter((o: string) => o !== "_" && o !== "$0");
   for (var i = 0; i < keys.length; i++) {
      const obj: any = {};
      obj[keys[i]] = argv[keys[i]];
      result.push(obj);
   }

   return result;
}