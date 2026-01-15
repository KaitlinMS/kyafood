import { useState, useEffect } from 'react';
import PetCalculator from './components/PetCalculator';
import FoodManager from './components/FoodManager';
import { foodDatabase } from './data/foodDatabase';
import './index.css';

function App() {
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('pets');
    return saved ? JSON.parse(saved) : [];
  });

  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem('foods');
    return saved ? JSON.parse(saved) : foodDatabase;
  });

  const [showFoodManager, setShowFoodManager] = useState(false);

  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('foods', JSON.stringify(foods));
  }, [foods]);

  const addPet = () => {
    const newPet = {
      id: Date.now(),
      name: `Pet ${pets.length + 1}`,
      type: 'cat',
      weight: 10,
      goal: 'maintain-neutered',
      mealsPerDay: 3,
      treats: false,
      foods: []
    };
    setPets([...pets, newPet]);
  };

  const updatePet = (id, updates) => {
    setPets(pets.map(pet => pet.id === id ? { ...pet, ...updates } : pet));
  };

  const deletePet = (id) => {
    if (confirm('Are you sure you want to delete this pet?')) {
      setPets(pets.filter(pet => pet.id !== id));
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Pet Food Calculator</h1>
        <div className="header-buttons">
          <button onClick={() => setShowFoodManager(!showFoodManager)} className="btn-secondary">
            {showFoodManager ? 'Show Pets' : 'Manage Foods'}
          </button>
        </div>
      </header>

      {showFoodManager ? (
        <FoodManager foods={foods} setFoods={setFoods} />
      ) : (
        <main className="main">
          <div className="pets-container">
            {pets.map(pet => (
              <PetCalculator
                key={pet.id}
                pet={pet}
                foods={foods}
                onUpdate={updatePet}
                onDelete={deletePet}
              />
            ))}
          </div>
          <button onClick={addPet} className="btn-add-pet">
            + Add Pet
          </button>
        </main>
      )}
    </div>
  );
}

export default App;
