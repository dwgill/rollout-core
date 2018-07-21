import range from 'lodash/fp/range';
import {
  AT_LEAST,
  AT_MOST,
  EXACTLY,
  NetModConstraint,
  NetScoreConstraint,
  NET_MOD_CONSTRAINT,
  NET_SCORE_CONSTRAINT,
  ScoreConstraint,
  SCORE_CONSTRAINT,
} from './ConstraintKinds';

describe('ConstraintKinds', () => {
  describe('ScoreConstraint', () => {
    it('outputs the appropriate shape', () => {
      const limits = [AT_LEAST, AT_MOST, EXACTLY];
      const scores = range(3, 19);
      const numScores = range(0, 7);
      const combinations = cartesian(limits, numScores, limits, scores);
      for (const combination of combinations) {
        const [numScoresLimit, numScores, scoreLimit, score] = combination;
        const constraint = ScoreConstraint(
          numScoresLimit,
          numScores,
          scoreLimit,
          score,
        );
        expect(constraint).toEqual({
          kind: SCORE_CONSTRAINT,
          numScoresLimit,
          numScores,
          scoreLimit,
          score,
        });
      }
    });
  });

  describe('NetScoreConstraint', () => {
    it('outputs the appropriate shape', () => {
      const limits = [AT_LEAST, AT_MOST, EXACTLY];
      const possibleTotals = range(3 * 6, 18 * 6 + 1);
      const combinations = cartesian(limits, possibleTotals);
      for (const [limit, scoresTotal] of combinations) {
        const constraint = NetScoreConstraint(limit, scoresTotal);
        expect(constraint).toEqual({
          kind: NET_SCORE_CONSTRAINT,
          limit,
          value: scoresTotal,
        });
      }
    });
  });

  describe('NetModConstraint', () => {
    it('outputs the appropriate shape', () => {
      const limits = [AT_LEAST, AT_MOST, EXACTLY];
      const possibleNetMods = range(-4 * 6, 4 * 6 + 1);
      const combinations = cartesian(limits, possibleNetMods);
      for (const [limit, netMod] of combinations) {
        const constraint = NetModConstraint(limit, netMod);
        expect(constraint).toEqual({
          kind: NET_MOD_CONSTRAINT,
          limit,
          value: netMod,
        });
      }
    });
  });
});

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
