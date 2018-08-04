import random from 'lodash/fp/random';
import times from 'lodash/fp/times';

/**
 * Roll the provided number of six-sided dice, returning the results in an array.
 * @param {number} numberOfDice The number of dice to roll.
 * @return {number[]} An array of the dice results.
 */
function rollDice(numberOfDice = 1) {
  return times(() => random(1, 6), numberOfDice);
}

export default rollDice;
