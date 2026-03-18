import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, DayCard, EmptyState, Button, } from './UIComponents';
import { SHARING_OPTIONS } from '@utils/constants';
export const Step04Accommodation = () => {
    const { accommodation, setAccommodation, planGenerated, basicInfo } = useTourPlanner();
    const [roomCounters, setRoomCounters] = useState({});
    if (!planGenerated || basicInfo.numNights === 0) {
        return (_jsx(SectionCard, { icon: "\uD83C\uDFE8", iconColor: "ic-amber", title: "Accommodation", description: "Night-wise room sharing plan (toggle to opt-out any night)", stepNumber: "STEP 04", animationDelay: "0.26s", children: _jsx(EmptyState, { icon: "fa-solid fa-bed", message: basicInfo.numNights === 0
                    ? '0 nights — no accommodation needed.'
                    : 'Generate the trip plan to configure accommodation.' }) }));
    }
    const handleToggleNight = (nightIndex) => {
        const newAccom = [...accommodation];
        newAccom[nightIndex].active = !newAccom[nightIndex].active;
        setAccommodation(newAccom);
    };
    const handleSharingChange = (nightIndex, roomIndex, sharing) => {
        const newAccom = [...accommodation];
        newAccom[nightIndex].rooms[roomIndex].sharing = sharing;
        setAccommodation(newAccom);
    };
    const handleQuantityChange = (nightIndex, roomIndex, quantity) => {
        const newAccom = [...accommodation];
        newAccom[nightIndex].rooms[roomIndex].quantity = quantity;
        setAccommodation(newAccom);
    };
    const handleAddRoomType = (nightIndex) => {
        const newAccom = [...accommodation];
        const roomId = `room_${Date.now()}`;
        newAccom[nightIndex].rooms.push({ id: roomId, sharing: '5', quantity: 0 });
        setAccommodation(newAccom);
    };
    const handleDeleteRoomType = (nightIndex, roomIndex) => {
        const newAccom = [...accommodation];
        newAccom[nightIndex].rooms.splice(roomIndex, 1);
        setAccommodation(newAccom);
    };
    return (_jsx(SectionCard, { icon: "\uD83C\uDFE8", iconColor: "ic-amber", title: "Accommodation", description: "Night-wise room sharing plan (toggle to opt-out any night)", stepNumber: "STEP 04", animationDelay: "0.26s", children: _jsx("div", { children: accommodation.map((night, nightIndex) => (_jsxs(DayCard, { dayNumber: night.night, colorClass: "db-amber", children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }, children: [_jsx("span", { style: { fontSize: '12px', color: 'var(--txm)' }, children: "Room sharing configuration" }), _jsxs("div", { className: "tog-wrap", children: [_jsx("span", { style: { fontSize: '11px', color: 'var(--txd)' }, children: "Include" }), _jsxs("label", { className: "tog", children: [_jsx("input", { type: "checkbox", checked: night.active, onChange: () => handleToggleNight(nightIndex) }), _jsx("span", { className: "tog-sl" })] })] })] }), _jsxs("div", { className: "matrix-hdr", children: [_jsx("div", { children: "Sharing Type" }), _jsx("div", { children: "No. of Rooms" }), _jsx("div", {})] }), _jsx("div", { id: `rrows_${night.night}`, children: night.rooms.map((room, roomIndex) => (_jsxs("div", { className: "matrix-row", children: [_jsx("select", { className: "fc", style: { padding: '8px 11px' }, value: room.sharing, onChange: (e) => handleSharingChange(nightIndex, roomIndex, e.target.value), children: SHARING_OPTIONS.map((opt) => (_jsxs("option", { value: opt, children: [opt, " Sharing"] }, opt))) }), _jsx("input", { className: "fc", type: "number", style: { padding: '8px 11px' }, min: "0", value: room.quantity, onChange: (e) => handleQuantityChange(nightIndex, roomIndex, parseInt(e.target.value) || 0) }), _jsx(Button, { variant: "delete", onClick: () => handleDeleteRoomType(nightIndex, roomIndex), children: _jsx("i", { className: "fa-solid fa-trash-can" }) })] }, room.id))) }), _jsxs(Button, { variant: "small", onClick: () => handleAddRoomType(nightIndex), children: [_jsx("i", { className: "fa-solid fa-plus" }), " Add Room Type"] })] }, night.night))) }) }));
};
