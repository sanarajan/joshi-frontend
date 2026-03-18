import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, DayCard, EmptyState, } from './UIComponents';
import { EXTRA_CHARGES } from '@utils/constants';
import { getDbColor } from '@utils/helpers';
import { logger } from '@utils/logger';
export const Step08ExtraCharges = () => {
    const { extraCharges, setExtraCharges, planGenerated } = useTourPlanner();
    if (!planGenerated) {
        return (_jsx(SectionCard, { icon: "\uD83D\uDCBC", iconColor: "ic-red", title: "Extra Charges", description: "Day-wise: Guide, Tolls, Bata & RTO", stepNumber: "STEP 08", animationDelay: "0.5s", children: _jsx(EmptyState, { icon: "fa-solid fa-receipt", message: "Generate the trip plan to configure extra charges." }) }));
    }
    const handleChargeToggle = (dayIndex, chargeIndex) => {
        const newCharges = [...extraCharges];
        newCharges[dayIndex].charges[chargeIndex].selected =
            !newCharges[dayIndex].charges[chargeIndex].selected;
        setExtraCharges(newCharges);
        logger.debug(`Extra charge toggled for day ${dayIndex + 1}`);
    };
    return (_jsx(SectionCard, { icon: "\uD83D\uDCBC", iconColor: "ic-red", title: "Extra Charges", description: "Day-wise: Guide, Tolls, Bata & RTO", stepNumber: "STEP 08", animationDelay: "0.5s", children: _jsx("div", { children: extraCharges.map((day, dayIndex) => (_jsxs(DayCard, { dayNumber: day.day, colorClass: getDbColor(dayIndex), children: [_jsx("div", { style: { fontSize: '12px', color: 'var(--txm)', marginBottom: '10px' }, children: "Select applicable charges" }), _jsx("div", { className: "ext-grid", children: day.charges.map((charge, chargeIndex) => {
                            const chargeInfo = EXTRA_CHARGES.find((c) => c.key === charge.key);
                            return (_jsxs("label", { className: `ext-item ${charge.selected ? 'on' : ''}`, children: [_jsx("input", { type: "checkbox", checked: charge.selected, onChange: () => handleChargeToggle(dayIndex, chargeIndex) }), _jsx("div", { className: "ext-icon", children: chargeInfo?.icon }), _jsx("div", { className: "ext-name", children: chargeInfo?.label }), _jsx("div", { className: "ext-cost", children: chargeInfo?.cost })] }, charge.key));
                        }) })] }, day.day))) }) }));
};
