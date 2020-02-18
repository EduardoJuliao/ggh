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

export function findIndex(source: Array<{ [s: string]: unknown }>, keyToFind: string): number {
   return source.findIndex(element => Object.keys(element).indexOf(keyToFind) >= 0);
}

export function findOptionalInArray(source: Array<{ [s: string]: unknown }>, keyToFind: string): Optional {
   const index = findIndex(source, keyToFind);
   const obj = source[index];
   return Object.values(obj)[0] as Optional;
}

export function findObjectInArray<T>(source: Array<{ [s: string]: unknown }>, keyToFind: string): T {
   const index = findIndex(source, keyToFind);
   const obj = source[index];
   return Object.values(obj)[0] as T;
}