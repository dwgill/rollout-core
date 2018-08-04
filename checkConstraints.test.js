import times from 'lodash/fp/times';
import {
  getNetModForRollout,
  getNetScoreForRollout,
  getScoresOfRollout,
  makePredicateForAllConstraints,
  makePredicateForAnyConstraint,
  makePredicateForConstraint,
} from './checkConstraints';
import {
  AT_LEAST,
  AT_MOST,
  EXACTLY,
  NetModConstraint,
  NetScoreConstraint,
  ScoreConstraint,
} from './ConstraintKinds';
import {
  rollAugmentedScore,
  rollClassicScore,
  rollStandardScore,
} from './rollAttributes';

/** Mimics a standard attribute score roll */
const mockRollout1 = {
  rollout: [
    { constituents: [3, 3, 3], discarded: [1] },
    { constituents: [4, 5, 6], discarded: [3] },
    { constituents: [3, 5, 5], discarded: [2] },
    { constituents: [6, 4, 6], discarded: [1] },
    { constituents: [2, 2, 4], discarded: [2] },
    { constituents: [6, 6, 6], discarded: [5] },
  ],
  scores: [9, 15, 13, 16, 8, 18],
  sumOfScores: 79,
  sumOfModifiers: 8,
};

/** Mimics a classic attribute score roll */
const mockRollout2 = {
  rollout: [
    { constituents: [6, 5, 1], discarded: [] },
    { constituents: [6, 6, 4], discarded: [] },
    { constituents: [1, 6, 1], discarded: [] },
    { constituents: [3, 3, 2], discarded: [] },
    { constituents: [4, 3, 2], discarded: [] },
    { constituents: [2, 5, 3], discarded: [] },
  ],
  scores: [12, 16, 8, 8, 9, 10],
  sumOfScores: 63,
  sumOfModifiers: 1,
};

/** Mimics an augmented attribute score roll */
const mockRollout3 = {
  rollout: [
    { constituents: [6, 2, 5], discarded: [] },
    { constituents: [6, 1, 6], discarded: [] },
    { constituents: [6, 3, 2], discarded: [] },
    { constituents: [6, 5, 2], discarded: [] },
    { constituents: [6, 1, 6], discarded: [] },
    { constituents: [6, 1, 1], discarded: [] },
  ],
  scores: [13, 13, 11, 13, 13, 8],
  sumOfScores: 71,
  sumOfModifiers: 3,
};

