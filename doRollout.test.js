import doRollout from './doRollout';
import { ScoreConstraint, AT_LEAST, NetModConstraint, NetScoreConstraint, AT_MOST } from './ConstraintKinds';
import { STANDARD } from './AttributeRollKinds';
import { getScoresOfRollout, getNetModForRollout, getNetScoreForRollout } from './checkConstraints';

describe('doRollout', () => {
  it('handles the Colville Classic', () => {
    const constraint = ScoreConstraint(AT_LEAST, 2, AT_LEAST, 15);
    const { rollout, numRolls } = doRollout({
      constraints: [constraint],
      attributeRoll: STANDARD,
      tolerance: 500,
    });
    const scores = getScoresOfRollout(rollout);

    expect(numRolls).toBeLessThanOrEqual(500);
    expect(scores.filter(score => score >= 15).length).toBeGreaterThanOrEqual(2);
  });

  it('handles the Neo Colville', () => {
    const constraint = NetModConstraint(AT_LEAST, 2);
    const { numRolls, rollout } = doRollout({
      constraints: [constraint],
      attributeRoll: STANDARD,
    });

    expect(numRolls).toBeLessThanOrEqual(500);
    expect(getNetModForRollout(rollout)).toBeGreaterThanOrEqual(2);
  });

  it('handles the Mercer', () => {
    const constraint = NetScoreConstraint(AT_LEAST, 70);
    const { numRolls, rollout } = doRollout({
      constraints: [constraint],
      attributeRoll: STANDARD,
      tolerance: 250,
    });

    expect(numRolls).toBeLessThanOrEqual(250);
    expect(getNetScoreForRollout(rollout)).toBeGreaterThanOrEqual(70);
  });

  it('handles the Mercer+', () => {
    const constraint = NetScoreConstraint(AT_LEAST, 75);
    const { numRolls, rollout } = doRollout({
      constraints: [constraint],
      attributeRoll: STANDARD,
      tolerance: 250,
    });

    expect(numRolls).toBeLessThanOrEqual(250);
    expect(getNetScoreForRollout(rollout)).toBeGreaterThanOrEqual(75);
  });

  it('returns nothing when given implausible constraints', () => {
    const constraint = ScoreConstraint(AT_MOST, 0, AT_LEAST, 3);
    const { numRolls, rollout } = doRollout({
      constraints: [constraint],
      attributeRoll: STANDARD,
    });

    expect(numRolls).toBeGreaterThan(500);
    expect(rollout).toBeNull();
  });
});