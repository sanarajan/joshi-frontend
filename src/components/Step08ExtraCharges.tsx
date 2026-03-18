import React from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import {
  SectionCard,
  DayCard,
  EmptyState,
} from './UIComponents';
import { EXTRA_CHARGES } from '@utils/constants';
import { getDbColor } from '@utils/helpers';
import { logger } from '@utils/logger';

export const Step08ExtraCharges: React.FC = () => {
  const { extraCharges, setExtraCharges, planGenerated } = useTourPlanner();

  if (!planGenerated) {
    return (
      <SectionCard
        icon="💼"
        iconColor="ic-red"
        title="Extra Charges"
        description="Day-wise: Guide, Tolls, Bata & RTO"
        stepNumber="STEP 08"
        animationDelay="0.5s"
      >
        <EmptyState
          icon="fa-solid fa-receipt"
          message="Generate the trip plan to configure extra charges."
        />
      </SectionCard>
    );
  }

  const handleChargeToggle = (dayIndex: number, chargeIndex: number) => {
    const newCharges = [...extraCharges];
    newCharges[dayIndex].charges[chargeIndex].selected =
      !newCharges[dayIndex].charges[chargeIndex].selected;
    setExtraCharges(newCharges);
    logger.debug(`Extra charge toggled for day ${dayIndex + 1}`);
  };

  return (
    <SectionCard
      icon="💼"
      iconColor="ic-red"
      title="Extra Charges"
      description="Day-wise: Guide, Tolls, Bata & RTO"
      stepNumber="STEP 08"
      animationDelay="0.5s"
    >
      <div>
        {extraCharges.map((day, dayIndex) => (
          <DayCard
            key={day.day}
            dayNumber={day.day}
            colorClass={getDbColor(dayIndex)}
          >
            <div style={{ fontSize: '12px', color: 'var(--txm)', marginBottom: '10px' }}>
              Select applicable charges
            </div>
            <div className="ext-grid">
              {day.charges.map((charge, chargeIndex) => {
                const chargeInfo = EXTRA_CHARGES.find((c) => c.key === charge.key);
                return (
                  <label
                    key={charge.key}
                    className={`ext-item ${charge.selected ? 'on' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={charge.selected}
                      onChange={() => handleChargeToggle(dayIndex, chargeIndex)}
                    />
                    <div className="ext-icon">{chargeInfo?.icon}</div>
                    <div className="ext-name">{chargeInfo?.label}</div>
                    <div className="ext-cost">{chargeInfo?.cost}</div>
                  </label>
                );
              })}
            </div>
          </DayCard>
        ))}
      </div>
    </SectionCard>
  );
};
