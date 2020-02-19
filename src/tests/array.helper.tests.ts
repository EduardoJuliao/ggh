import * as helper from '../lib/helpers/array.helper';
import * as assert from 'assert';
import { expect } from 'chai';

describe('Array helper tests', () => {
   it('can get different items in two array', () => {
      const source = ["0", "1", "2", "3", "4", "5"];
      const compare = ["0", "2", "4"];
      const expected = ["1", "3", "5"];
      const difference = helper.diff(source, compare);
      assert.deepEqual(difference, expected);
   });

   it('get the keys from an object', () => {
      const obj = { "prop1": { "innerProp": 12 }, "prop2": 10, "prop3": "str" };
      const expected = ["prop1", "prop2", "prop3"];
      const keys = helper.getKeysFromObject(obj);
      assert.deepEqual(keys, expected);
   });

   it('get keys from objects in an array', () => {
      const array = [{ "db": {}, "rebase": {} }];
      const expected = ["db", "rebase"];
      const keys = helper.getKeys(array);
      assert.deepEqual(keys, expected);
   });

   it('can get index', () => {
      const optionals = [
         {
            "db": {
               "default": "db:tiny",
               "acceptedValues": ["db:deploy", "db:tiny", "db:small", "db:large"]
            }
         },
         {
            "rebase": {
               "default": "",
               "acceptedValues": ["--rebase"]
            }
         }
      ];

      const keys = ["db", "rebase"];
      for (var i = 0; i < keys.length; i++) {
         const index = helper.findIndex(optionals, keys[i]);
         expect(index).to.be.equal(i);
      }
   })

   it('can get object in an array', () => {
      const optionals = [
         {
            "db": {
               "default": "db:tiny",
               "acceptedValues": ["db:deploy", "db:tiny", "db:small", "db:large"]
            }
         },
         {
            "rebase": {
               "default": "",
               "acceptedValues": ["--rebase"]
            }
         }
      ];

      const keys = ["db", "rebase"];
      for (var i = 0; i < keys.length; i++) {
         const result = helper.findObjectInArray(optionals, keys[i]);
         expect(result).to.have.all.keys("default", "acceptedValues");
      }
   });

   it('can get value from array', () => {
      const optional = [{ 'db': 'db:tiny' }];

      const value = helper.findObjectInArray<string>(optional, 'db');

      expect(value).to.be.equal('db:tiny');
   })
})