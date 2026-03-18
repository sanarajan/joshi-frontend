import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard } from './UIComponents';
import { logger } from '@utils/logger';
export const Step07Entertainment = () => {
    const { entertainment, setEntertainment } = useTourPlanner();
    const handleEntertainmentToggle = (key) => {
        setEntertainment({
            ...entertainment,
            [key]: !entertainment[key],
        });
        logger.debug(`Entertainment toggled: ${key}`);
    };
    return (_jsx(SectionCard, { icon: "\uD83C\uDF89", iconColor: "ic-pink", title: "Entertainments", description: "Cost calculated as: Rate \u00D7 Number of Vehicles", stepNumber: "STEP 07", animationDelay: "0.44s", children: _jsxs("div", { className: "ent-grid", children: [_jsxs("label", { className: `ent-item ${entertainment.campfire ? 'on' : ''}`, id: "ent_campfire", children: [_jsx("input", { type: "checkbox", checked: entertainment.campfire, onChange: () => handleEntertainmentToggle('campfire') }), _jsx("div", { className: "ent-name", children: "\uD83D\uDD25 Campfire" }), _jsx("div", { className: "ent-cost", children: "\u20B93,000 per vehicle" })] }), _jsxs("label", { className: `ent-item ${entertainment.dj ? 'on' : ''}`, id: "ent_dj", children: [_jsx("input", { type: "checkbox", checked: entertainment.dj, onChange: () => handleEntertainmentToggle('dj') }), _jsx("div", { className: "ent-name", children: "\uD83C\uDFB5 DJ Party" }), _jsx("div", { className: "ent-cost", children: "\u20B94,000 per vehicle" })] })] }) }));
};
