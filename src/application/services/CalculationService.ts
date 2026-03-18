/**
 * Application Services
 * Business logic orchestration layer
 */

import { RATE_CARD, DESTINATIONS } from '@constants/constants';
import { config } from '@config/environment';
import { ICalculationService } from '@domain/interfaces';
import { CostBreakdown } from '@domain/entities/Tour';

export class CalculationService implements ICalculationService {
  calculateCostBreakdown(
    category: string,
    students: number,
    staffs: number,
    days: number,
    nights: number,
    vehicleType: string,
    numVehicles: number
  ): CostBreakdown {
    const totalPax = students + staffs;

    const vehicleCost = this.calculateVehicleCost(vehicleType, numVehicles, days);
    const accommodationCost = 0; // Calculated per night in component
    const mealCost = 0; // Calculated per meal in component
    const entertainmentCost = 0; // Calculated based on selections
    const extraChargesCost = 0; // Calculated based on selections
    const entryFeeCost = 0; // Calculated based on locations
    const freshupCost = 0; // Calculated based on sessions

    const subtotal =
      vehicleCost +
      accommodationCost +
      mealCost +
      entertainmentCost +
      extraChargesCost +
      entryFeeCost +
      freshupCost;

    const profitMargin = subtotal * config.business.profitMargin;
    const grandTotal = subtotal + profitMargin;
    const perHeadCost = students > 0 ? grandTotal / students : 0;

    return {
      vehicleCost,
      accommodationCost,
      mealCost,
      entertainmentCost,
      extraChargesCost,
      entryFeeCost,
      freshupCost,
      subtotal,
      profitMargin,
      grandTotal,
      perHeadCost,
    };
  }

  calculateVehicleCost(
    vehicleType: string,
    numVehicles: number,
    days: number
  ): number {
    const vehicleRate = RATE_CARD.vehicles[vehicleType as keyof typeof RATE_CARD.vehicles];
    if (!vehicleRate) return 0;

    let totalCost = 0;
    for (let d = 0; d < days; d++) {
      const perVehicle =
        vehicleRate.basic +
        vehicleRate.runKm * vehicleRate.perKm;
      totalCost += perVehicle * numVehicles;
    }

    return totalCost;
  }

  calculateEntryFees(
    locations: string[],
    category: string,
    students: number,
    staffs: number
  ): number {
    let total = 0;

    locations.forEach((location) => {
      const entryFee = RATE_CARD.entryFee[location as keyof typeof RATE_CARD.entryFee];
      if (entryFee) {
        const stFee = (entryFee[category as keyof typeof entryFee] || 0) as number;
        const stffFee = (entryFee['CLG' as keyof typeof entryFee] || 0) as number;
        total += stFee * students + stffFee * staffs;
      }
    });

    return total;
  }

  calculateMealCosts(
    days: number,
    meals: any[],
    category: string,
    students: number,
    staffs: number
  ): number {
    let total = 0;
    const totalPax = students + staffs;

    meals.forEach((meal) => {
      if (!meal.selected) return;
      const tbl = meal.isVegetarian ? RATE_CARD.foodVeg : RATE_CARD.foodNV;
      const mealRates = tbl[meal.key as keyof typeof tbl] || {};
      const rate = (mealRates[category as keyof typeof mealRates] as number) || 0;
      total += rate * totalPax * days;
    });

    return total;
  }
}
