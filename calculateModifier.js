/**
 * @param {number} score
 * @return {number} the ability modifier for that score
 */
const calculateModifier = score => Math.floor((score - 10) / 2);

export default calculateModifier;
