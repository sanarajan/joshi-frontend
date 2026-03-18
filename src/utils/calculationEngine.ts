import { RATE_CARD, DESTINATIONS } from './constants';
import { Invoice, CalculationBreakdown, BasicInfo, CostComponent } from '@types/index';
import { logger } from './logger';

interface VehicleCostDetail {
  day: number;
  km: number;
  extraKm: number;
  perV: number;
  dayCost: number;
}

interface EntryCostDetail {
  day: number;
  location: string;
  studentFee: number;
  staffFee: number;
  total: number;
}

interface RoomCostDetail {
  night: number;
  sharing: string;
  rooms: number;
  rate: number;
  cost: number;
}

interface FreshupCostDetail {
  day: number;
  session: string;
  perHeadRate: number;
  cost: number;
}

interface MealCostDetail {
  day: number;
  meal: string;
  type: string;
  rate: number;
  cost: number;
}

interface EntertainmentCostDetail {
  name: string;
  rate: number;
  cost: number;
}

interface ExtraCostDetail {
  day: number;
  name: string;
  cost: number;
}

export class CalculationEngine {
  static calculateBreakdown(
    basicInfo: BasicInfo,
    vehicleType: string,
    numVehicles: number,
    itineraryData: any[],
    accommodationData: any[],
    freshupSharingData: any[],
    mealsData: any[],
    entertainmentData: any,
    extraChargesData: any[],
    freshupSharing: string
  ): { breakdown: CalculationBreakdown; details: any } {
    const cat = basicInfo.category;
    const students = basicInfo.numStudents;
    const staffs = basicInfo.numStaffs;
    const totalPax = students + staffs;

    const breakdown: CalculationBreakdown = {
      vehicle: { label: 'Vehicle Charges', total: 0, details: [] },
      entry: { label: 'Entry Fees', total: 0, details: [] },
      room: { label: 'Room Rent', total: 0, details: [] },
      freshup: { label: 'Fresh-ups', total: 0, details: [] },
      meals: { label: 'Meals', total: 0, details: [] },
      entertainment: { label: 'Entertainments', total: 0, details: [] },
      extra: { label: 'Extra Charges', total: 0, details: [] },
    };

    // 1. VEHICLE COST
    if (vehicleType && RATE_CARD.vehicles[vehicleType as keyof typeof RATE_CARD.vehicles]) {
      const vr = RATE_CARD.vehicles[vehicleType as keyof typeof RATE_CARD.vehicles];
      const vehicleDetails: VehicleCostDetail[] = [];

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
    const entryDetails: EntryCostDetail[] = [];
    itineraryData.forEach((day) => {
      day.locations.forEach((loc: any) => {
        if (!loc.selected) return;
        const fe = RATE_CARD.entryFee[loc.name as keyof typeof RATE_CARD.entryFee];
        if (!fe) return;
        const sf = (fe[cat as keyof typeof fe] || 0) * students;
        const ef = (fe['CLG' as keyof typeof fe] || 0) * staffs;
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
    const roomDetails: RoomCostDetail[] = [];
    accommodationData.forEach((night) => {
      if (!night.active) return;
      night.rooms.forEach((room: any) => {
        if (!room.quantity) return;
        const sh = room.sharing;
        const roomRateCard = RATE_CARD.roomRent[sh as keyof typeof RATE_CARD.roomRent] || {};
        const rate = (roomRateCard[cat as keyof typeof roomRateCard] as number) || 0;
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
    const freshupRateCard = RATE_CARD.freshup[freshupSharing as keyof typeof RATE_CARD.freshup] || {};
    const fuRate = (freshupRateCard[cat as keyof typeof freshupRateCard] as number) || 0;
    const freshupDetails: FreshupCostDetail[] = [];
    freshupSharingData.forEach((day) => {
      day.sessions.forEach((session: string) => {
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
    const mealDetails: MealCostDetail[] = [];
    mealsData.forEach((day) => {
      day.meals.forEach((meal: any) => {
        if (!meal.selected) return;
        const tbl = meal.isVegetarian ? RATE_CARD.foodVeg : RATE_CARD.foodNV;
        const mealRates = tbl[meal.key as keyof typeof tbl] || {};
        const rate = (mealRates[cat as keyof typeof mealRates] as number) || 0;
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
    const entertainmentDetails: EntertainmentCostDetail[] = [];
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
    const extraDetails: ExtraCostDetail[] = [];
    const extraMap: Record<string, string> = {
      guide: 'Guide',
      tolls: 'Tolls',
      bata: 'Bata',
      rto: 'RTO',
    };
    extraChargesData.forEach((day) => {
      day.charges.forEach((charge: any) => {
        if (!charge.selected) return;
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

  static generateInvoice(
    basicInfo: BasicInfo,
    vehicleType: string,
    numVehicles: number,
    breakdown: CalculationBreakdown
  ): Invoice {
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
