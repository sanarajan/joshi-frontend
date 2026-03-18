import React, { useState } from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import {
  SectionCard,
  FormField,
  DayCard,
  EmptyState,
  Divider,
  InfoText,
} from './UIComponents';
import { FRESHUP_TIMES, SHARING_OPTIONS } from '@utils/constants';
import { getDbColor } from '@utils/helpers';
import { logger } from '@utils/logger';

export const Step05Freshups: React.FC = () => {
  const { freshups, setFreshups, planGenerated, basicInfo } = useTourPlanner();
  const [freshupSharing, setFreshupSharing] = useState<string>('5');

  if (!planGenerated) {
    return (
      <SectionCard
        icon="🚿"
        iconColor="ic-cyan"
        title="Fresh-ups"
        description="Day-wise refreshment stops — select time slots"
        stepNumber="STEP 05"
        animationDelay="0.32s"
      >
        <EmptyState
          icon="fa-solid fa-shower"
          message="Generate the trip plan to configure fresh-ups."
        />
      </SectionCard>
    );
  }

  const handleSessionToggle = (dayIndex: number, session: string) => {
    const newFreshups = [...freshups];
    const idx = newFreshups[dayIndex].sessions.indexOf(session);
    if (idx > -1) {
      newFreshups[dayIndex].sessions.splice(idx, 1);
    } else {
      newFreshups[dayIndex].sessions.push(session);
    }
    setFreshups(newFreshups);
    logger.debug(`Session toggled for day ${dayIndex + 1}: ${session}`);
  };

  return (
    <SectionCard
      icon="🚿"
      iconColor="ic-cyan"
      title="Fresh-ups"
      description="Day-wise refreshment stops — select time slots"
      stepNumber="STEP 05"
      animationDelay="0.32s"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <FormField label="Fresh-up Sharing Type (for rate)">
          <select
            className="fc"
            value={freshupSharing}
            onChange={(e) => setFreshupSharing(e.target.value)}
            style={{ maxWidth: '200px' }}
          >
            {SHARING_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt} Sharing
              </option>
            ))}
          </select>
        </FormField>
        <InfoText>
          Select sharing to determine the per-head fresh-up rate from the rate card.
        </InfoText>
      </div>
      <Divider />

      <div>
        {freshups.map((day, dayIndex) => (
          <DayCard
            key={day.day}
            dayNumber={day.day}
            colorClass={getDbColor(dayIndex)}
          >
            <div style={{ fontSize: '12px', color: 'var(--txm)', marginBottom: '10px' }}>
              Choose fresh-up sessions
            </div>
            <div className="pill-row">
              {FRESHUP_TIMES.map((time) => (
                <label
                  key={time}
                  className={`check-pill ${day.sessions.includes(time) ? 'on' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={day.sessions.includes(time)}
                    onChange={() => handleSessionToggle(dayIndex, time)}
                  />
                  <span className="pill-dot"></span>
                  {time}
                </label>
              ))}
            </div>
          </DayCard>
        ))}
      </div>
    </SectionCard>
  );
};
