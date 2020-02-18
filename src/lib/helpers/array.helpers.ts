import { Optional } from "../models/optional.model";

export function getKeys(source: Array<any>): Array<string> {
   return source.map((o) => {
      return Object.keys(o)
   }).reduce((prev, curr) => {
      return prev.concat(curr)
   }).filter((col, i, array) => {
      return array.indexOf(col) === i
   });
}

export function getKeysFromObject(source: any): Array<string> {
   return Object.keys(source)
      .filter((col, i, array) => {
         return array.indexOf(col) === i
      });
}

export function diff(source: string[], comparer: string[]): string[] {
   return source
      .filter(element => !comparer.includes(element));
}

export function findObjectInArray(source: Array<{ [s: string]: unknown }>, keyToFind: string): Optional | null {
   const index = source.findIndex(element => Object.keys(element).indexOf(keyToFind) >= 0);
   const obj = source[index];
   return Object.values(obj)[0] as Optional;
}