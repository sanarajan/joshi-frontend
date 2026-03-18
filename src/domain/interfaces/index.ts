/**
 * Domain Interfaces
 * Contracts for repositories and services
 */

import { TourQuotation, CostBreakdown } from '../entities/Tour';

export interface ITourRepository {
  save(quotation: TourQuotation): Promise<void>;
  findById(id: string): Promise<TourQuotation | null>;
  delete(id: string): Promise<void>;
}

export interface ICalculationService {
  calculateCostBreakdown(
    category: string,
    students: number,
    staffs: number,
    days: number,
    nights: number,
    vehicleType: string,
    numVehicles: number
  ): CostBreakdown;

  calculateVehicleCost(
    vehicleType: string,
    numVehicles: number,
    days: number
  ): number;

  calculateEntryFees(
    locations: string[],
    category: string,
    students: number,
    staffs: number
  ): number;

  calculateMealCosts(
    days: number,
    meals: any[],
    category: string,
    students: number,
    staffs: number
  ): number;
}

export interface IRateCardRepository {
  getVehicleRate(vehicleType: string): any;
  getRoomRate(sharing: string, category: string): number;
  getFreshupRate(sharing: string, category: string): number;
  getMealRate(meal: string, isVeg: boolean, category: string): number;
  getEntryFee(location: string, category: string): number;
  getEntertainmentRate(type: string): number;
  getExtraChargeRate(chargeType: string): number;
}

export interface ILogger {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
  getLogs(): any[];
  clearLogs(): void;
  exportLogs(): string;
}
