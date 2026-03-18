import React from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import {
  SectionCard,
  DayCard,
  EmptyState,
} from './UIComponents';
import { MEAL_TYPES } from '@utils/constants';
import { getDbColor } from '@utils/helpers';
import { logger } from '@utils/logger';

export const Step06Meals: React.FC = () => {
  const { meals, setMeals, planGenerated } = useTourPlanner();

  if (!planGenerated) {
    return (
      <SectionCard
        icon="🍽️"
        iconColor="ic-orange"
        title="Meal Plan"
        description="Day-wise food selection with Veg / Non-Veg preference"
        stepNumber="STEP 06"
        animationDelay="0.38s"
      >
        <EmptyState
          icon="fa-solid fa-utensils"
          message="Generate the trip plan to configure the meal plan."
        />
      </SectionCard>
    );
  }

  const handleMealToggle = (dayIndex: number, mealIndex: number) => {
    const newMeals = [...meals];
    newMeals[dayIndex].meals[mealIndex].selected =
      !newMeals[dayIndex].meals[mealIndex].selected;
    setMeals(newMeals);
  };

  const handleVegChange = (dayIndex: number, mealIndex: number, isVeg: boolean) => {
    const newMeals = [...meals];
    newMeals[dayIndex].meals[mealIndex].isVegetarian = isVeg;
    setMeals(newMeals);
  };

  return (
    <SectionCard
      icon="🍽️"
      iconColor="ic-orange"
      title="Meal Plan"
      description="Day-wise food selection with Veg / Non-Veg preference"
      stepNumber="STEP 06"
      animationDelay="0.38s"
    >
      <div>
        {meals.map((day, dayIndex) => (
          <DayCard
            key={day.day}
            dayNumber={day.day}
            colorClass={getDbColor(dayIndex)}
          >
            <div className="meal-grid">
              {day.meals.map((meal, mealIndex) => (
                <div
                  key={meal.key}
                  className={`meal-item ${meal.selected ? 'on' : ''}`}
                >
                  <input
                    type="checkbox"
                    className="mchk"
                    checked={meal.selected}
                    onChange={() => handleMealToggle(dayIndex, mealIndex)}
                  />
                  <label className="mlbl" style={{ cursor: 'pointer' }}>
                    {meal.label}
                  </label>
                  <div className="vt">
                    <input
                      type="radio"
                      name={`vt_${day.day}_${meal.key}`}
                      id={`v_${day.day}_${meal.key}`}
                      value="veg"
                      checked={meal.isVegetarian}
                      onChange={() => handleVegChange(dayIndex, mealIndex, true)}
                    />
                    <label
                      className="vl"
                      htmlFor={`v_${day.day}_${meal.key}`}
                      style={{ cursor: 'pointer' }}
                    >
                      Veg
                    </label>
                    <input
                      type="radio"
                      name={`vt_${day.day}_${meal.key}`}
                      id={`nv_${day.day}_${meal.key}`}
                      value="nv"
                      checked={!meal.isVegetarian}
                      onChange={() => handleVegChange(dayIndex, mealIndex, false)}
                    />
                    <label
                      className="nvl"
                      htmlFor={`nv_${day.day}_${meal.key}`}
                      style={{ cursor: 'pointer' }}
                    >
                      N.Veg
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </DayCard>
        ))}
      </div>
    </SectionCard>
  );
};
