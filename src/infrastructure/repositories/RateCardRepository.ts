/**
 * Infrastructure - Rate Card Repository
 * Implementation for accessing rate card data
 */

import { RATE_CARD } from '@constants/constants';
import { IRateCardRepository } from '@domain/interfaces';

export class RateCardRepository implements IRateCardRepository {
  getVehicleRate(vehicleType: string): any {
    return RATE_CARD.vehicles[vehicleType as keyof typeof RATE_CARD.vehicles];
  }

  getRoomRate(sharing: string, category: string): number {
    const roomRates = RATE_CARD.roomRent[sharing as keyof typeof RATE_CARD.roomRent];
    if (!roomRates) return 0;
    return (roomRates[category as keyof typeof roomRates] as number) || 0;
  }

  getFreshupRate(sharing: string, category: string): number {
    const freshupRates = RATE_CARD.freshup[sharing as keyof typeof RATE_CARD.freshup];
    if (!freshupRates) return 0;
    return (freshupRates[category as keyof typeof freshupRates] as number) || 0;
  }

  getMealRate(meal: string, isVeg: boolean, category: string): number {
    const mealTable = isVeg ? RATE_CARD.foodVeg : RATE_CARD.foodNV;
    const mealRates = mealTable[meal as keyof typeof mealTable];
    if (!mealRates) return 0;
    return (mealRates[category as keyof typeof mealRates] as number) || 0;
  }

  getEntryFee(location: string, category: string): number {
    const entryFees = RATE_CARD.entryFee[location as keyof typeof RATE_CARD.entryFee];
    if (!entryFees) return 0;
    return (entryFees[category as keyof typeof entryFees] as number) || 0;
  }

  getEntertainmentRate(type: string): number {
    return (
      RATE_CARD.entertainment[type as keyof typeof RATE_CARD.entertainment] || 0
    );
  }

  getExtraChargeRate(chargeType: string): number {
    return RATE_CARD.extra[chargeType as keyof typeof RATE_CARD.extra] || 0;
  }
}
