import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, FormField, Button, InfoText } from './UIComponents';
import { CATEGORY_LABELS } from '@utils/constants';
import { logger } from '@utils/logger';
export const Step01BasicInfo = ({ onGeneratePlan }) => {
    const { basicInfo, updateBasicInfo } = useTourPlanner();
    const [errors, setErrors] = useState([]);
    const handleCategoryPick = (category) => {
        updateBasicInfo({ category });
        logger.debug(`Category selected: ${category}`);
    };
    const handleGeneratePlan = () => {
        setErrors([]);
        const newErrors = [];
        if (!basicInfo.numDays) {
            newErrors.push('Please enter number of days');
        }
        if (!basicInfo.category) {
            newErrors.push('Please select a customer category');
        }
        if (!basicInfo.numStudents) {
            newErrors.push('Please enter number of students');
        }
        if (newErrors.length > 0) {
            setErrors(newErrors);
            logger.warn('Plan generation validation failed', newErrors);
            return;
        }
        logger.info('Generating trip plan', {
            days: basicInfo.numDays,
            nights: basicInfo.numNights,
            category: basicInfo.category,
        });
        onGeneratePlan();
    };
    return (_jsxs(SectionCard, { icon: "\uD83C\uDFEB", iconColor: "ic-blue", title: "Basic Information", description: "School details, pax count & trip duration", stepNumber: "STEP 01", animationDelay: "0.08s", children: [_jsxs("div", { className: "row", children: [_jsx(FormField, { label: "School / Institution Name", span2: true, children: _jsx("input", { className: "fc", type: "text", placeholder: "e.g. St. Mary's Higher Secondary School", value: basicInfo.schoolName, onChange: (e) => updateBasicInfo({ schoolName: e.target.value }) }) }), _jsx(FormField, { label: "Enquiry Reference No.", children: _jsx("input", { className: "fc", type: "text", placeholder: "e.g. ENQ-2025-001", value: basicInfo.enquiryRef, onChange: (e) => updateBasicInfo({ enquiryRef: e.target.value }) }) })] }), _jsxs("div", { style: { marginBottom: '0.9rem' }, children: [_jsx("label", { style: { fontSize: '10.5px', fontWeight: '600', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--txm)', display: 'block', marginBottom: '7px' }, children: "Customer Category" }), _jsx("div", { className: "cat-wrap", children: Object.keys(CATEGORY_LABELS).map((cat) => (_jsx("div", { className: `cat-pill ${basicInfo.category === cat ? 'active' : ''}`, onClick: () => handleCategoryPick(cat), children: cat }, cat))) }), _jsx(InfoText, { children: "KG = Kinder Garten \u00A0\u00B7\u00A0 LP = Lower Primary \u00A0\u00B7\u00A0 UP = Upper Primary \u00A0\u00B7\u00A0 HS = High School \u00A0\u00B7\u00A0 HSS = Higher Secondary \u00A0\u00B7\u00A0 CLG = College" })] }), _jsxs("div", { className: "row", children: [_jsx(FormField, { label: "No. of Students", children: _jsx("input", { className: "fc", type: "number", min: "1", placeholder: "e.g. 45", value: basicInfo.numStudents || '', onChange: (e) => updateBasicInfo({ numStudents: parseInt(e.target.value) || 0 }) }) }), _jsx(FormField, { label: "No. of Staffs", children: _jsx("input", { className: "fc", type: "number", min: "0", value: basicInfo.numStaffs, placeholder: "e.g. 5", onChange: (e) => updateBasicInfo({ numStaffs: parseInt(e.target.value) || 0 }) }) }), _jsx(FormField, { label: "Trip Duration (Days)", children: _jsx("input", { className: "fc", type: "number", min: "1", max: "30", placeholder: "e.g. 3", value: basicInfo.numDays || '', onChange: (e) => updateBasicInfo({ numDays: parseInt(e.target.value) || 0 }) }) }), _jsx(FormField, { label: "No. of Nights", children: _jsx("input", { className: "fc", type: "number", min: "0", max: "30", value: basicInfo.numNights, placeholder: "e.g. 2", onChange: (e) => updateBasicInfo({ numNights: parseInt(e.target.value) || 0 }) }) })] }), errors.length > 0 && (_jsx("div", { style: { background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.35)', borderRadius: '10px', padding: '10px', marginBottom: '10px', color: '#f87171', fontSize: '12px' }, children: errors.map((err, idx) => (_jsxs("div", { children: ["\u2022 ", err] }, idx))) })), _jsxs(Button, { variant: "primary", onClick: handleGeneratePlan, children: [_jsx("i", { className: "fa-solid fa-wand-magic-sparkles" }), " Generate Trip Plan"] })] }));
};
