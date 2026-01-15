import { useState } from 'react';
import { calculateRER, calculateDER, calculateGramsPerMeal } from '../utils/calculations';
import { goalMultipliers } from '../data/foodDatabase';

function PetCalculator({ pet, foods, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const rer = calculateRER(pet.weight);
  const goalData = goalMultipliers[pet.type].find(g => g.id === pet.goal);
  const calorieTarget = calculateDER(rer, goalData?.multiplier || 1.0);

  const handleNameChange = (e) => {
    onUpdate(pet.id, { name: e.target.value });
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const defaultGoal = newType === 'cat' ? 'maintain-neutered' : 'maintain-neutered';
    onUpdate(pet.id, { type: newType, goal: defaultGoal });
  };

  const handleWeightChange = (e) => {
    const weight = parseFloat(e.target.value) || 0;
    onUpdate(pet.id, { weight });
  };

  const handleGoalChange = (e) => {
    onUpdate(pet.id, { goal: e.target.value });
  };

  const handleMealsChange = (e) => {
    const meals = parseInt(e.target.value) || 1;
    onUpdate(pet.id, { mealsPerDay: meals });
  };

  const handleTreatsChange = (e) => {
    onUpdate(pet.id, { treats: e.target.checked });
  };

  const addFoodSlot = () => {
    const newFoods = [...(pet.foods || []), { foodId: null, percentage: 0 }];
    onUpdate(pet.id, { foods: newFoods });
  };

  const updateFoodSlot = (index, updates) => {
    const newFoods = [...(pet.foods || [])];
    newFoods[index] = { ...newFoods[index], ...updates };
    onUpdate(pet.id, { foods: newFoods });
  };

  const removeFoodSlot = (index) => {
    const newFoods = pet.foods.filter((_, i) => i !== index);
    onUpdate(pet.id, { foods: newFoods });
  };

  const totalPercentage = (pet.foods || []).reduce((sum, f) => sum + (f.percentage || 0), 0);

  return (
    <div className="pet-card">
      <div className="pet-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="pet-name">{pet.name || 'Unnamed Pet'}</h2>
        <button className="collapse-btn">{isExpanded ? '−' : '+'}</button>
      </div>

      {isExpanded && (
        <div className="pet-content">
          <div className="section">
            <h3>Stats & Options</h3>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={pet.name}
                onChange={handleNameChange}
                placeholder="Pet name"
              />
            </div>

            <div className="form-group">
              <label>Type:</label>
              <select value={pet.type} onChange={handleTypeChange}>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
              </select>
            </div>

            <div className="form-group">
              <label>Current Weight (lbs):</label>
              <input
                type="number"
                step="0.01"
                value={pet.weight}
                onChange={handleWeightChange}
              />
            </div>

            <div className="stat-row">
              <label>RER (cals):</label>
              <span className="stat-value">{rer}</span>
            </div>

            <div className="form-group">
              <label>Current Goal:</label>
              <select value={pet.goal} onChange={handleGoalChange}>
                {goalMultipliers[pet.type].map(goal => (
                  <option key={goal.id} value={goal.id}>
                    {goal.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="stat-row">
              <label>Calorie Target:</label>
              <span className="stat-value">{calorieTarget}</span>
            </div>

            <div className="form-group">
              <label>Meals per day:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={pet.mealsPerDay}
                onChange={handleMealsChange}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={pet.treats || false}
                  onChange={handleTreatsChange}
                />
                <span>3 Greenies + Bacon Paste?</span>
              </label>
            </div>
          </div>

          <div className="section">
            <h3>Food Options</h3>
            {(pet.foods || []).map((foodSlot, index) => (
              <div key={index} className="food-slot">
                <div className="food-slot-inputs">
                  <input
                    type="number"
                    className="percentage-input"
                    min="0"
                    max="100"
                    value={foodSlot.percentage || 0}
                    onChange={(e) => updateFoodSlot(index, { percentage: parseFloat(e.target.value) || 0 })}
                    placeholder="%"
                  />
                  <select
                    className="food-select"
                    value={foodSlot.foodId || ''}
                    onChange={(e) => updateFoodSlot(index, { foodId: e.target.value })}
                  >
                    <option value="">Select food...</option>
                    {foods.map(food => (
                      <option key={food.id} value={food.id}>
                        {food.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn-remove"
                    onClick={() => removeFoodSlot(index)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            <button onClick={addFoodSlot} className="btn-add-food">
              + Add Food
            </button>

            {totalPercentage > 0 && (
              <div className={`total-percentage ${totalPercentage === 100 ? 'valid' : 'invalid'}`}>
                Total: {totalPercentage}%
                {totalPercentage !== 100 && <span className="warning"> (Should be 100%)</span>}
              </div>
            )}
          </div>

          <div className="section results">
            <h3>Feed This Much Per Meal!</h3>
            {(pet.foods || []).map((foodSlot, index) => {
              if (!foodSlot.foodId || !foodSlot.percentage) return null;

              const food = foods.find(f => f.id == foodSlot.foodId);
              if (!food) return null;

              const grams = calculateGramsPerMeal(
                calorieTarget,
                foodSlot.percentage,
                food.calsPerGram,
                pet.mealsPerDay
              );

              return (
                <div key={index} className="result-row">
                  <span className="food-name">{food.name}:</span>
                  <span className="food-amount">{grams} g</span>
                </div>
              );
            })}
          </div>

          <button onClick={() => onDelete(pet.id)} className="btn-delete">
            Delete Pet
          </button>
        </div>
      )}
    </div>
  );
}

export default PetCalculator;
