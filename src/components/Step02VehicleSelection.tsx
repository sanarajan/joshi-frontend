import React from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, FormField, InfoText } from './UIComponents';
import { RATE_CARD } from '@utils/constants';
import { logger } from '@utils/logger';

export const Step02VehicleSelection: React.FC = () => {
  const { vehicleSelection, setVehicleSelection } = useTourPlanner();

  const handleVehicleChange = (type: string) => {
    setVehicleSelection({ ...vehicleSelection, type });
    logger.debug(`Vehicle selected: ${type}`);
  };

  const handleQuantityChange = (quantity: number) => {
    setVehicleSelection({ ...vehicleSelection, quantity });
  };

  return (
    <SectionCard
      icon="🚌"
      iconColor="ic-purple"
      title="Vehicle Selection"
      description="Transport type & fleet count"
      stepNumber="STEP 02"
      animationDelay="0.14s"
    >
      <div className="row">
        <FormField label="Vehicle Type" span2>
          <select
            className="fc"
            value={vehicleSelection.type}
            onChange={(e) => handleVehicleChange(e.target.value)}
          >
            <option value="">— Select Vehicle —</option>
            {Object.entries(RATE_CARD.vehicles).map(([name]) => (
              <option key={name} value={name}>
                {name.includes('BUS')
                  ? `Bus — ${name.split(' ')[1]}`
                  : `Traveller — ${name.split(' ')[1]}`}{' '}
                | ₹
                {RATE_CARD.vehicles[name as keyof typeof RATE_CARD.vehicles].basic}/day +
                ₹
                {RATE_CARD.vehicles[name as keyof typeof RATE_CARD.vehicles].perKm}/km
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="No. of Vehicles">
          <input
            className="fc"
            type="number"
            min="1"
            value={vehicleSelection.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          />
        </FormField>
      </div>
      <InfoText>
        ℹ️ First 100 KM/day included in basic rent. An additional 80 KM/day is auto-added for city
        travel. Enter daily trip KM in the itinerary below.
      </InfoText>
    </SectionCard>
  );
};
