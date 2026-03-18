import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  BasicInfo,
  VehicleSelection,
  ItineraryDay,
  AccommodationNight,
  FreshupDay,
  MealDay,
  ExtraChargesDay,
  EntertainmentSelection,
  CustomerCategory,
  RoomType,
  MealItem,
} from '@types/index';

interface TourPlannerContextType {
  basicInfo: BasicInfo;
  setBasicInfo: (info: BasicInfo) => void;
  updateBasicInfo: (partial: Partial<BasicInfo>) => void;
  vehicleSelection: VehicleSelection;
  setVehicleSelection: (selection: VehicleSelection) => void;
  itinerary: ItineraryDay[];
  setItinerary: (itinerary: ItineraryDay[]) => void;
  accommodation: AccommodationNight[];
  setAccommodation: (accommodation: AccommodationNight[]) => void;
  freshups: FreshupDay[];
  setFreshups: (freshups: FreshupDay[]) => void;
  meals: MealDay[];
  setMeals: (meals: MealDay[]) => void;
  entertainment: EntertainmentSelection;
  setEntertainment: (entertainment: EntertainmentSelection) => void;
  extraCharges: ExtraChargesDay[];
  setExtraCharges: (charges: ExtraChargesDay[]) => void;
  planGenerated: boolean;
  setPlanGenerated: (generated: boolean) => void;
  resetAll: () => void;
}

const TourPlannerContext = createContext<TourPlannerContextType | undefined>(undefined);

export const TourPlannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    schoolName: '',
    enquiryRef: '',
    category: 'KG' as CustomerCategory,
    numStudents: 0,
    numStaffs: 0,
    numDays: 0,
    numNights: 0,
  });

  const [vehicleSelection, setVehicleSelection] = useState<VehicleSelection>({
    type: '',
    quantity: 1,
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [accommodation, setAccommodation] = useState<AccommodationNight[]>([]);
  const [freshups, setFreshups] = useState<FreshupDay[]>([]);
  const [meals, setMeals] = useState<MealDay[]>([]);
  const [entertainment, setEntertainment] = useState<EntertainmentSelection>({
    campfire: false,
    dj: false,
  });
  const [extraCharges, setExtraCharges] = useState<ExtraChargesDay[]>([]);
  const [planGenerated, setPlanGenerated] = useState(false);

  const updateBasicInfo = (partial: Partial<BasicInfo>) => {
    setBasicInfo((prev) => ({ ...prev, ...partial }));
  };

  const resetAll = () => {
    setBasicInfo({
      schoolName: '',
      enquiryRef: '',
      category: 'KG' as CustomerCategory,
      numStudents: 0,
      numStaffs: 0,
      numDays: 0,
      numNights: 0,
    });
    setVehicleSelection({ type: '', quantity: 1 });
    setItinerary([]);
    setAccommodation([]);
    setFreshups([]);
    setMeals([]);
    setEntertainment({ campfire: false, dj: false });
    setExtraCharges([]);
    setPlanGenerated(false);
  };

  return (
    <TourPlannerContext.Provider
      value={{
        basicInfo,
        setBasicInfo,
        updateBasicInfo,
        vehicleSelection,
        setVehicleSelection,
        itinerary,
        setItinerary,
        accommodation,
        setAccommodation,
        freshups,
        setFreshups,
        meals,
        setMeals,
        entertainment,
        setEntertainment,
        extraCharges,
        setExtraCharges,
        planGenerated,
        setPlanGenerated,
        resetAll,
      }}
    >
      {children}
    </TourPlannerContext.Provider>
  );
};

export const useTourPlanner = () => {
  const context = useContext(TourPlannerContext);
  if (!context) {
    throw new Error('useTourPlanner must be used within TourPlannerProvider');
  }
  return context;
};
