import React, { useState } from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import {
  SectionCard,
  FormField,
  DayCard,
  EmptyState,
  Button,
} from './UIComponents';
import { SHARING_OPTIONS } from '@utils/constants';
import { getDbColor } from '@utils/helpers';
import { AccommodationNight } from '@types/index';
import { logger } from '@utils/logger';

interface RoomRowState {
  [key: string]: number;
}

export const Step04Accommodation: React.FC = () => {
  const { accommodation, setAccommodation, planGenerated, basicInfo } = useTourPlanner();
  const [roomCounters, setRoomCounters] = useState<RoomRowState>({});

  if (!planGenerated || basicInfo.numNights === 0) {
    return (
      <SectionCard
        icon="🏨"
        iconColor="ic-amber"
        title="Accommodation"
        description="Night-wise room sharing plan (toggle to opt-out any night)"
        stepNumber="STEP 04"
        animationDelay="0.26s"
      >
        <EmptyState
          icon="fa-solid fa-bed"
          message={
            basicInfo.numNights === 0
              ? '0 nights — no accommodation needed.'
              : 'Generate the trip plan to configure accommodation.'
          }
        />
      </SectionCard>
    );
  }

  const handleToggleNight = (nightIndex: number) => {
    const newAccom = [...accommodation];
    newAccom[nightIndex].active = !newAccom[nightIndex].active;
    setAccommodation(newAccom);
  };

  const handleSharingChange = (nightIndex: number, roomIndex: number, sharing: string) => {
    const newAccom = [...accommodation];
    newAccom[nightIndex].rooms[roomIndex].sharing = sharing;
    setAccommodation(newAccom);
  };

  const handleQuantityChange = (nightIndex: number, roomIndex: number, quantity: number) => {
    const newAccom = [...accommodation];
    newAccom[nightIndex].rooms[roomIndex].quantity = quantity;
    setAccommodation(newAccom);
  };

  const handleAddRoomType = (nightIndex: number) => {
    const newAccom = [...accommodation];
    const roomId = `room_${Date.now()}`;
    newAccom[nightIndex].rooms.push({ id: roomId, sharing: '5', quantity: 0 });
    setAccommodation(newAccom);
  };

  const handleDeleteRoomType = (nightIndex: number, roomIndex: number) => {
    const newAccom = [...accommodation];
    newAccom[nightIndex].rooms.splice(roomIndex, 1);
    setAccommodation(newAccom);
  };

  return (
    <SectionCard
      icon="🏨"
      iconColor="ic-amber"
      title="Accommodation"
      description="Night-wise room sharing plan (toggle to opt-out any night)"
      stepNumber="STEP 04"
      animationDelay="0.26s"
    >
      <div>
        {accommodation.map((night, nightIndex) => (
          <DayCard
            key={night.night}
            dayNumber={night.night}
            colorClass="db-amber"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '12px', color: 'var(--txm)' }}>Room sharing configuration</span>
              <div className="tog-wrap">
                <span style={{ fontSize: '11px', color: 'var(--txd)' }}>Include</span>
                <label className="tog">
                  <input
                    type="checkbox"
                    checked={night.active}
                    onChange={() => handleToggleNight(nightIndex)}
                  />
                  <span className="tog-sl"></span>
                </label>
              </div>
            </div>

            <div className="matrix-hdr">
              <div>Sharing Type</div>
              <div>No. of Rooms</div>
              <div></div>
            </div>

            <div id={`rrows_${night.night}`}>
              {night.rooms.map((room, roomIndex) => (
                <div key={room.id} className="matrix-row">
                  <select
                    className="fc"
                    style={{ padding: '8px 11px' }}
                    value={room.sharing}
                    onChange={(e) => handleSharingChange(nightIndex, roomIndex, e.target.value)}
                  >
                    {SHARING_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} Sharing
                      </option>
                    ))}
                  </select>
                  <input
                    className="fc"
                    type="number"
                    style={{ padding: '8px 11px' }}
                    min="0"
                    value={room.quantity}
                    onChange={(e) => handleQuantityChange(nightIndex, roomIndex, parseInt(e.target.value) || 0)}
                  />
                  <Button
                    variant="delete"
                    onClick={() => handleDeleteRoomType(nightIndex, roomIndex)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="small"
              onClick={() => handleAddRoomType(nightIndex)}
            >
              <i className="fa-solid fa-plus"></i> Add Room Type
            </Button>
          </DayCard>
        ))}
      </div>
    </SectionCard>
  );
};
