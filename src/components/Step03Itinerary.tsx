import React from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import {
  SectionCard,
  FormField,
  DayCard,
  EmptyState,
  Button,
} from './UIComponents';
import { DESTINATIONS, DB_COLORS, RATE_CARD } from '@utils/constants';
import { getDbColor } from '@utils/helpers';
import { ItineraryDay, ItineraryLocation } from '@types/index';
import { logger } from '@utils/logger';

export const Step03Itinerary: React.FC = () => {
  const { itinerary, setItinerary, planGenerated, basicInfo } = useTourPlanner();

  const handleDestinationChange = (dayIndex: number, destination: string) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].destination = destination;
    if (destination) {
      const locations = DESTINATIONS[destination as keyof typeof DESTINATIONS].locations;
      newItinerary[dayIndex].locations = locations.map((loc) => ({
        name: loc,
        selected: false,
        hasFee: Object.values(RATE_CARD.entryFee[loc] || {}).some((v) => v > 0),
      }));
    } else {
      newItinerary[dayIndex].locations = [];
    }
    setItinerary(newItinerary);
    logger.debug(`Destination changed for day ${dayIndex + 1}: ${destination}`);
  };

  const handleKmsChange = (dayIndex: number, kms: number) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].kilometres = kms;
    setItinerary(newItinerary);
  };

  const handleLocationToggle = (dayIndex: number, locationIndex: number) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].locations[locationIndex].selected =
      !newItinerary[dayIndex].locations[locationIndex].selected;
    setItinerary(newItinerary);
  };

  if (!planGenerated) {
    return (
      <SectionCard
        icon="🗺️"
        iconColor="ic-green"
        title="Day-wise Itinerary"
        description="Destinations, KM & tourist spots with entry fees"
        stepNumber="STEP 03"
        animationDelay="0.2s"
      >
        <EmptyState icon="fa-regular fa-calendar-days" message="Generate the trip plan to build the day-wise itinerary." />
      </SectionCard>
    );
  }

  return (
    <SectionCard
      icon="🗺️"
      iconColor="ic-green"
      title="Day-wise Itinerary"
      description="Destinations, KM & tourist spots with entry fees"
      stepNumber="STEP 03"
      animationDelay="0.2s"
    >
      <div>
        {itinerary.map((day, dayIndex) => (
          <DayCard
            key={day.day}
            dayNumber={day.day}
            colorClass={getDbColor(dayIndex)}
          >
            <div className="row" style={{ marginBottom: '0.7rem' }}>
              <FormField label={`Destination for Day ${day.day}`}>
                <select
                  className="fc"
                  value={day.destination}
                  onChange={(e) => handleDestinationChange(dayIndex, e.target.value)}
                >
                  <option value="">— Select Destination —</option>
                  {Object.keys(DESTINATIONS).map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label={`Total Kilometres (Day ${day.day})`}>
                <input
                  className="fc"
                  type="number"
                  min="0"
                  placeholder="e.g. 150"
                  value={day.kilometres || ''}
                  onChange={(e) => handleKmsChange(dayIndex, parseInt(e.target.value) || 0)}
                />
              </FormField>
            </div>

            {day.locations.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: 'var(--txd)',
                    marginBottom: '7px',
                  }}
                >
                  Tourist Spots in {day.destination}
                </div>
                <div className="loc-grid">
                  {day.locations.map((loc, locIndex) => (
                    <label key={loc.name} className={`loc-item ${loc.selected ? 'on' : ''}`}>
                      <input
                        type="checkbox"
                        checked={loc.selected}
                        onChange={() => handleLocationToggle(dayIndex, locIndex)}
                      />
                      <span className="loc-dot"></span>
                      <span style={{ flex: 1 }}>{loc.name}</span>
                      <span style={{ fontSize: '10px', color: 'var(--txd)' }}>
                        {loc.hasFee ? '(entry incl.)' : 'Free'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </DayCard>
        ))}
      </div>
    </SectionCard>
  );
};
