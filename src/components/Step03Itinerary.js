import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, FormField, DayCard, EmptyState, } from './UIComponents';
import { DESTINATIONS, RATE_CARD } from '@utils/constants';
import { getDbColor } from '@utils/helpers';
import { logger } from '@utils/logger';
export const Step03Itinerary = () => {
    const { itinerary, setItinerary, planGenerated, basicInfo } = useTourPlanner();
    const handleDestinationChange = (dayIndex, destination) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].destination = destination;
        if (destination) {
            const locations = DESTINATIONS[destination].locations;
            newItinerary[dayIndex].locations = locations.map((loc) => ({
                name: loc,
                selected: false,
                hasFee: Object.values(RATE_CARD.entryFee[loc] || {}).some((v) => v > 0),
            }));
        }
        else {
            newItinerary[dayIndex].locations = [];
        }
        setItinerary(newItinerary);
        logger.debug(`Destination changed for day ${dayIndex + 1}: ${destination}`);
    };
    const handleKmsChange = (dayIndex, kms) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].kilometres = kms;
        setItinerary(newItinerary);
    };
    const handleLocationToggle = (dayIndex, locationIndex) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].locations[locationIndex].selected =
            !newItinerary[dayIndex].locations[locationIndex].selected;
        setItinerary(newItinerary);
    };
    if (!planGenerated) {
        return (_jsx(SectionCard, { icon: "\uD83D\uDDFA\uFE0F", iconColor: "ic-green", title: "Day-wise Itinerary", description: "Destinations, KM & tourist spots with entry fees", stepNumber: "STEP 03", animationDelay: "0.2s", children: _jsx(EmptyState, { icon: "fa-regular fa-calendar-days", message: "Generate the trip plan to build the day-wise itinerary." }) }));
    }
    return (_jsx(SectionCard, { icon: "\uD83D\uDDFA\uFE0F", iconColor: "ic-green", title: "Day-wise Itinerary", description: "Destinations, KM & tourist spots with entry fees", stepNumber: "STEP 03", animationDelay: "0.2s", children: _jsx("div", { children: itinerary.map((day, dayIndex) => (_jsxs(DayCard, { dayNumber: day.day, colorClass: getDbColor(dayIndex), children: [_jsxs("div", { className: "row", style: { marginBottom: '0.7rem' }, children: [_jsx(FormField, { label: `Destination for Day ${day.day}`, children: _jsxs("select", { className: "fc", value: day.destination, onChange: (e) => handleDestinationChange(dayIndex, e.target.value), children: [_jsx("option", { value: "", children: "\u2014 Select Destination \u2014" }), Object.keys(DESTINATIONS).map((dest) => (_jsx("option", { value: dest, children: dest }, dest)))] }) }), _jsx(FormField, { label: `Total Kilometres (Day ${day.day})`, children: _jsx("input", { className: "fc", type: "number", min: "0", placeholder: "e.g. 150", value: day.kilometres || '', onChange: (e) => handleKmsChange(dayIndex, parseInt(e.target.value) || 0) }) })] }), day.locations.length > 0 && (_jsxs("div", { children: [_jsxs("div", { style: {
                                    fontSize: '10px',
                                    fontWeight: '700',
                                    letterSpacing: '1.2px',
                                    textTransform: 'uppercase',
                                    color: 'var(--txd)',
                                    marginBottom: '7px',
                                }, children: ["Tourist Spots in ", day.destination] }), _jsx("div", { className: "loc-grid", children: day.locations.map((loc, locIndex) => (_jsxs("label", { className: `loc-item ${loc.selected ? 'on' : ''}`, children: [_jsx("input", { type: "checkbox", checked: loc.selected, onChange: () => handleLocationToggle(dayIndex, locIndex) }), _jsx("span", { className: "loc-dot" }), _jsx("span", { style: { flex: 1 }, children: loc.name }), _jsx("span", { style: { fontSize: '10px', color: 'var(--txd)' }, children: loc.hasFee ? '(entry incl.)' : 'Free' })] }, loc.name))) })] }))] }, day.day))) }) }));
};
