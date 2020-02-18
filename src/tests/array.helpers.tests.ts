import { diff } from '../lib/helpers/array.helpers';
import * as assert from 'assert';

describe('Array helper tests', () => {
   it('can get different items in two array', () => {
      const source = ["0", "1", "2", "3", "4", "5"];
      const compare = ["0", "2", "4"];
      const expected = ["1", "3", "5"];
      const difference = diff(source, compare);
      assert.deepEqual(difference, expected);
   })
})