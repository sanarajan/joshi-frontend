/**
 * Domain Entities
 * Core business entities with minimal dependencies
 */

export type CustomerCategory = 'KG' | 'LP' | 'UP' | 'HS' | 'HSS' | 'CLG';

export interface TourQuotation {
  id: string;
  schoolName: string;
  enquiryRef: string;
  category: CustomerCategory;
  numStudents: number;
  numStaffs: number;
  numDays: number;
  numNights: number;
  vehicleType: string;
  numVehicles: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CostBreakdown {
  vehicleCost: number;
  accommodationCost: number;
  mealCost: number;
  entertainmentCost: number;
  extraChargesCost: number;
  entryFeeCost: number;
  freshupCost: number;
  subtotal: number;
  profitMargin: number;
  grandTotal: number;
  perHeadCost: number;
}

export interface Vehicle {
  name: string;
  capacity: number;
  basicRate: number;
  perKmRate: number;
  minKm: number;
  runKm: number;
}

export interface Room {
  sharing: number;
  quantity: number;
  ratePerPerson: number;
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'tea' | 'dinner';
  isVegetarian: boolean;
  cost: number;
}

export interface Location {
  name: string;
  entryFee: number;
}

export interface DayItinerary {
  day: number;
  destination: string;
  kilometres: number;
  locations: Location[];
}

export interface TourPackage {
  quotation: TourQuotation;
  itinerary: DayItinerary[];
  costBreakdown: CostBreakdown;
}
