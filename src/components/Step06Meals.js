import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, DayCard, EmptyState, } from './UIComponents';
import { getDbColor } from '@utils/helpers';
export const Step06Meals = () => {
    const { meals, setMeals, planGenerated } = useTourPlanner();
    if (!planGenerated) {
        return (_jsx(SectionCard, { icon: "\uD83C\uDF7D\uFE0F", iconColor: "ic-orange", title: "Meal Plan", description: "Day-wise food selection with Veg / Non-Veg preference", stepNumber: "STEP 06", animationDelay: "0.38s", children: _jsx(EmptyState, { icon: "fa-solid fa-utensils", message: "Generate the trip plan to configure the meal plan." }) }));
    }
    const handleMealToggle = (dayIndex, mealIndex) => {
        const newMeals = [...meals];
        newMeals[dayIndex].meals[mealIndex].selected =
            !newMeals[dayIndex].meals[mealIndex].selected;
        setMeals(newMeals);
    };
    const handleVegChange = (dayIndex, mealIndex, isVeg) => {
        const newMeals = [...meals];
        newMeals[dayIndex].meals[mealIndex].isVegetarian = isVeg;
        setMeals(newMeals);
    };
    return (_jsx(SectionCard, { icon: "\uD83C\uDF7D\uFE0F", iconColor: "ic-orange", title: "Meal Plan", description: "Day-wise food selection with Veg / Non-Veg preference", stepNumber: "STEP 06", animationDelay: "0.38s", children: _jsx("div", { children: meals.map((day, dayIndex) => (_jsx(DayCard, { dayNumber: day.day, colorClass: getDbColor(dayIndex), children: _jsx("div", { className: "meal-grid", children: day.meals.map((meal, mealIndex) => (_jsxs("div", { className: `meal-item ${meal.selected ? 'on' : ''}`, children: [_jsx("input", { type: "checkbox", className: "mchk", checked: meal.selected, onChange: () => handleMealToggle(dayIndex, mealIndex) }), _jsx("label", { className: "mlbl", style: { cursor: 'pointer' }, children: meal.label }), _jsxs("div", { className: "vt", children: [_jsx("input", { type: "radio", name: `vt_${day.day}_${meal.key}`, id: `v_${day.day}_${meal.key}`, value: "veg", checked: meal.isVegetarian, onChange: () => handleVegChange(dayIndex, mealIndex, true) }), _jsx("label", { className: "vl", htmlFor: `v_${day.day}_${meal.key}`, style: { cursor: 'pointer' }, children: "Veg" }), _jsx("input", { type: "radio", name: `vt_${day.day}_${meal.key}`, id: `nv_${day.day}_${meal.key}`, value: "nv", checked: !meal.isVegetarian, onChange: () => handleVegChange(dayIndex, mealIndex, false) }), _jsx("label", { className: "nvl", htmlFor: `nv_${day.day}_${meal.key}`, style: { cursor: 'pointer' }, children: "N.Veg" })] })] }, meal.key))) }) }, day.day))) }) }));
};
