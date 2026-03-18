import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { formatCurrency, formatDate } from '@utils/helpers';
import { CATEGORY_LABELS } from '@utils/constants';
export const InvoiceComponent = ({ invoice, visible }) => {
    if (!visible || !invoice)
        return null;
    const colorMap = {
        vehicle: '#a78bfa',
        entry: '#fbbf24',
        room: '#34d399',
        freshup: '#22d3ee',
        meals: '#fb923c',
        entertainment: '#f472b6',
        extra: '#f87171',
    };
    const iconMap = {
        vehicle: '🚌',
        entry: '🎟️',
        room: '🏨',
        freshup: '🚿',
        meals: '🍽️',
        entertainment: '🎉',
        extra: '💼',
    };
    return (_jsx("div", { className: "invoice-wrap active", children: _jsxs("div", { className: "inv-card", children: [_jsxs("div", { className: "inv-hdr", children: [_jsx("div", { className: "inv-logo", children: "\u2726 Joshy's Tour Planner \u00B7 Tele-Caller Estimate" }), _jsx("div", { className: "inv-title", children: "Trip Cost Estimate" }), _jsxs("div", { className: "inv-ref", children: ["Ref: ", invoice.ref, " \u00B7 Generated on ", formatDate()] })] }), _jsxs("div", { className: "inv-meta", children: [_jsxs("div", { className: "meta-box", children: [_jsx("div", { className: "meta-lbl", children: "Institution" }), _jsx("div", { className: "meta-val", children: invoice.school || 'N/A' })] }), _jsxs("div", { className: "meta-box", children: [_jsx("div", { className: "meta-lbl", children: "Category" }), _jsx("div", { className: "meta-val", children: CATEGORY_LABELS[invoice.category] || invoice.category })] }), _jsxs("div", { className: "meta-box", children: [_jsx("div", { className: "meta-lbl", children: "Pax" }), _jsxs("div", { className: "meta-val", children: [invoice.students, " Students + ", invoice.staffs, " Staffs"] })] }), _jsxs("div", { className: "meta-box", children: [_jsx("div", { className: "meta-lbl", children: "Duration" }), _jsxs("div", { className: "meta-val", children: [invoice.days, " Days / ", invoice.nights, " Nights"] })] }), _jsxs("div", { className: "meta-box", children: [_jsx("div", { className: "meta-lbl", children: "Vehicle" }), _jsxs("div", { className: "meta-val", children: [invoice.numVehicles, " \u00D7 ", invoice.vehicleType || 'Not Selected'] })] }), _jsxs("div", { className: "meta-box", children: [_jsx("div", { className: "meta-lbl", children: "Enquiry Ref" }), _jsx("div", { className: "meta-val", children: invoice.ref })] })] }), _jsx("div", { className: "divider" }), Object.entries(invoice.breakdown)
                    .filter(([_, component]) => component.total > 0)
                    .map(([key, component]) => (_jsxs("div", { className: "csec", children: [_jsxs("div", { className: "csec-title", style: { color: colorMap[key] }, children: [iconMap[key], " ", component.label] }), component.details &&
                            Array.isArray(component.details) &&
                            component.details.map((detail, idx) => (_jsxs("div", { className: "crow", children: [_jsx("span", { className: "cn", children: renderDetailText(key, detail) }), _jsx("span", { className: "ca", children: formatCurrency(detail.cost || detail.total) })] }, idx))), _jsxs("div", { className: "crow subtot", children: [_jsxs("span", { children: [component.label, " Total"] }), _jsx("span", { children: formatCurrency(component.total) })] })] }, key))), _jsxs("div", { className: "inv-total", children: [_jsxs("div", { className: "tot-row", children: [_jsx("span", { className: "tot-lbl", children: "Base Cost (All Components)" }), _jsx("span", { className: "tot-val", children: formatCurrency(invoice.subtotal) })] }), _jsxs("div", { className: "tot-row", children: [_jsx("span", { className: "tot-lbl", children: "Profit Margin (20%)" }), _jsx("span", { className: "tot-val", style: { color: 'var(--amber)' }, children: formatCurrency(invoice.profit) })] }), _jsx("div", { className: "grand", children: _jsxs("div", { className: "tot-row", children: [_jsx("span", { className: "grand-lbl", children: "Total Trip Cost" }), _jsx("span", { className: "grand-val", children: formatCurrency(invoice.grandTotal) })] }) }), _jsxs("div", { className: "perhead", children: ["Per Head Cost \u00F7 ", invoice.students, " students =", ' ', _jsx("strong", { children: formatCurrency(invoice.perHead) })] })] }), _jsx("div", { className: "inv-foot", children: "This is a preliminary estimate. Final pricing may vary based on availability and season. \u00B7 Joshy's Tours & Travels" })] }) }));
};
function renderDetailText(componentType, detail) {
    switch (componentType) {
        case 'vehicle':
            return `Day ${detail.day} — ${detail.km} km travelled (${detail.extraKm} km extra + 80 km city)`;
        case 'entry':
            return (_jsxs(_Fragment, { children: ["Day ", detail.day, " \u2014 ", detail.location, _jsx("br", {}), _jsx("small", { style: { color: 'var(--txd)' } })] }));
        case 'room':
            return `Night ${detail.night} — ${detail.sharing}-Sharing × ${detail.rooms} rooms`;
        case 'freshup':
            return `Day ${detail.day} — ${detail.session}`;
        case 'meals':
            return `Day ${detail.day} — ${detail.meal} [${detail.type}]`;
        case 'entertainment':
            return `${detail.name}`;
        case 'extra':
            return `Day ${detail.day} — ${detail.name}`;
        default:
            return 'Item';
    }
}
