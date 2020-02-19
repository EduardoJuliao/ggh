import * as assert from 'assert';
import { expect } from 'chai';
import * as validator from '../lib/environment.validator';

describe('Environment tests', () => {

   describe('Accepted primary commands', () => {
      it('returns false for invalid command', () => {
         const result = validator.checkAcceptedCommands('wrong');

         expect(result.valid).to.be.false;
      });

      it('returns true for valid command', () => {
         const result = validator.checkAcceptedCommands('pull');

         expect(result.valid).to.be.true;
      });
   });

   describe('Accepted secondary commands', () => {
      it('returns false for invalid command', () => {
         const result = validator.checkAcceptedSecondaryCommands(['wrong']);

         expect(result.valid).to.be.false;
      });

      it('returns true for valid command', () => {
         const result = validator.checkAcceptedSecondaryCommands(['push']);

         expect(result.valid).to.be.true;
      });
   });

   describe('Optionals', () => {
      describe('Keys', () => {
         it('returns false for non recognized keys', () => {
            var result = validator.checkOptionalKeys(["outsiders"]);

            expect(result.valid).to.be.false;
         });

         it('returns true for recognized keys', () => {
            var result = validator.checkOptionalKeys(["db"]);

            expect(result.valid).to.be.true;
         });
      });

      describe('values', () => {
         it('returns false from invalid value', () => {
            const result = validator.checkOptionalValues(['db'], [{ 'db': 'db:MEGA' }]);

            expect(result.valid).to.be.false;
         });

         it('returns true from valid value', () => {
            const result = validator.checkOptionalValues(['db'], [{ 'db': 'db:tiny' }]);

            expect(result.valid).to.be.true;
         });
      });
   });
});