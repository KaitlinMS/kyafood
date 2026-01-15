# Pet Food Calculator

A mobile-first web application for calculating how much food to feed your pets based on their weight, activity level, and nutritional goals.

## Features

- Calculate daily calorie needs based on Resting Energy Requirements (RER)
- Support for both cats and dogs with different goal multipliers
- Mix multiple foods with custom percentages
- Mobile-responsive design (portrait phone screens prioritized)
- Easy-to-manage food database
- Persistent storage using browser localStorage
- Real-time calculation of food portions per meal

## Setup

1. Make sure you have [Node.js](https://nodejs.org/en) installed on your computer
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the development server
4. Visit `http://localhost:3000/` in your browser

## How to Use

### Adding a Pet

1. Click the "Add Pet" button at the bottom of the page
2. Click on the pet's name to expand the calculator
3. Fill in the pet's details:
   - **Name**: Give your pet a name
   - **Type**: Select Cat or Dog
   - **Current Weight**: Enter weight in pounds
   - **Current Goal**: Select from options like "Maintain weight", "Weight loss", "Growing kitten", etc.
   - **Meals per day**: How many times you feed them per day
   - **3 Greenies + Bacon Paste**: Optional checkbox for treats

### Adding Foods

1. Click "+ Add Food" to add a food slot
2. Enter the percentage of daily calories this food should provide
3. Select the food from the dropdown
4. The percentages should add up to 100%

### Viewing Results

The "Feed This Much Per Meal!" section shows exactly how many grams of each food to feed per meal.

### Managing the Food Database

1. Click "Manage Foods" in the header
2. Use the "Add New Food" form to add new foods
   - Enter the food name
   - Enter calories per gram (usually found on the food packaging as kcal/100g ÷ 100)
3. Use the search bar to find foods
4. Edit or delete foods as needed

## Calculations

The app uses the following formulas:

- **RER (Resting Energy Requirement)**: `70 × (weight in kg)^0.75`
- **DER (Daily Energy Requirement)**: `RER × goal multiplier`
- **Grams per meal**: `(DER × food percentage) / (calories per gram × meals per day)`

## Notes

- All data is stored in your browser's localStorage
- The app works offline after the initial load
- Designed for portrait phone screens but works on all devices