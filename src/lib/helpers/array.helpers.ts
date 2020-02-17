export function getKeys(source: Array<any>): Array<string> {
   return source.map((o) => {
      return Object.keys(o)
   }).reduce((prev, curr) => {
      return prev.concat(curr)
   }).filter((col, i, array) => {
      return array.indexOf(col) === i
   });
}

export function diff(source: string[], comparer: string[]): string[] {
   return source
      .filter(element => !comparer.includes(element));
}