import rollDice from './rollDice';
import range from 'lodash/fp/range';
import {
  rollAugmentedScore,
  rollClassicScore,
  rollStandardScore,
} from './rollAttributes';

jest.mock('./rollDice');

/** @type jest.Mock<number[]> */
const mockedRollDice = rollDice;

describe('rollAttributes', () => {
  describe('rollStandardScore()', () => {
    test('6,6,6,1', () => {
      mockedRollDice.mockReturnValueOnce([6, 6, 6, 1]);
      expect(rollStandardScore()).toEqual({
        constituents: [6, 6, 6],
        discarded: [1],
      });
    });
    test('6,6,6,3', () => {
      mockedRollDice.mockReturnValueOnce([6, 6, 6, 3]);
      expect(rollStandardScore()).toEqual({
        constituents: [6, 6, 6],
        discarded: [3],
      });
    });
    test('4,5,1,6', () => {
      mockedRollDice.mockReturnValueOnce([4, 5, 1, 6]);
      expect(rollStandardScore()).toEqual({
        constituents: [4, 5, 6],
        discarded: [1],
      });
    });
    test('1,6,1,1', () => {
      mockedRollDice.mockReturnValueOnce([1, 6, 1, 1]);
      expect(rollStandardScore()).toEqual({
        constituents: [6, 1, 1],
        discarded: [1],
      });
    });
    test('3,4,5,1', () => {
      mockedRollDice.mockReturnValueOnce([3, 4, 5, 1]);
      expect(rollStandardScore()).toEqual({
        constituents: [3, 4, 5],
        discarded: [1],
      });
    });
    test('3,4,1,5', () => {
      mockedRollDice.mockReturnValueOnce([3, 4, 1, 5]);
      expect(rollStandardScore()).toEqual({
        constituents: [3, 4, 5],
        discarded: [1],
      });
    });
    test('3,1,4,5', () => {
      mockedRollDice.mockReturnValueOnce([3, 1, 4, 5]);
      expect(rollStandardScore()).toEqual({
        constituents: [3, 4, 5],
        discarded: [1],
      });
    });
    test('1,3,4,5', () => {
      mockedRollDice.mockReturnValueOnce([1, 3, 4, 5]);
      expect(rollStandardScore()).toEqual({
        constituents: [3, 4, 5],
        discarded: [1],
      });
    });
  });

  describe('rollClassicScore()', () => {
    test('all combinations', () => {
      const _3to9 = range(3, 9 + 1);
      const allCombinations = cartesian(_3to9, _3to9, _3to9);
      for (const [dice1, dice2, dice3] of allCombinations) {
        mockedRollDice.mockReturnValueOnce([dice1, dice2, dice3]);
        expect(rollClassicScore()).toEqual({
          constituents: [dice1, dice2, dice3],
          discarded: [],
        });
      }
    });
  });

  describe('rollAugmentedScore()', () => {
    test('all combinations', () => {
      const _3to9 = range(3, 9 + 1);
      const allCombinations = cartesian(_3to9, _3to9);
      for (const [dice1, dice2] of allCombinations) {
        mockedRollDice.mockReturnValue([dice1, dice2]);
        expect(rollAugmentedScore()).toEqual({
          constituents: [6, dice1, dice2],
          discarded: [],
        });
      }
    });
  });
});

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
