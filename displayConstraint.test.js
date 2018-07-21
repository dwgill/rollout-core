import {
  NetModConstraint,
  NetScoreConstraint,
  ScoreConstraint,
  AT_MOST,
  AT_LEAST,
  EXACTLY,
} from './ConstraintKinds';
import displayConstraint from './displayConstraint';

const nbs_str = new RegExp(String.fromCharCode(160), 'g'); // non-breaking space
const space = str => str.replace(nbs_str, ' ');

describe('displayConstraints', () => {
  it('NetModConstraint', () => {
    // prettier-ignore
    const constraints = [
      [NetModConstraint(AT_MOST, 2), 'sum of all mods equal at most 2'],
      [NetModConstraint(AT_MOST, -2), 'sum of all mods equal at most -2'],
      [NetModConstraint(AT_MOST, -4), 'sum of all mods equal at most -4'],
      [NetModConstraint(AT_MOST, 4), 'sum of all mods equal at most 4'],
      [NetModConstraint(AT_MOST, 0), 'sum of all mods equal at most 0'],
      [NetModConstraint(AT_LEAST, 2), 'sum of all mods equal at least 2'],
      [NetModConstraint(AT_LEAST, -2), 'sum of all mods equal at least -2'],
      [NetModConstraint(AT_LEAST, -4), 'sum of all mods equal at least -4'],
      [NetModConstraint(AT_LEAST, 4), 'sum of all mods equal at least 4'],
      [NetModConstraint(AT_LEAST, 0), 'sum of all mods equal at least 0'],
      [NetModConstraint(EXACTLY, 2), 'sum of all mods equal exactly 2'],
      [NetModConstraint(EXACTLY, -2), 'sum of all mods equal exactly -2'],
      [NetModConstraint(EXACTLY, -4), 'sum of all mods equal exactly -4'],
      [NetModConstraint(EXACTLY, 4), 'sum of all mods equal exactly 4'],
      [NetModConstraint(EXACTLY, 0), 'sum of all mods equal exactly 0'],
    ];

    for (const [constraint, expectedStr] of constraints) {
      expect(space(displayConstraint(constraint))).toEqual(expectedStr);
    }
  });

  it('NetScoreConstraint', () => {
    // prettier-ignore
    const constraints = [
      [NetScoreConstraint(AT_MOST, 70), 'sum of all scores equal at most 70'],
      [NetScoreConstraint(AT_MOST, 65), 'sum of all scores equal at most 65'],
      [NetScoreConstraint(AT_MOST, 75), 'sum of all scores equal at most 75'],
      [NetScoreConstraint(AT_LEAST, 70), 'sum of all scores equal at least 70'],
      [NetScoreConstraint(AT_LEAST, 65), 'sum of all scores equal at least 65'],
      [NetScoreConstraint(AT_LEAST, 75), 'sum of all scores equal at least 75'],
      [NetScoreConstraint(EXACTLY, 70), 'sum of all scores equal exactly 70'],
      [NetScoreConstraint(EXACTLY, 65), 'sum of all scores equal exactly 65'],
      [NetScoreConstraint(EXACTLY, 75), 'sum of all scores equal exactly 75'],
    ];

    for (const [constraint, expectedStr] of constraints) {
      expect(space(displayConstraint(constraint))).toEqual(expectedStr);
    }
  });

  it('ScoreConstraint', () => {
    // prettier-ignore
    const constraints = [
      [ScoreConstraint(AT_MOST, 2, AT_MOST, 16), 'at most 2 scores 16 or less'],
      [ScoreConstraint(AT_MOST, 2, AT_MOST, 10), 'at most 2 scores 10 or less'],
      [ScoreConstraint(AT_MOST, 2, AT_MOST, 8), 'at most 2 scores 8 or less'],
      [ScoreConstraint(AT_MOST, 3, AT_MOST, 16), 'at most 3 scores 16 or less'],
      [ScoreConstraint(AT_MOST, 3, AT_MOST, 10), 'at most 3 scores 10 or less'],
      [ScoreConstraint(AT_MOST, 3, AT_MOST, 8), 'at most 3 scores 8 or less'],
      [ScoreConstraint(AT_MOST, 1, AT_MOST, 16), 'at most 1 score 16 or less'],
      [ScoreConstraint(AT_MOST, 1, AT_MOST, 10), 'at most 1 score 10 or less'],
      [ScoreConstraint(AT_MOST, 1, AT_MOST, 8), 'at most 1 score 8 or less'],
      
      [ScoreConstraint(AT_LEAST, 2, AT_MOST, 16), 'at least 2 scores 16 or less'],
      [ScoreConstraint(AT_LEAST, 2, AT_MOST, 10), 'at least 2 scores 10 or less'],
      [ScoreConstraint(AT_LEAST, 2, AT_MOST, 8), 'at least 2 scores 8 or less'],
      [ScoreConstraint(AT_LEAST, 3, AT_MOST, 16), 'at least 3 scores 16 or less'],
      [ScoreConstraint(AT_LEAST, 3, AT_MOST, 10), 'at least 3 scores 10 or less'],
      [ScoreConstraint(AT_LEAST, 3, AT_MOST, 8), 'at least 3 scores 8 or less'],
      [ScoreConstraint(AT_LEAST, 1, AT_MOST, 16), 'at least 1 score 16 or less'],
      [ScoreConstraint(AT_LEAST, 1, AT_MOST, 10), 'at least 1 score 10 or less'],
      [ScoreConstraint(AT_LEAST, 1, AT_MOST, 8), 'at least 1 score 8 or less'],
      
      [ScoreConstraint(EXACTLY, 2, AT_MOST, 16), 'exactly 2 scores 16 or less'],
      [ScoreConstraint(EXACTLY, 2, AT_MOST, 10), 'exactly 2 scores 10 or less'],
      [ScoreConstraint(EXACTLY, 2, AT_MOST, 8), 'exactly 2 scores 8 or less'],
      [ScoreConstraint(EXACTLY, 3, AT_MOST, 16), 'exactly 3 scores 16 or less'],
      [ScoreConstraint(EXACTLY, 3, AT_MOST, 10), 'exactly 3 scores 10 or less'],
      [ScoreConstraint(EXACTLY, 3, AT_MOST, 8), 'exactly 3 scores 8 or less'],
      [ScoreConstraint(EXACTLY, 1, AT_MOST, 16), 'exactly 1 score 16 or less'],
      [ScoreConstraint(EXACTLY, 1, AT_MOST, 10), 'exactly 1 score 10 or less'],
      [ScoreConstraint(EXACTLY, 1, AT_MOST, 8), 'exactly 1 score 8 or less'],
      
      
      [ScoreConstraint(AT_MOST, 2, AT_LEAST, 16), 'at most 2 scores 16 or more'],
      [ScoreConstraint(AT_MOST, 2, AT_LEAST, 10), 'at most 2 scores 10 or more'],
      [ScoreConstraint(AT_MOST, 2, AT_LEAST, 8), 'at most 2 scores 8 or more'],
      [ScoreConstraint(AT_MOST, 3, AT_LEAST, 16), 'at most 3 scores 16 or more'],
      [ScoreConstraint(AT_MOST, 3, AT_LEAST, 10), 'at most 3 scores 10 or more'],
      [ScoreConstraint(AT_MOST, 3, AT_LEAST, 8), 'at most 3 scores 8 or more'],
      [ScoreConstraint(AT_MOST, 1, AT_LEAST, 16), 'at most 1 score 16 or more'],
      [ScoreConstraint(AT_MOST, 1, AT_LEAST, 10), 'at most 1 score 10 or more'],
      [ScoreConstraint(AT_MOST, 1, AT_LEAST, 8), 'at most 1 score 8 or more'],

      [ScoreConstraint(AT_LEAST, 2, AT_LEAST, 16), 'at least 2 scores 16 or more'],
      [ScoreConstraint(AT_LEAST, 2, AT_LEAST, 10), 'at least 2 scores 10 or more'],
      [ScoreConstraint(AT_LEAST, 2, AT_LEAST, 8), 'at least 2 scores 8 or more'],
      [ScoreConstraint(AT_LEAST, 3, AT_LEAST, 16), 'at least 3 scores 16 or more'],
      [ScoreConstraint(AT_LEAST, 3, AT_LEAST, 10), 'at least 3 scores 10 or more'],
      [ScoreConstraint(AT_LEAST, 3, AT_LEAST, 8), 'at least 3 scores 8 or more'],
      [ScoreConstraint(AT_LEAST, 1, AT_LEAST, 16), 'at least 1 score 16 or more'],
      [ScoreConstraint(AT_LEAST, 1, AT_LEAST, 10), 'at least 1 score 10 or more'],
      [ScoreConstraint(AT_LEAST, 1, AT_LEAST, 8), 'at least 1 score 8 or more'],

      [ScoreConstraint(EXACTLY, 2, AT_LEAST, 16), 'exactly 2 scores 16 or more'],
      [ScoreConstraint(EXACTLY, 2, AT_LEAST, 10), 'exactly 2 scores 10 or more'],
      [ScoreConstraint(EXACTLY, 2, AT_LEAST, 8), 'exactly 2 scores 8 or more'],
      [ScoreConstraint(EXACTLY, 3, AT_LEAST, 16), 'exactly 3 scores 16 or more'],
      [ScoreConstraint(EXACTLY, 3, AT_LEAST, 10), 'exactly 3 scores 10 or more'],
      [ScoreConstraint(EXACTLY, 3, AT_LEAST, 8), 'exactly 3 scores 8 or more'],
      [ScoreConstraint(EXACTLY, 1, AT_LEAST, 16), 'exactly 1 score 16 or more'],
      [ScoreConstraint(EXACTLY, 1, AT_LEAST, 10), 'exactly 1 score 10 or more'],
      [ScoreConstraint(EXACTLY, 1, AT_LEAST, 8), 'exactly 1 score 8 or more'],
      
      
      [ScoreConstraint(AT_MOST, 2, EXACTLY, 16), 'at most 2 scores 16 exactly'],
      [ScoreConstraint(AT_MOST, 2, EXACTLY, 10), 'at most 2 scores 10 exactly'],
      [ScoreConstraint(AT_MOST, 2, EXACTLY, 8), 'at most 2 scores 8 exactly'],
      [ScoreConstraint(AT_MOST, 3, EXACTLY, 16), 'at most 3 scores 16 exactly'],
      [ScoreConstraint(AT_MOST, 3, EXACTLY, 10), 'at most 3 scores 10 exactly'],
      [ScoreConstraint(AT_MOST, 3, EXACTLY, 8), 'at most 3 scores 8 exactly'],
      [ScoreConstraint(AT_MOST, 1, EXACTLY, 16), 'at most 1 score 16 exactly'],
      [ScoreConstraint(AT_MOST, 1, EXACTLY, 10), 'at most 1 score 10 exactly'],
      [ScoreConstraint(AT_MOST, 1, EXACTLY, 8), 'at most 1 score 8 exactly'],

      [ScoreConstraint(AT_LEAST, 2, EXACTLY, 16), 'at least 2 scores 16 exactly'],
      [ScoreConstraint(AT_LEAST, 2, EXACTLY, 10), 'at least 2 scores 10 exactly'],
      [ScoreConstraint(AT_LEAST, 2, EXACTLY, 8), 'at least 2 scores 8 exactly'],
      [ScoreConstraint(AT_LEAST, 3, EXACTLY, 16), 'at least 3 scores 16 exactly'],
      [ScoreConstraint(AT_LEAST, 3, EXACTLY, 10), 'at least 3 scores 10 exactly'],
      [ScoreConstraint(AT_LEAST, 3, EXACTLY, 8), 'at least 3 scores 8 exactly'],
      [ScoreConstraint(AT_LEAST, 1, EXACTLY, 16), 'at least 1 score 16 exactly'],
      [ScoreConstraint(AT_LEAST, 1, EXACTLY, 10), 'at least 1 score 10 exactly'],
      [ScoreConstraint(AT_LEAST, 1, EXACTLY, 8), 'at least 1 score 8 exactly'],

      [ScoreConstraint(EXACTLY, 2, EXACTLY, 16), 'exactly 2 scores 16 exactly'],
      [ScoreConstraint(EXACTLY, 2, EXACTLY, 10), 'exactly 2 scores 10 exactly'],
      [ScoreConstraint(EXACTLY, 2, EXACTLY, 8), 'exactly 2 scores 8 exactly'],
      [ScoreConstraint(EXACTLY, 3, EXACTLY, 16), 'exactly 3 scores 16 exactly'],
      [ScoreConstraint(EXACTLY, 3, EXACTLY, 10), 'exactly 3 scores 10 exactly'],
      [ScoreConstraint(EXACTLY, 3, EXACTLY, 8), 'exactly 3 scores 8 exactly'],
      [ScoreConstraint(EXACTLY, 1, EXACTLY, 16), 'exactly 1 score 16 exactly'],
      [ScoreConstraint(EXACTLY, 1, EXACTLY, 10), 'exactly 1 score 10 exactly'],
      [ScoreConstraint(EXACTLY, 1, EXACTLY, 8), 'exactly 1 score 8 exactly'],
    ];

    for (const [constraint, expectedStr] of constraints) {
      expect(space(displayConstraint(constraint))).toEqual(expectedStr);
    }
  });
});
