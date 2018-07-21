import * as Constraints from './ConstraintKinds';

const nbs_str = String.fromCharCode(160); // non-breaking space

/**
 * Replace all spaces in a string with non-breaking spaces
 * @param {string} str The string to replace all spaces with non-breaking spaces
 * @return {string} the same string, but all spaces are non-breaking
 */
const nbs = str => str.replace(/ /g, nbs_str);

const limitStrs = {
  [Constraints.EXACTLY]: 'exactly',
  [Constraints.AT_LEAST]: nbs('at least'),
  [Constraints.AT_MOST]: nbs('at most'),
};

const scoreLimitStrs = {
  [Constraints.EXACTLY]: 'exactly',
  [Constraints.AT_LEAST]: nbs('or more'),
  [Constraints.AT_MOST]: nbs('or less'),
};

/**
 * Display a NetModConstraint as a readable string.
 * @param {Constraints.NetModConstraintType} netModConstraint
 * @return {string} A readable string of the constraint
 */
const displayNetModConstraint = netModConstraint => {
  const { limit, value } = netModConstraint;
  const limitStr = limitStrs[limit];
  const constraintStr = nbs(`${limitStr} ${value}`);
  return `sum of all mods equal ${constraintStr}`;
};

/**
 * Display a NetScoreConstraint as a readable string.
 * @param {Constraints.NetScoreConstraintType} netScoreConstraint
 * @return {string} A readable string of the constraint
 */
const displayNetScoreConstraint = netScoreConstraint => {
  const { limit, value } = netScoreConstraint;
  const limitStr = limitStrs[limit];
  const constraintStr = nbs(`${limitStr} ${value}`);
  return `sum of all scores equal ${constraintStr}`;
};

/**
 * Display a ScoreConstraint as a readable string.
 * @param {Constraints.ScoreConstraintType} scoreConstraint 
 * @return {string} A readable string of the constraint
 */
const displayScoreConstraint = scoreConstraint => {
    const { numScoresLimit, numScores, scoreLimit, score } = scoreConstraint;
    const numScoresLimitStr = limitStrs[numScoresLimit];
    const scoreLimitStr = scoreLimitStrs[scoreLimit];
    const numScoresStr = numScores === 1 ? (
        nbs('1 score')
    ) : (
        nbs(`${numScores} scores`)
    );

    return `${numScoresLimitStr} ${numScoresStr} ${score} ${scoreLimitStr}`;
}

const dispatchDisplayFunctions = {
    [Constraints.NET_MOD_CONSTRAINT]: displayNetModConstraint,
    [Constraints.NET_SCORE_CONSTRAINT]: displayNetScoreConstraint,
    [Constraints.SCORE_CONSTRAINT]: displayScoreConstraint,
};

/**
 * Display a Constraint as a readable string, according to its kind
 * @param {Constraints.NetModConstraintType | Constraints.NetScoreConstraintType | Constraints.ScoreConstraintType} constraint 
 * @return {string} A string representing the Constraint
 */
const displayConstraint = constraint => {
    return dispatchDisplayFunctions[constraint.kind](constraint);
}

export default displayConstraint;