import React, { useState } from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, FormField, Button, InfoText } from './UIComponents';
import { CATEGORY_LABELS } from '@constants/constants';
import { MESSAGES, UI_TEXT } from '@constants/messages';
import { logger } from '@utils/logger';

interface Step01Props {
  onGeneratePlan: () => void;
}

export const Step01BasicInfo: React.FC<Step01Props> = ({ onGeneratePlan }) => {
  const { basicInfo, updateBasicInfo } = useTourPlanner();
  const [errors, setErrors] = useState<string[]>([]);

  const handleCategoryPick = (category: 'KG' | 'LP' | 'UP' | 'HS' | 'HSS' | 'CLG') => {
    updateBasicInfo({ category });
    logger.debug(`Category selected: ${category}`);
  };

  const handleGeneratePlan = () => {
    setErrors([]);
    const newErrors: string[] = [];

    if (!basicInfo.numDays) {
      newErrors.push(MESSAGES.VALIDATION.REQUIRED_DAYS);
    }
    if (!basicInfo.category) {
      newErrors.push(MESSAGES.VALIDATION.REQUIRED_CATEGORY);
    }
    if (!basicInfo.numStudents) {
      newErrors.push(MESSAGES.VALIDATION.REQUIRED_STUDENTS);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      logger.warn('Plan generation validation failed', newErrors);
      return;
    }

    logger.info('Generating trip plan', {
      days: basicInfo.numDays,
      nights: basicInfo.numNights,
      category: basicInfo.category,
    });
    onGeneratePlan();
  };

  return (
    <SectionCard
      icon="🏫"
      iconColor="ic-blue"
      title="Basic Information"
      description={MESSAGES.STEP_DESCRIPTIONS.BASIC_INFO}
      stepNumber="STEP 01"
      animationDelay="0.08s"
    >
      <div className="row">
        <FormField label={MESSAGES.LABELS.SCHOOL_NAME} span2>
          <input
            className="fc"
            type="text"
            placeholder={MESSAGES.PLACEHOLDERS.SCHOOL_NAME}
            value={basicInfo.schoolName}
            onChange={(e) => updateBasicInfo({ schoolName: e.target.value })}
          />
        </FormField>
        <FormField label={MESSAGES.LABELS.ENQUIRY_REF}>
          <input
            className="fc"
            type="text"
            placeholder={MESSAGES.PLACEHOLDERS.ENQUIRY_REF}
            value={basicInfo.enquiryRef}
            onChange={(e) => updateBasicInfo({ enquiryRef: e.target.value })}
          />
        </FormField>
      </div>

      <div style={{ marginBottom: '0.9rem' }}>
        <label style={{ fontSize: '10.5px', fontWeight: '600', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--txm)', display: 'block', marginBottom: '7px' }}>
          {MESSAGES.LABELS.CUSTOMER_CATEGORY}
        </label>
        <div className="cat-wrap">
          {(Object.keys(CATEGORY_LABELS) as Array<'KG' | 'LP' | 'UP' | 'HS' | 'HSS' | 'CLG'>).map((cat) => (
            <div
              key={cat}
              className={`cat-pill ${basicInfo.category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryPick(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
        <InfoText>
          {MESSAGES.CATEGORY_INFO}
        </InfoText>
      </div>

      <div className="row">
        <FormField label={MESSAGES.LABELS.NO_STUDENTS}>
          <input
            className="fc"
            type="number"
            min="1"
            placeholder={MESSAGES.PLACEHOLDERS.NO_STUDENTS}
            value={basicInfo.numStudents || ''}
            onChange={(e) => updateBasicInfo({ numStudents: parseInt(e.target.value) || 0 })}
          />
        </FormField>
        <FormField label={MESSAGES.LABELS.NO_STAFFS}>
          <input
            className="fc"
            type="number"
            min="0"
            value={basicInfo.numStaffs}
            placeholder={MESSAGES.PLACEHOLDERS.NO_STAFFS}
            onChange={(e) => updateBasicInfo({ numStaffs: parseInt(e.target.value) || 0 })}
          />
        </FormField>
        <FormField label={MESSAGES.LABELS.TRIP_DURATION}>
          <input
            className="fc"
            type="number"
            min="1"
            max="30"
            placeholder={MESSAGES.PLACEHOLDERS.TRIP_DURATION}
            value={basicInfo.numDays || ''}
            onChange={(e) => updateBasicInfo({ numDays: parseInt(e.target.value) || 0 })}
          />
        </FormField>
        <FormField label={MESSAGES.LABELS.NO_NIGHTS}>
          <input
            className="fc"
            type="number"
            min="0"
            max="30"
            value={basicInfo.numNights}
            placeholder={MESSAGES.PLACEHOLDERS.NO_NIGHTS}
            onChange={(e) => updateBasicInfo({ numNights: parseInt(e.target.value) || 0 })}
          />
        </FormField>
      </div>

      {errors.length > 0 && (
        <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.35)', borderRadius: '10px', padding: '10px', marginBottom: '10px', color: '#f87171', fontSize: '12px' }}>
          {errors.map((err, idx) => (
            <div key={idx}>• {err}</div>
          ))}
        </div>
      )}

      <Button variant="primary" onClick={handleGeneratePlan}>
        <i className="fa-solid fa-wand-magic-sparkles"></i> {MESSAGES.BUTTONS.GENERATE_PLAN}
      </Button>
    </SectionCard>
  );
};
