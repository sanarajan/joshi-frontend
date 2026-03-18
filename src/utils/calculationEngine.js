import { RATE_CARD } from './constants';
import { logger } from './logger';
export class CalculationEngine {
    static calculateBreakdown(basicInfo, vehicleType, numVehicles, itineraryData, accommodationData, freshupSharingData, mealsData, entertainmentData, extraChargesData, freshupSharing) {
        const cat = basicInfo.category;
        const students = basicInfo.numStudents;
        const staffs = basicInfo.numStaffs;
        const totalPax = students + staffs;
        const breakdown = {
            vehicle: { label: 'Vehicle Charges', total: 0, details: [] },
            entry: { label: 'Entry Fees', total: 0, details: [] },
            room: { label: 'Room Rent', total: 0, details: [] },
            freshup: { label: 'Fresh-ups', total: 0, details: [] },
            meals: { label: 'Meals', total: 0, details: [] },
            entertainment: { label: 'Entertainments', total: 0, details: [] },
            extra: { label: 'Extra Charges', total: 0, details: [] },
        };
        // 1. VEHICLE COST
        if (vehicleType && RATE_CARD.vehicles[vehicleType]) {
            const vr = RATE_CARD.vehicles[vehicleType];
            const vehicleDetails = [];
            itineraryData.forEach((day) => {
                const km = day.kilometres || 0;
                const extraKm = Math.max(0, km - vr.minKm);
                const perV = vr.basic + extraKm * vr.perKm + vr.runKm * vr.perKm;
                const dayCost = perV * numVehicles;
                breakdown.vehicle.total += dayCost;
                vehicleDetails.push({
                    day: day.day,
                    km,
                    extraKm,
                    perV,
                    dayCost,
                });
            });
            breakdown.vehicle.details = vehicleDetails;
        }
        // 2. ENTRY FEE
        const entryDetails = [];
        itineraryData.forEach((day) => {
            day.locations.forEach((loc) => {
                if (!loc.selected)
                    return;
                const fe = RATE_CARD.entryFee[loc.name];
                if (!fe)
                    return;
                const sf = (fe[cat] || 0) * students;
                const ef = (fe['CLG'] || 0) * staffs;
                const tot = sf + ef;
                breakdown.entry.total += tot;
                entryDetails.push({
                    day: day.day,
                    location: loc.name,
                    studentFee: sf,
                    staffFee: ef,
                    total: tot,
                });
            });
        });
        breakdown.entry.details = entryDetails;
        // 3. ROOM RENT
        const roomDetails = [];
        accommodationData.forEach((night) => {
            if (!night.active)
                return;
            night.rooms.forEach((room) => {
                if (!room.quantity)
                    return;
                const sh = room.sharing;
                const roomRateCard = RATE_CARD.roomRent[sh] || {};
                const rate = roomRateCard[cat] || 0;
                const cost = rate * parseInt(sh) * room.quantity;
                breakdown.room.total += cost;
                roomDetails.push({
                    night: night.night,
                    sharing: sh,
                    rooms: room.quantity,
                    rate,
                    cost,
                });
            });
        });
        breakdown.room.details = roomDetails;
        // 4. FRESH-UPS
        const freshupRateCard = RATE_CARD.freshup[freshupSharing] || {};
        const fuRate = freshupRateCard[cat] || 0;
        const freshupDetails = [];
        freshupSharingData.forEach((day) => {
            day.sessions.forEach((session) => {
                const cost = fuRate * students;
                breakdown.freshup.total += cost;
                freshupDetails.push({
                    day: day.day,
                    session,
                    perHeadRate: fuRate,
                    cost,
                });
            });
        });
        breakdown.freshup.details = freshupDetails;
        // 5. MEALS
        const mealDetails = [];
        mealsData.forEach((day) => {
            day.meals.forEach((meal) => {
                if (!meal.selected)
                    return;
                const tbl = meal.isVegetarian ? RATE_CARD.foodVeg : RATE_CARD.foodNV;
                const mealRates = tbl[meal.key] || {};
                const rate = mealRates[cat] || 0;
                const cost = rate * totalPax;
                breakdown.meals.total += cost;
                mealDetails.push({
                    day: day.day,
                    meal: meal.label,
                    type: meal.isVegetarian ? 'Veg' : 'Non-Veg',
                    rate,
                    cost,
                });
            });
        });
        breakdown.meals.details = mealDetails;
        // 6. ENTERTAINMENT
        const entertainmentDetails = [];
        if (entertainmentData.campfire) {
            const c = RATE_CARD.entertainment.Campfire * numVehicles;
            breakdown.entertainment.total += c;
            entertainmentDetails.push({
                name: 'Campfire',
                rate: RATE_CARD.entertainment.Campfire,
                cost: c,
            });
        }
        if (entertainmentData.dj) {
            const c = RATE_CARD.entertainment['DJ Party'] * numVehicles;
            breakdown.entertainment.total += c;
            entertainmentDetails.push({
                name: 'DJ Party',
                rate: RATE_CARD.entertainment['DJ Party'],
                cost: c,
            });
        }
        breakdown.entertainment.details = entertainmentDetails;
        // 7. EXTRA CHARGES
        const extraDetails = [];
        const extraMap = {
            guide: 'Guide',
            tolls: 'Tolls',
            bata: 'Bata',
            rto: 'RTO',
        };
        extraChargesData.forEach((day) => {
            day.charges.forEach((charge) => {
                if (!charge.selected)
                    return;
                const cost = RATE_CARD.extra[extraMap[charge.key]];
                breakdown.extra.total += cost;
                extraDetails.push({
                    day: day.day,
                    name: extraMap[charge.key],
                    cost,
                });
            });
        });
        breakdown.extra.details = extraDetails;
        logger.info('Calculation completed', {
            vehicleTotal: breakdown.vehicle.total,
            entryTotal: breakdown.entry.total,
            roomTotal: breakdown.room.total,
            freshupTotal: breakdown.freshup.total,
            mealsTotal: breakdown.meals.total,
            entertainmentTotal: breakdown.entertainment.total,
            extraTotal: breakdown.extra.total,
        });
        return { breakdown, details: {} };
    }
    static generateInvoice(basicInfo, vehicleType, numVehicles, breakdown) {
        const subtotal = Object.values(breakdown).reduce((s, b) => s + b.total, 0);
        const profit = subtotal * RATE_CARD.profit;
        const grandTotal = subtotal + profit;
        const perHead = basicInfo.numStudents > 0 ? grandTotal / basicInfo.numStudents : 0;
        return {
            school: basicInfo.schoolName,
            ref: basicInfo.enquiryRef,
            category: basicInfo.category,
            students: basicInfo.numStudents,
            staffs: basicInfo.numStaffs,
            days: basicInfo.numDays,
            nights: basicInfo.numNights,
            vehicleType,
            numVehicles,
            breakdown,
            subtotal,
            profit,
            grandTotal,
            perHead,
            generatedAt: new Date().toISOString(),
        };
    }
}
