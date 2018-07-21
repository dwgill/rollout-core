import min from 'lodash/fp/min';
import pullAt from 'lodash/fp/pullAt';
import { AUGMENTED, CLASSIC, STANDARD } from './AttributeRollKinds';
import rollDice from './rollDice';

/**
 * @typedef {object} Rollout
 * @prop {number[]} constituents
 * @prop {number[]} discarded
 */

/**
 * @return {Rollout} A standard ability score roll of 4d6 drop 1.
 */
export function rollStandardScore() {
  const four_d6 = rollDice(4);
  const lowest_d6 = min(four_d6);
  const higher_three_d6 = pullAt(four_d6.indexOf(lowest_d6))(four_d6);
  return {
    constituents: higher_three_d6,
    discarded: lowest_d6,
  };
}

/**
 * @return {Rollout} A classic ability score roll of 3d6.
 */
export function rollClassicScore() {
  return {
    constituents: rollDice(3),
    discarded: [],
  };
}

/**
 * @return {Rollout} An augmented ability score roll of 2d6 + 6.
 */
export function rollAugmentedScore() {
  return {
    constituents: [6].concat(rollDice(2)),
    discarded: [],
  };
}

export default {
  [STANDARD]: rollStandardScore,
  [CLASSIC]: rollClassicScore,
  [AUGMENTED]: rollAugmentedScore,
};
