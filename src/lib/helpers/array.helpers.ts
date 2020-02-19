import { Optional } from "../models/optional.model";

/**
 * Gets the keys present in an array of objects.
 *
 * @export
 * @param {Array<any>} source
 * @returns {Array<string>}
 */
export function getKeys(source: Array<any>): Array<string> {
   return source.map((o) => {
      return Object.keys(o)
   }).reduce((prev, curr) => {
      return prev.concat(curr)
   }).filter((col, i, array) => {
      return array.indexOf(col) === i
   });
}

/**
 * Gets the keys present in an object.
 *
 * @export
 * @param {*} source
 * @returns {Array<string>}
 */
export function getKeysFromObject(source: any): Array<string> {
   return Object.keys(source)
      .filter((col, i, array) => {
         return array.indexOf(col) === i
      });
}

/**
 * Get the differences between arrays
 * Eg.
 * s = [1,2,3]
 * c = [2,3,4]
 * d = [1,4]
 * @export
 * @param {string[]} source
 * @param {string[]} comparer
 * @returns {string[]}
 */
export function diff(source: string[], comparer: string[]): string[] {
   return source
      .filter(element => !comparer.includes(element));
}

/**
 * Find the object index inside an array
 *
 * @export
 * @param {Array<{ [s: string]: unknown }>} source
 * @param {string} keyToFind
 * @returns {number}
 */
export function findIndex(source: Array<{ [s: string]: unknown }>, keyToFind: string): number {
   return source.findIndex(element => Object.keys(element).indexOf(keyToFind) >= 0);
}

/**
 * Get the Optional value from an object inside an array
 *
 * @export
 * @param {Array<{ [s: string]: unknown }>} source
 * @param {string} keyToFind
 * @returns {Optional}
 */
export function findOptionalInArray(source: Array<{ [s: string]: unknown }>, keyToFind: string): Optional {
   const index = findIndex(source, keyToFind);
   const obj = source[index];
   return Object.values(obj)[0] as Optional;
}

/**
 * Get the value from an object inside an array
 * Eg.
 * [{'db': 'db:tiny'}]
 * @export
 * @template T
 * @param {Array<{ [s: string]: unknown }>} source
 * @param {string} keyToFind
 * @returns {T}
 */
export function findObjectInArray<T>(source: Array<{ [s: string]: unknown }>, keyToFind: string): T {
   const index = findIndex(source, keyToFind);
   const obj = source[index];
   return Object.values(obj)[0] as T;
}