import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import { PageHeader } from './UIComponents';
import { Step01BasicInfo } from './Step01BasicInfo';
import { Step02VehicleSelection } from './Step02VehicleSelection';
import { Step03Itinerary } from './Step03Itinerary';
import { Step04Accommodation } from './Step04Accommodation';
import { Step05Freshups } from './Step05Freshups';
import { Step06Meals } from './Step06Meals';
import { Step07Entertainment } from './Step07Entertainment';
import { Step08ExtraCharges } from './Step08ExtraCharges';
import { InvoiceComponent } from './InvoiceComponent';
import { CalculationEngine } from '@utils/calculationEngine';
import { Button } from './UIComponents';
import { MEAL_TYPES, EXTRA_CHARGES } from '@utils/constants';
import { logger } from '@utils/logger';
export const AppContent = () => {
    const { basicInfo, setBasicInfo, vehicleSelection, itinerary, setItinerary, accommodation, setAccommodation, freshups, setFreshups, meals, setMeals, entertainment, extraCharges, setExtraCharges, planGenerated, setPlanGenerated, } = useTourPlanner();
    const [invoice, setInvoice] = useState(null);
    const [invoiceVisible, setInvoiceVisible] = useState(false);
    const [freshupSharing, setFreshupSharing] = useState('5');
    const handleGeneratePlan = () => {
        const days = basicInfo.numDays;
        const nights = basicInfo.numNights;
        logger.info('Generating trip plan', { days, nights });
        // Generate itinerary
        const newItinerary = Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            destination: '',
            kilometres: 0,
            locations: [],
        }));
        setItinerary(newItinerary);
        // Generate accommodation
        if (nights > 0) {
            const newAccom = Array.from({ length: nights }, (_, i) => ({
                night: i + 1,
                active: true,
                rooms: [{ id: `room_0_${i}`, sharing: '5', quantity: 0 }],
            }));
            setAccommodation(newAccom);
        }
        else {
            setAccommodation([]);
        }
        // Generate freshups
        const newFreshups = Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            sessions: [],
        }));
        setFreshups(newFreshups);
        // Generate meals
        const newMeals = Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            meals: MEAL_TYPES.map((m) => ({
                ...m,
                selected: false,
                isVegetarian: true,
            })),
        }));
        setMeals(newMeals);
        // Generate extra charges
        const newExtras = Array.from({ length: days }, (_, i) => ({
            day: i + 1,
            charges: EXTRA_CHARGES.map((c) => ({
                key: c.key,
                selected: false,
            })),
        }));
        setExtraCharges(newExtras);
        setPlanGenerated(true);
    };
    const handleCalculate = () => {
        logger.info('Starting calculation');
        if (!basicInfo.category) {
            alert('Please select a customer category (Step 01).');
            return;
        }
        if (!basicInfo.numStudents) {
            alert('Please enter number of students (Step 01).');
            return;
        }
        if (!basicInfo.numDays) {
            alert('Please enter trip duration in days (Step 01).');
            return;
        }
        if (!planGenerated) {
            alert('Please click "Generate Trip Plan" first.');
            return;
        }
        try {
            const { breakdown } = CalculationEngine.calculateBreakdown(basicInfo, vehicleSelection.type, vehicleSelection.quantity, itinerary, accommodation, freshups, meals, entertainment, extraCharges, freshupSharing);
            const newInvoice = CalculationEngine.generateInvoice(basicInfo, vehicleSelection.type, vehicleSelection.quantity, breakdown);
            setInvoice(newInvoice);
            setInvoiceVisible(true);
            logger.info('Calculation completed successfully', {
                grandTotal: newInvoice.grandTotal,
                perHead: newInvoice.perHead,
            });
            // Scroll to invoice
            setTimeout(() => {
                const invoiceElement = document.querySelector('.invoice-wrap');
                if (invoiceElement) {
                    invoiceElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
        catch (error) {
            logger.error('Calculation failed', error);
            alert('An error occurred during calculation. Please check the console.');
        }
    };
    return (_jsxs("div", { className: "app", children: [_jsx(PageHeader, { title: "Joshy's Tour Planner", subtitle: "Student Trip Enquiry & Live Cost Estimation System" }), _jsx(Step01BasicInfo, { onGeneratePlan: handleGeneratePlan }), _jsx(Step02VehicleSelection, {}), _jsx(Step03Itinerary, {}), _jsx(Step04Accommodation, {}), _jsx(Step05Freshups, {}), _jsx(Step06Meals, {}), _jsx(Step07Entertainment, {}), _jsx(Step08ExtraCharges, {}), _jsx("div", { style: { marginBottom: '2rem' }, children: _jsxs(Button, { variant: "primary", onClick: handleCalculate, children: [_jsx("i", { className: "fa-solid fa-calculator" }), " Calculate Total Trip Cost & Generate Invoice"] }) }), _jsx(InvoiceComponent, { invoice: invoice, visible: invoiceVisible })] }));
};
