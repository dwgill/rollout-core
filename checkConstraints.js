import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import sum from 'lodash/fp/sum';
import calculateModifier from './calculateModifier';
import * as ConstraintKinds from './ConstraintKinds';
import * as rollAttributes from './rollAttributes';

/**
 * @typedef {function(rollAttributes.Rollout): boolean} ConstraintPredicate
 */

/**
 * @param {rollAttributes.Rollout} rollout
 * @returns {number[]} The scores of the rollout
 */
export const getScoresOfRollout = flow(map('constituents'), map(sum));

/**
 * @param {rollAttributes.Rollout} rollout
 * @returns {number} The modifiers of the scores of the rollout, added together
 */
export const getNetModForRollout = flow(
  getScoresOfRollout,
  map(calculateModifier),
  sum,
);

/**
 * @param {rollAttributes.Rollout} rollout
 * @returns {number} The scores of the rollout, added together
 */
export const getNetScoreForRollout = flow(getScoresOfRollout, sum);

/**
 * @param {ConstraintKinds.NetModConstraintType} netModConstraint
 * @returns {ConstraintPredicate} A predicate which evaluates a rollout
 * according to the provided constraint.
 */
function makePredicateForNetModConstraint(netModConstraint) {
  const { limit, value } = netModConstraint;
  if (limit === ConstraintKinds.AT_LEAST) {
    return rollout => getNetModForRollout(rollout) >= value;
  } else if (limit === ConstraintKinds.AT_MOST) {
    return rollout => getNetModForRollout(rollout) <= value;
  } else {
    return rollout => getNetModForRollout(rollout) === value;
  }
}

/**
 * @param {ConstraintKinds.NetScoreConstraintType} netScoreConstraint
 * @returns {ConstraintPredicate} A predicate which evaluates a rollout
 * according to the provided constraint.
 */
function makePredicateForNetScoreConstraint(netScoreConstraint) {
  const { limit, value } = netScoreConstraint;
  if (limit === ConstraintKinds.AT_LEAST) {
    return rollout => getNetScoreForRollout(rollout) >= value;
  } else if (limit === ConstraintKinds.AT_MOST) {
    return rollout => getNetScoreForRollout(rollout) <= value;
  } else {
    return rollout => getNetScoreForRollout(rollout) === value;
  }
}

/**
 * @param {ConstraintKinds.ScoreConstraintType} scoreConstraint
 * @returns {ConstraintPredicate} A predicate which evaluates a rollout
 * according to the provided constraint.
 */
function makePredicateForScoreConstraint(scoreConstraint) {
  const { numScores, numScoresLimit, score, scoreLimit } = scoreConstraint;
  /** @type function(number): boolean */
  let filterRelevantScores;
  if (scoreLimit === ConstraintKinds.AT_LEAST) {
    filterRelevantScores = filter(attrVal => attrVal >= score);
  } else if (scoreLimit === ConstraintKinds.AT_MOST) {
    filterRelevantScores = filter(attrVal => attrVal <= score);
  } else {
    filterRelevantScores = filter(attrVal => attrVal === score);
  }

  if (numScoresLimit === ConstraintKinds.AT_LEAST) {
    return flow(
      getScoresOfRollout,
      filterRelevantScores,
      scores => scores.length >= numScores,
    );
  } else if (numScoresLimit === ConstraintKinds.AT_MOST) {
    return flow(
      getScoresOfRollout,
      filterRelevantScores,
      scores => scores.length <= numScores,
    );
  } else {
    return flow(
      getScoresOfRollout,
      filterRelevantScores,
      scores => scores.length === numScores,
    );
  }
}

const dispatchMakePredicateForConstraint = {
  [ConstraintKinds.NET_MOD_CONSTRAINT]: makePredicateForNetModConstraint,
  [ConstraintKinds.NET_SCORE_CONSTRAINT]: makePredicateForNetScoreConstraint,
  [ConstraintKinds.SCORE_CONSTRAINT]: makePredicateForScoreConstraint,
};

/**
 * @param {ConstraintKinds.NetModConstraintType | ConstraintKinds.NetScoreConstraintType | ConstraintKinds.ScoreConstraintType} constraint
 * @returns {ConstraintPredicate}
 */
export function makePredicateForConstraint(constraint) {
  console.log('constraint', constraint)
  return dispatchMakePredicateForConstraint[constraint.kind](constraint);
}

/**
 * Consolidate one or more constraints into a predicate which determines if a
 * rollout satisfies _all_ of the specified constraints.
 * @param {... ConstraintKinds.NetModConstraintType | ConstraintKinds.NetScoreConstraintType | ConstraintKinds.ScoreConstraintType} constraints
 * @returns {ConstraintPredicate}
 */
export function makePredicateForAllConstraints(...constraints) {
  const predicates = constraints.map(makePredicateForConstraint);
  return rollout => predicates.every(predicate => predicate(rollout));
}

/**
 * Consolidate one or more constraints into a predicate which determines if a
 * rollout satisfies _any_ of the specified constraints.
 * @param {... ConstraintKinds.NetModConstraintType | ConstraintKinds.NetScoreConstraintType | ConstraintKinds.ScoreConstraintType} constraints
 * @returns {ConstraintPredicate}
 */
export function makePredicateForAnyConstraint(...constraints) {
  const predicates = constraints.map(makePredicateForConstraint);
  return rollout => predicates.some(predicate => predicate(rollout));
}
