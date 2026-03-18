import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const TourPlannerContext = createContext(undefined);
export const TourPlannerProvider = ({ children }) => {
    const [basicInfo, setBasicInfo] = useState({
        schoolName: '',
        enquiryRef: '',
        category: 'KG',
        numStudents: 0,
        numStaffs: 0,
        numDays: 0,
        numNights: 0,
    });
    const [vehicleSelection, setVehicleSelection] = useState({
        type: '',
        quantity: 1,
    });
    const [itinerary, setItinerary] = useState([]);
    const [accommodation, setAccommodation] = useState([]);
    const [freshups, setFreshups] = useState([]);
    const [meals, setMeals] = useState([]);
    const [entertainment, setEntertainment] = useState({
        campfire: false,
        dj: false,
    });
    const [extraCharges, setExtraCharges] = useState([]);
    const [planGenerated, setPlanGenerated] = useState(false);
    const updateBasicInfo = (partial) => {
        setBasicInfo((prev) => ({ ...prev, ...partial }));
    };
    const resetAll = () => {
        setBasicInfo({
            schoolName: '',
            enquiryRef: '',
            category: 'KG',
            numStudents: 0,
            numStaffs: 0,
            numDays: 0,
            numNights: 0,
        });
        setVehicleSelection({ type: '', quantity: 1 });
        setItinerary([]);
        setAccommodation([]);
        setFreshups([]);
        setMeals([]);
        setEntertainment({ campfire: false, dj: false });
        setExtraCharges([]);
        setPlanGenerated(false);
    };
    return (_jsx(TourPlannerContext.Provider, { value: {
            basicInfo,
            setBasicInfo,
            updateBasicInfo,
            vehicleSelection,
            setVehicleSelection,
            itinerary,
            setItinerary,
            accommodation,
            setAccommodation,
            freshups,
            setFreshups,
            meals,
            setMeals,
            entertainment,
            setEntertainment,
            extraCharges,
            setExtraCharges,
            planGenerated,
            setPlanGenerated,
            resetAll,
        }, children: children }));
};
export const useTourPlanner = () => {
    const context = useContext(TourPlannerContext);
    if (!context) {
        throw new Error('useTourPlanner must be used within TourPlannerProvider');
    }
    return context;
};
