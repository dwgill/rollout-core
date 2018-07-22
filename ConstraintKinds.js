/** Require a number of scores to fall below or above a certain number. */
export const SCORE_CONSTRAINT = 'SCORE_CONSTRAINT';
/** Require the sum total of all the ability modifiers to be above or below a certain number. */
export const NET_MOD_CONSTRAINT = 'NET_MOD_CONSTRAINT';
/** Require the sum total of the scores to be above or below a given number. */
export const NET_SCORE_CONSTRAINT = 'NET_SCORE_CONSTRAINT';

export const AT_LEAST = 'AT_LEAST';
export const AT_MOST = 'AT_MOST';
export const EXACTLY = 'EXACTLY';

/**
 * @typedef {object} ScoreConstraintType
 * @prop {SCORE_CONSTRAINT} kind
 * @prop {AT_LEAST | AT_MOST | EXEACTLY} numScoresLimit
 * @prop {number} numScores
 * @prop {AT_LEAST | AT_MOST | EXEACTLY} scoreLimit
 * @prop {number} score
 */

/**
 * Create a Score Constraint.
 * @param {AT_LEAST | AT_MOST | EXEACTLY} numScoresLimit Is it a ceiling? A floor? on the number of scores
 * @param {number} numScores Number of scores to require
 * @param {AT_LEAST | AT_MOST | EXEACTLY} scoreLimit Is it a ceiling? A floor? on the score itself
 * @param {number} score The value of the score to test: 3 <= score <= 18
 * @return {ScoreConstraintType} An object representing this score requirement
 * @example ScoreConstraint('AT_LEAST', 2, 'AT_LEAST', 15) => Colville classic requirement
 */
export const ScoreConstraint = (
  numScoresLimit,
  numScores,
  scoreLimit,
  score,
) => ({
  kind: SCORE_CONSTRAINT,
  numScoresLimit,
  numScores,
  scoreLimit,
  score,
});

/**
 * @typedef {object} NetModConstraintType
 * @prop {NET_MOD_CONSTRAINT} kind
 * @prop {AT_LEAST | AT_MOST | EXEACTLY} limit
 * @prop {number} value
 */

/**
 * Create a Net Modifier Constraint.
 * @param {AT_LEAST | AT_MOST | EXEACTLY} limit Is it a ceiling? A floor? etc.
 * @param {number} value The net attribute modifier
 * @return {NetModConstraintType} An object representing this score requirement
 * @example NetModConstraint("AT_LEAST", 2) => Colville neo requirement
 */
export const NetModConstraint = (limit, value) => ({
  kind: NET_MOD_CONSTRAINT,
  limit,
  value,
});

/**
 * @typedef {object} NetScoreConstraintType
 * @prop {NET_SCORE_CONSTRAINT} kind
 * @prop {AT_LEAST | AT_MOST | EXEACTLY} limit
 * @prop {number} value
 */

/**
 * Create a new Net Score Constraint.
 * @param {AT_LEAST | AT_MOST | EXEACTLY} limit Is it a ceiling? A floor? etc.
 * @param {number} value
 * @return {NetScoreConstraintType} An object representing this score requirement
 * @example NetScoreConstraint("AT_LEAST", 70) => Matt Mercer requirement
 */
export const NetScoreConstraint = (limit, value) => ({
  kind: NET_SCORE_CONSTRAINT,
  limit,
  value,
});
