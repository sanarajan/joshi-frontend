import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, FormField, DayCard, EmptyState, Divider, InfoText, } from './UIComponents';
import { FRESHUP_TIMES, SHARING_OPTIONS } from '@utils/constants';
import { getDbColor } from '@utils/helpers';
import { logger } from '@utils/logger';
export const Step05Freshups = () => {
    const { freshups, setFreshups, planGenerated, basicInfo } = useTourPlanner();
    const [freshupSharing, setFreshupSharing] = useState('5');
    if (!planGenerated) {
        return (_jsx(SectionCard, { icon: "\uD83D\uDEBF", iconColor: "ic-cyan", title: "Fresh-ups", description: "Day-wise refreshment stops \u2014 select time slots", stepNumber: "STEP 05", animationDelay: "0.32s", children: _jsx(EmptyState, { icon: "fa-solid fa-shower", message: "Generate the trip plan to configure fresh-ups." }) }));
    }
    const handleSessionToggle = (dayIndex, session) => {
        const newFreshups = [...freshups];
        const idx = newFreshups[dayIndex].sessions.indexOf(session);
        if (idx > -1) {
            newFreshups[dayIndex].sessions.splice(idx, 1);
        }
        else {
            newFreshups[dayIndex].sessions.push(session);
        }
        setFreshups(newFreshups);
        logger.debug(`Session toggled for day ${dayIndex + 1}: ${session}`);
    };
    return (_jsxs(SectionCard, { icon: "\uD83D\uDEBF", iconColor: "ic-cyan", title: "Fresh-ups", description: "Day-wise refreshment stops \u2014 select time slots", stepNumber: "STEP 05", animationDelay: "0.32s", children: [_jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '1rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                }, children: [_jsx(FormField, { label: "Fresh-up Sharing Type (for rate)", children: _jsx("select", { className: "fc", value: freshupSharing, onChange: (e) => setFreshupSharing(e.target.value), style: { maxWidth: '200px' }, children: SHARING_OPTIONS.map((opt) => (_jsxs("option", { value: opt, children: [opt, " Sharing"] }, opt))) }) }), _jsx(InfoText, { children: "Select sharing to determine the per-head fresh-up rate from the rate card." })] }), _jsx(Divider, {}), _jsx("div", { children: freshups.map((day, dayIndex) => (_jsxs(DayCard, { dayNumber: day.day, colorClass: getDbColor(dayIndex), children: [_jsx("div", { style: { fontSize: '12px', color: 'var(--txm)', marginBottom: '10px' }, children: "Choose fresh-up sessions" }), _jsx("div", { className: "pill-row", children: FRESHUP_TIMES.map((time) => (_jsxs("label", { className: `check-pill ${day.sessions.includes(time) ? 'on' : ''}`, children: [_jsx("input", { type: "checkbox", checked: day.sessions.includes(time), onChange: () => handleSessionToggle(dayIndex, time) }), _jsx("span", { className: "pill-dot" }), time] }, time))) })] }, day.day))) })] }));
};
