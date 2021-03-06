import * as assert from 'assert';
import { expect } from 'chai';
import * as helper from '../../lib/helpers/parameters.helper';

describe('YARGS parameters', () => {
   const args: any = {
      _: ['pull', 'rebase', 'push'],
      $0: 'bin/**/*.tests.js',
   };
   args['db'] = 'db:tiny';

   it('can get optional parameters', () => {
      const result = helper.getRemainingProperties(args);

      expect(result.length).to.be.equal(1);
      assert.deepEqual(result[0], { 'db': 'db:tiny' });
   });
})