describe('checkConstraints', () => {
  describe('getScoresOfRollout', () => {
    it('sums the constituents', () => {
      for (const { rollout, scores } of [mockRollout2, mockRollout3]) {
        expect(getScoresOfRollout(rollout)).toEqual(scores);
      }
    });
    it('sums the constituents, ignoring the discarded', () => {
      const { rollout, scores } = mockRollout1;
      expect(getScoresOfRollout(rollout)).toEqual(scores);
    });
  });

  describe('getNetModForRollout', () => {
    it('adds all the modifiers together', () => {
      for (const { rollout, sumOfModifiers } of [
        mockRollout1,
        mockRollout2,
        mockRollout3,
      ]) {
        expect(getNetModForRollout(rollout)).toEqual(sumOfModifiers);
      }
    });
  });

  describe('getNetScoreForRollout', () => {
    it('adds all the scores together', () => {
      for (const { rollout, sumOfScores } of [
        mockRollout1,
        mockRollout2,
        mockRollout3,
      ]) {
        expect(getNetScoreForRollout(rollout)).toEqual(sumOfScores);
      }
    });
  });

  describe('makePredicateForConstraint', () => {
    describe('handles NetModConstraint', () => {
      it('with limit AT_LEAST', () => {
        const constraint = NetModConstraint(AT_LEAST, 2);
        const predicate = makePredicateForConstraint(constraint);
        expect(predicate(mockRollout1.rollout)).toBeTruthy();
        expect(predicate(mockRollout2.rollout)).toBeFalsy();
        expect(predicate(mockRollout3.rollout)).toBeTruthy();
      });

      it('with limit AT_MOST', () => {
        const constraint = NetModConstraint(AT_MOST, 4);
        const predicate = makePredicateForConstraint(constraint);
        expect(predicate(mockRollout1.rollout)).toBeFalsy();
        expect(predicate(mockRollout2.rollout)).toBeTruthy();
        expect(predicate(mockRollout3.rollout)).toBeTruthy();
      });

      it('with limit EXACTLY', () => {
        const constraint = NetModConstraint(EXACTLY, 3);
        const predicate = makePredicateForConstraint(constraint);
        expect(predicate(mockRollout1.rollout)).toBeFalsy();
        expect(predicate(mockRollout2.rollout)).toBeFalsy();
        expect(predicate(mockRollout3.rollout)).toBeTruthy();
      });
    });

    describe('handles NetScoreConstraint', () => {
      it('with limit AT_LEAST', () => {
        const constraint = NetScoreConstraint(AT_LEAST, 70);
        const predicate = makePredicateForConstraint(constraint);
        expect(predicate(mockRollout1.rollout)).toBeTruthy();
        expect(predicate(mockRollout2.rollout)).toBeFalsy();
        expect(predicate(mockRollout3.rollout)).toBeTruthy();
      });

      it('with limit AT_MOST', () => {
        const constraint = NetScoreConstraint(AT_MOST, 75);
        const predicate = makePredicateForConstraint(constraint);
        expect(predicate(mockRollout1.rollout)).toBeFalsy();
        expect(predicate(mockRollout2.rollout)).toBeTruthy();
        expect(predicate(mockRollout3.rollout)).toBeTruthy();
      });

      it('with limit EXACTLY', () => {
        const constraint = NetScoreConstraint(EXACTLY, 71);
        const predicate = makePredicateForConstraint(constraint);
        expect(predicate(mockRollout1.rollout)).toBeFalsy();
        expect(predicate(mockRollout2.rollout)).toBeFalsy();
        expect(predicate(mockRollout3.rollout)).toBeTruthy();
      });
    });

    describe('handles ScoreConstraint', () => {
      describe('with numScoresLimit AT_LEAST', () => {
        it('and scoreLimit AT_LEAST', () => {
          const constraint = ScoreConstraint(AT_LEAST, 2, AT_LEAST, 13);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeTruthy();
          expect(predicate(mockRollout2.rollout)).toBeFalsy();
          expect(predicate(mockRollout3.rollout)).toBeTruthy();
        });
        it('and scoreLimit AT_MOST', () => {
          const constraint = ScoreConstraint(AT_LEAST, 4, AT_MOST, 13);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeFalsy();
          expect(predicate(mockRollout2.rollout)).toBeTruthy();
          expect(predicate(mockRollout3.rollout)).toBeTruthy();
        });
        it('and scoreLimit EXACTLY', () => {
          const constraint = ScoreConstraint(AT_LEAST, 3, EXACTLY, 13);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeFalsy();
          expect(predicate(mockRollout2.rollout)).toBeFalsy();
          expect(predicate(mockRollout3.rollout)).toBeTruthy();
        });
      });
      describe('with numScoresLimit AT_MOST', () => {
        it('and scoreLimit AT_LEAST', () => {
          const constraint = ScoreConstraint(AT_MOST, 1, AT_LEAST, 15);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeFalsy();
          expect(predicate(mockRollout2.rollout)).toBeTruthy();
          expect(predicate(mockRollout3.rollout)).toBeTruthy();
        });
        it('and scoreLimit AT_MOST', () => {
          const constraint = ScoreConstraint(AT_MOST, 3, AT_MOST, 12);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeTruthy();
          expect(predicate(mockRollout2.rollout)).toBeFalsy();
          expect(predicate(mockRollout3.rollout)).toBeTruthy();
        });
        it('and scoreLimit EXACTLY', () => {
          const constraint = ScoreConstraint(AT_MOST, 0, EXACTLY, 16);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeFalsy();
          expect(predicate(mockRollout2.rollout)).toBeFalsy();
          expect(predicate(mockRollout3.rollout)).toBeTruthy();
        });
      });
      describe('with numScoresLimit EXACTLY', () => {
        it('and scoreLimit AT_LEAST', () => {
          const constraint = ScoreConstraint(EXACTLY, 1, AT_LEAST, 15);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeFalsy();
          expect(predicate(mockRollout2.rollout)).toBeTruthy();
          expect(predicate(mockRollout3.rollout)).toBeFalsy();
        });
        it('and scoreLimit AT_MOST', () => {
          const constraint = ScoreConstraint(EXACTLY, 2, AT_MOST, 9);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeTruthy();
          expect(predicate(mockRollout2.rollout)).toBeFalsy();
          expect(predicate(mockRollout3.rollout)).toBeFalsy();
        });
        it('and scoreLimit EXACTLY', () => {
          const constraint = ScoreConstraint(EXACTLY, 1, EXACTLY, 8);
          const predicate = makePredicateForConstraint(constraint);
          expect(predicate(mockRollout1.rollout)).toBeTruthy();
          expect(predicate(mockRollout2.rollout)).toBeFalsy();
          expect(predicate(mockRollout3.rollout)).toBeTruthy();
        });
      });
    });
  });

  describe('makePredicateForAllConstraints', () => {
    const constraint1 = NetModConstraint(AT_LEAST, 3);
    const constraint2 = NetScoreConstraint(AT_MOST, 75);

    // rollout 1 & 3 satisfy constraint 1
    const predicate1 = makePredicateForConstraint(constraint1);
    expect(predicate1(mockRollout1.rollout)).toBeTruthy();
    expect(predicate1(mockRollout2.rollout)).toBeFalsy();
    expect(predicate1(mockRollout3.rollout)).toBeTruthy();

    // rollout 2 & 3 satisfy constraint 2
    const predicate2 = makePredicateForConstraint(constraint2);
    expect(predicate2(mockRollout1.rollout)).toBeFalsy();
    expect(predicate2(mockRollout2.rollout)).toBeTruthy();
    expect(predicate2(mockRollout3.rollout)).toBeTruthy();

    // Only rollout 3 satisfies both combined
    const predicate1And2 = makePredicateForAllConstraints(
      constraint1,
      constraint2,
    );
    expect(predicate1And2(mockRollout1.rollout)).toBeFalsy();
    expect(predicate1And2(mockRollout2.rollout)).toBeFalsy();
    expect(predicate1And2(mockRollout3.rollout)).toBeTruthy();
  });

  describe('makePredicateForAnyConstraint', () => {
    const constraint1 = NetModConstraint(AT_LEAST, 5);
    const constraint2 = NetScoreConstraint(AT_MOST, 70);

    // only rollout 1 satisfies constraint 1
    const predicate1 = makePredicateForConstraint(constraint1);
    expect(predicate1(mockRollout1.rollout)).toBeTruthy();
    expect(predicate1(mockRollout2.rollout)).toBeFalsy();
    expect(predicate1(mockRollout3.rollout)).toBeFalsy();

    // only rollout 2 satisfies constraint 2
    const predicate2 = makePredicateForConstraint(constraint2);
    expect(predicate2(mockRollout1.rollout)).toBeFalsy();
    expect(predicate2(mockRollout2.rollout)).toBeTruthy();
    expect(predicate2(mockRollout3.rollout)).toBeFalsy();

    // rollout 1 & 2 satisfies constraints 1 _or_ 2
    const predicate1And2 = makePredicateForAnyConstraint(
      constraint1,
      constraint2,
    );
    expect(predicate1And2(mockRollout1.rollout)).toBeTruthy();
    expect(predicate1And2(mockRollout2.rollout)).toBeTruthy();
    expect(predicate1And2(mockRollout3.rollout)).toBeFalsy();
  });
});

