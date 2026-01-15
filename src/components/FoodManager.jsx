import { useState } from 'react';

function FoodManager({ foods, setFoods }) {
  const [newFood, setNewFood] = useState({ name: '', calsPerGram: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddFood = () => {
    if (!newFood.name || !newFood.calsPerGram) {
      alert('Please enter both name and calories per gram');
      return;
    }

    const food = {
      id: Date.now(),
      name: newFood.name,
      calsPerGram: parseFloat(newFood.calsPerGram)
    };

    setFoods([...foods, food]);
    setNewFood({ name: '', calsPerGram: '' });
  };

  const handleDeleteFood = (id) => {
    if (confirm('Are you sure you want to delete this food?')) {
      setFoods(foods.filter(f => f.id !== id));
    }
  };

  const handleUpdateFood = (id, updates) => {
    setFoods(foods.map(f => f.id === id ? { ...f, ...updates } : f));
    setEditingId(null);
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="food-manager">
      <h2>Food Database</h2>

      <div className="add-food-form">
        <h3>Add New Food</h3>
        <div className="form-row">
          <input
            type="text"
            placeholder="Food name"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
          />
          <input
            type="number"
            step="0.001"
            placeholder="Calories/gram"
            value={newFood.calsPerGram}
            onChange={(e) => setNewFood({ ...newFood, calsPerGram: e.target.value })}
          />
          <button onClick={handleAddFood} className="btn-primary">Add</button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="food-list">
        <div className="food-list-header">
          <span>Food Name</span>
          <span>Cal/g</span>
          <span>Actions</span>
        </div>
        {filteredFoods.map(food => (
          <div key={food.id} className="food-item">
            {editingId === food.id ? (
              <>
                <input
                  type="text"
                  value={food.name}
                  onChange={(e) => handleUpdateFood(food.id, { name: e.target.value })}
                />
                <input
                  type="number"
                  step="0.001"
                  value={food.calsPerGram}
                  onChange={(e) => handleUpdateFood(food.id, { calsPerGram: parseFloat(e.target.value) })}
                />
                <button onClick={() => setEditingId(null)} className="btn-secondary">Done</button>
              </>
            ) : (
              <>
                <span className="food-item-name">{food.name}</span>
                <span className="food-item-cals">{food.calsPerGram}</span>
                <div className="food-item-actions">
                  <button onClick={() => setEditingId(food.id)} className="btn-secondary">Edit</button>
                  <button onClick={() => handleDeleteFood(food.id)} className="btn-delete">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodManager;
