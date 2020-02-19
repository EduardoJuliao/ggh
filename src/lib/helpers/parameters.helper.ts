/**
 * Get the remaining parameters from YARGS.
 *
 * @export
 * @param {*} argv
 * @returns {Array<{ [s: string]: string }>}
 */
export function getRemainingProperties(argv: any): Array<{ [s: string]: string }> {
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