describe('checkConstraints integration', () => {
  describe('rollAttributes', () => {
    const constraintAllScores3OrMore = ScoreConstraint(
      AT_LEAST,
      6,
      AT_LEAST,
      3,
    );
    const constraintAllScores18OrUnder = ScoreConstraint(
      AT_LEAST,
      6,
      AT_MOST,
      18,
    );
    const constrantOneScore19 = ScoreConstraint(AT_LEAST, 1, EXACTLY, 19);
    const predicatetAllScores3OrMore = makePredicateForConstraint(
      constraintAllScores3OrMore,
    );
    const predicatetAllScores18OrUnder = makePredicateForConstraint(
      constraintAllScores18OrUnder,
    );
    const predicateOneScore19 = makePredicateForConstraint(constrantOneScore19);
    const predicateEvery = makePredicateForAllConstraints(
      constraintAllScores18OrUnder,
      constraintAllScores3OrMore,
      constrantOneScore19,
    );
    const predicateAny = makePredicateForAnyConstraint(
      constraintAllScores18OrUnder,
      constraintAllScores3OrMore,
      constrantOneScore19,
    );
    test('rollAugmentedScore', () => {
      const rollout = times(rollAugmentedScore, 6);
      expect(predicatetAllScores18OrUnder(rollout)).toBeTruthy();
      expect(predicatetAllScores3OrMore(rollout)).toBeTruthy();
      expect(predicateOneScore19(rollout)).toBeFalsy();
      expect(predicateEvery(rollout)).toBeFalsy();
      expect(predicateAny(rollout)).toBeTruthy();
    });
    test('rollClassicScore', () => {
      const rollout = times(rollClassicScore, 6);
      expect(predicatetAllScores18OrUnder(rollout)).toBeTruthy();
      expect(predicatetAllScores3OrMore(rollout)).toBeTruthy();
      expect(predicateOneScore19(rollout)).toBeFalsy();
      expect(predicateEvery(rollout)).toBeFalsy();
      expect(predicateAny(rollout)).toBeTruthy();
    });
    test('rollStandardScore', () => {
      const rollout = times(rollStandardScore, 6);
      expect(predicatetAllScores18OrUnder(rollout)).toBeTruthy();
      expect(predicatetAllScores3OrMore(rollout)).toBeTruthy();
      expect(predicateOneScore19(rollout)).toBeFalsy();
      expect(predicateEvery(rollout)).toBeFalsy();
      expect(predicateAny(rollout)).toBeTruthy();
    });
  });
});
