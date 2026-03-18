export type CustomerCategory = 'KG' | 'LP' | 'UP' | 'HS' | 'HSS' | 'CLG';

export interface BasicInfo {
  schoolName: string;
  enquiryRef: string;
  category: CustomerCategory;
  numStudents: number;
  numStaffs: number;
  numDays: number;
  numNights: number;
}

export interface ItineraryDay {
  day: number;
  destination: string;
  kilometres: number;
  locations: ItineraryLocation[];
}

export interface ItineraryLocation {
  name: string;
  selected: boolean;
  hasFee: boolean;
}

export interface AccommodationNight {
  night: number;
  active: boolean;
  rooms: RoomType[];
}

export interface RoomType {
  id: string;
  sharing: string;
  quantity: number;
}

export interface FreshupDay {
  day: number;
  sessions: string[];
}

export interface MealDay {
  day: number;
  meals: MealItem[];
}

export interface MealItem {
  key: string;
  label: string;
  selected: boolean;
  isVegetarian: boolean;
}

export interface ExtraChargesDay {
  day: number;
  charges: ExtraCharge[];
}

export interface ExtraCharge {
  key: string;
  selected: boolean;
}

export interface VehicleSelection {
  type: string;
  quantity: number;
}

export interface EntertainmentSelection {
  campfire: boolean;
  dj: boolean;
}

export interface CalculationBreakdown {
  vehicle: CostComponent;
  entry: CostComponent;
  room: CostComponent;
  freshup: CostComponent;
  meals: CostComponent;
  entertainment: CostComponent;
  extra: CostComponent;
}

export interface CostComponent {
  label: string;
  total: number;
  details: unknown[];
}

export interface Invoice {
  school: string;
  ref: string;
  category: CustomerCategory;
  students: number;
  staffs: number;
  days: number;
  nights: number;
  vehicleType: string;
  numVehicles: number;
  breakdown: CalculationBreakdown;
  subtotal: number;
  profit: number;
  grandTotal: number;
  perHead: number;
  generatedAt: string;
}

export interface StepState {
  basicInfo: BasicInfo;
  vehicleSelection: VehicleSelection;
  itinerary: ItineraryDay[];
  accommodation: AccommodationNight[];
  freshups: FreshupDay[];
  meals: MealDay[];
  entertainment: EntertainmentSelection;
  extraCharges: ExtraChargesDay[];
}
