import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, FormField, InfoText } from './UIComponents';
import { RATE_CARD } from '@utils/constants';
import { logger } from '@utils/logger';
export const Step02VehicleSelection = () => {
    const { vehicleSelection, setVehicleSelection } = useTourPlanner();
    const handleVehicleChange = (type) => {
        setVehicleSelection({ ...vehicleSelection, type });
        logger.debug(`Vehicle selected: ${type}`);
    };
    const handleQuantityChange = (quantity) => {
        setVehicleSelection({ ...vehicleSelection, quantity });
    };
    return (_jsxs(SectionCard, { icon: "\uD83D\uDE8C", iconColor: "ic-purple", title: "Vehicle Selection", description: "Transport type & fleet count", stepNumber: "STEP 02", animationDelay: "0.14s", children: [_jsxs("div", { className: "row", children: [_jsx(FormField, { label: "Vehicle Type", span2: true, children: _jsxs("select", { className: "fc", value: vehicleSelection.type, onChange: (e) => handleVehicleChange(e.target.value), children: [_jsx("option", { value: "", children: "\u2014 Select Vehicle \u2014" }), Object.entries(RATE_CARD.vehicles).map(([name]) => (_jsxs("option", { value: name, children: [name.includes('BUS')
                                            ? `Bus — ${name.split(' ')[1]}`
                                            : `Traveller — ${name.split(' ')[1]}`, ' ', "| \u20B9", RATE_CARD.vehicles[name].basic, "/day + \u20B9", RATE_CARD.vehicles[name].perKm, "/km"] }, name)))] }) }), _jsx(FormField, { label: "No. of Vehicles", children: _jsx("input", { className: "fc", type: "number", min: "1", value: vehicleSelection.quantity, onChange: (e) => handleQuantityChange(parseInt(e.target.value) || 1) }) })] }), _jsx(InfoText, { children: "\u2139\uFE0F First 100 KM/day included in basic rent. An additional 80 KM/day is auto-added for city travel. Enter daily trip KM in the itinerary below." })] }));
};
