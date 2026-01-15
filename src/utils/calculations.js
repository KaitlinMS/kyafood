// Convert pounds to kilograms
export function lbsToKg(lbs) {
  return lbs * 0.453592;
}

// Calculate Resting Energy Requirement (RER)
// RER = 70 × (body weight in kg)^0.75
export function calculateRER(weightInLbs) {
  const weightInKg = lbsToKg(weightInLbs);
  return Math.round(70 * Math.pow(weightInKg, 0.75));
}

// Calculate Daily Energy Requirement (DER)
// DER = RER × goal multiplier
export function calculateDER(rer, multiplier) {
  return Math.round(rer * multiplier);
}

// Calculate grams of food per meal
// Formula: (total daily calories × food percentage) / (calories per gram × meals per day)
export function calculateGramsPerMeal(calorieTarget, foodPercentage, calsPerGram, mealsPerDay) {
  const dailyCaloriesFromThisFood = calorieTarget * (foodPercentage / 100);
  const gramsPerMeal = dailyCaloriesFromThisFood / (calsPerGram * mealsPerDay);
  return Math.round(gramsPerMeal);
}
