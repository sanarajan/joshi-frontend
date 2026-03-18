import React from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard } from './UIComponents';
import { logger } from '@utils/logger';

export const Step07Entertainment: React.FC = () => {
  const { entertainment, setEntertainment } = useTourPlanner();

  const handleEntertainmentToggle = (key: 'campfire' | 'dj') => {
    setEntertainment({
      ...entertainment,
      [key]: !entertainment[key],
    });
    logger.debug(`Entertainment toggled: ${key}`);
  };

  return (
    <SectionCard
      icon="🎉"
      iconColor="ic-pink"
      title="Entertainments"
      description="Cost calculated as: Rate × Number of Vehicles"
      stepNumber="STEP 07"
      animationDelay="0.44s"
    >
      <div className="ent-grid">
        <label
          className={`ent-item ${entertainment.campfire ? 'on' : ''}`}
          id="ent_campfire"
        >
          <input
            type="checkbox"
            checked={entertainment.campfire}
            onChange={() => handleEntertainmentToggle('campfire')}
          />
          <div className="ent-name">🔥 Campfire</div>
          <div className="ent-cost">₹3,000 per vehicle</div>
        </label>
        <label className={`ent-item ${entertainment.dj ? 'on' : ''}`} id="ent_dj">
          <input
            type="checkbox"
            checked={entertainment.dj}
            onChange={() => handleEntertainmentToggle('dj')}
          />
          <div className="ent-name">🎵 DJ Party</div>
          <div className="ent-cost">₹4,000 per vehicle</div>
        </label>
      </div>
    </SectionCard>
  );
};
