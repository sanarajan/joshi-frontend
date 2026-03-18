import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PageHeader = ({ title, subtitle }) => {
    return (_jsxs("div", { className: "page-hdr", children: [_jsxs("div", { className: "badge", children: [_jsx("i", { className: "fa-solid fa-headset" }), " Tele-Caller Portal"] }), _jsx("h1", { children: title }), _jsx("p", { children: subtitle })] }));
};
export const SectionCard = ({ icon, iconColor, title, description, stepNumber, children, animationDelay = '0s', }) => {
    return (_jsxs("div", { className: "sc", style: { animationDelay }, children: [_jsxs("div", { className: "sc-hdr", children: [_jsx("div", { className: `sc-icon ${iconColor}`, children: icon }), _jsxs("div", { children: [_jsx("h2", { children: title }), _jsx("p", { children: description })] }), _jsx("div", { className: "step-badge", children: stepNumber })] }), _jsx("div", { className: "sc-body", children: children })] }));
};
export const DayCard = ({ dayNumber, colorClass, children }) => {
    return (_jsxs("div", { className: "dc", children: [_jsxs("div", { className: "dc-hdr", children: [_jsxs("div", { className: `dbadge ${colorClass}`, children: ["Day ", dayNumber] }), _jsxs("span", { style: { fontSize: '12px', color: 'var(--txm)' }, children: ["Configuration for Day ", dayNumber] })] }), children] }));
};
export const FormField = ({ label, children, span2 = false }) => {
    return (_jsxs("div", { className: `fld ${span2 ? 'span2' : ''}`, children: [_jsx("label", { children: label }), children] }));
};
export const Button = ({ onClick, disabled = false, variant = 'primary', children, }) => {
    let className = 'btn';
    if (variant === 'primary')
        className += ' btn-gen';
    else if (variant === 'secondary')
        className += ' btn-add';
    else if (variant === 'small')
        className += ' btn-sm btn-add';
    else if (variant === 'delete')
        className += ' btn-del';
    return (_jsx("button", { className: className, onClick: onClick, disabled: disabled, children: children }));
};
export const Divider = () => _jsx("div", { className: "divider" });
export const InfoText = ({ children }) => {
    return _jsx("div", { className: "info", children: children });
};
export const EmptyState = ({ icon, message }) => {
    return (_jsxs("div", { className: "empty-state", children: [_jsx("i", { className: `fa-solid ${icon}` }), message] }));
};
