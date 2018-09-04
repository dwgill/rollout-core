import times from 'lodash/fp/times';
import * as AttributeRollKinds from './AttributeRollKinds';
import { makePredicateForAllConstraints } from './checkConstraints';
import * as ConstraintKinds from './ConstraintKinds';
import rollAttributes from './rollAttributes';

/** @typedef {ConstraintKinds.NetModConstraintType | ConstraintKinds.NetScoreConstraintType | ConstraintKinds.ScoreConstraintType} Constraint*/
/** @typedef {AttributeRollKinds.STANDARD | AttributeRollKinds.CLASSIC | AttributeRollKinds.AUGMENTED} AttributeRoll */

/**
 * @param {{ constraints: Constraint[], attributeRoll: AttributeRoll, tolerance: number}} args
 * @return {{ rollout: rollAttributes.Rollout, numRolls: number}}
 */
function doRollout({ constraints = [], attributeRoll, tolerance = 500 }) {
  const predicate = makePredicateForAllConstraints(...constraints);
  const rollAttribute = rollAttributes[attributeRoll];
  let attempt;
  for (attempt = 1; attempt <= tolerance; attempt += 1) {
    const rollout = times(rollAttribute, 6);
    if (predicate(rollout)) {
      return { rollout, numRolls: attempt };
    }
  }

  return { rollout: null, numRolls: attempt };
}

export default doRollout;