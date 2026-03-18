# Quick Reference Card

## 🚀 Commands

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview built app
npm run lint       # Check code
npm run lint:fix   # Fix lint issues
```

---

## 📍 Import Aliases

```typescript
// Constants & Messages
import { MESSAGES, UI_TEXT } from '@constants/messages';
import { RATE_CARD, DESTINATIONS } from '@constants/constants';

// Configuration
import { config } from '@config/environment';

// Utilities
import { logger } from '@utils/logger';
import { formatCurrency, getDbColor } from '@utils/helpers';

// Architecture Layers
import { CalculationService } from '@application/services/CalculationService';
import { RateCardRepository } from '@infrastructure/repositories/RateCardRepository';
import { MainLayout } from '@presentation/layouts/MainLayout';
import { Tour } from '@domain/entities/Tour';

// React
import { useTourPlanner } from '@context/TourPlannerContext';
import type { TourQuotation } from '@types/index';
```

---

## 🎯 Common Operations

### Using Messages
```typescript
import { MESSAGES } from '@constants/messages';

// Validation
if (!value) alert(MESSAGES.VALIDATION.REQUIRED_DAYS);

// Buttons
<button>{MESSAGES.BUTTONS.CALCULATE}</button>

// Labels
<label>{MESSAGES.LABELS.SCHOOL_NAME}</label>

// Info
<div>{MESSAGES.INFO.VEHICLE_INFO}</div>

// Errors
catch (e) alert(MESSAGES.ERROR.CALCULATION_FAILED);
```

### Using Config
```typescript
import { config } from '@config/environment';

const appName = config.app.name;           // from .env
const profit = config.business.profitMargin;  // from .env
const logging = config.logging.enabled;    // from .env
```

### Using Logger
```typescript
import { logger } from '@utils/logger';

logger.debug('Debug message', { data: 'value' });
logger.info('Info message', { status: 'success' });
logger.warn('Warning message', { issue: 'something' });
logger.error('Error message', error);

// Access logs
const logs = logger.getLogs();
const exported = logger.exportLogs();
```

### Form Fields
```typescript
import { SectionCard, FormField, Button, InfoText } from '@components/UIComponents';

<SectionCard
  icon="🏫"
  title="Title"
  description={MESSAGES.STEP_DESCRIPTIONS.BASIC_INFO}
  stepNumber="STEP 01"
>
  <FormField label={MESSAGES.LABELS.SCHOOL_NAME}>
    <input placeholder={MESSAGES.PLACEHOLDERS.SCHOOL_NAME} />
  </FormField>

  <Button variant="primary" onClick={handleClick}>
    <i className="fa-solid fa-icon"></i> {MESSAGES.BUTTONS.CALCULATE}
  </Button>

  <InfoText>{MESSAGES.INFO.VEHICLE_INFO}</InfoText>
</SectionCard>
```

---

## 📁 File Locations

| Purpose | File(s) |
|---------|---------|
| UI Messages | `src/constants/messages.ts` |
| Business Constants | `src/constants/constants.ts` |
| Environment Config | `src/config/environment.ts` |
| Logger | `src/utils/logger.ts` |
| UI Components | `src/components/UIComponents.tsx` |
| State Management | `src/context/TourPlannerContext.tsx` |
| Styles | `src/styles/globals.css` |
| Env Variables | `.env` / `.env.example` |

---

## 🎨 Component Structure

```typescript
import React from 'react';
import { useTourPlanner } from '@context/TourPlannerContext';
import { SectionCard, FormField } from '@components/UIComponents';
import { MESSAGES } from '@constants/messages';
import { config } from '@config/environment';
import { logger } from '@utils/logger';

interface MyComponentProps {
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ onAction }) => {
  const { basicInfo, updateBasicInfo } = useTourPlanner();

  const handleClick = () => {
    // Validate
    if (!basicInfo.schoolName) {
      alert(MESSAGES.VALIDATION.REQUIRED_DAYS);
      logger.warn('Validation failed');
      return;
    }

    // Log
    logger.info('Action started', { data: basicInfo });

    // Use config
    const margin = config.business.profitMargin;

    // Update state
    updateBasicInfo({ schoolName: 'New Value' });

    // Callback
    onAction();
  };

  return (
    <SectionCard
      title="My Component"
      description={MESSAGES.STEP_DESCRIPTIONS.BASIC_INFO}
    >
      <FormField label={MESSAGES.LABELS.SCHOOL_NAME}>
        <input
          value={basicInfo.schoolName}
          placeholder={MESSAGES.PLACEHOLDERS.SCHOOL_NAME}
          onChange={(e) => updateBasicInfo({ schoolName: e.target.value })}
        />
      </FormField>

      <button onClick={handleClick}>
        {MESSAGES.BUTTONS.CALCULATE}
      </button>
    </SectionCard>
  );
};
```

---

## 🔧 Adding New Features

### Step 1: Add Messages
```typescript
// src/constants/messages.ts
MESSAGES.VALIDATION.MY_NEW_MESSAGE: 'Enter value for field.'
```

### Step 2: Add Config (if needed)
```typescript
// src/config/environment.ts
export const config = {
  myNew: import.meta.env.VITE_MY_NEW || 'default',
};
```

### Step 3: Create Domain Entity
```typescript
// src/domain/entities/MyEntity.ts
export interface MyEntity {
  id: string;
  name: string;
}
```

### Step 4: Create Service
```typescript
// src/application/services/MyService.ts
export class MyService {
  doSomething(data: MyEntity): Result {
    logger.info('Processing', { data });
    return result;
  }
}
```

### Step 5: Create Component
```typescript
// src/presentation/components/MyComponent.tsx
import { MESSAGES } from '@constants/messages';
import { MyService } from '@application/services/MyService';

export const MyComponent = () => {
  // Use MESSAGES, config, logger, services
};
```

---

## 📊 Message Categories Quick Reference

```typescript
// Validation (10+ messages)
MESSAGES.VALIDATION.REQUIRED_DAYS
MESSAGES.VALIDATION.REQUIRED_STUDENTS

// Success
MESSAGES.SUCCESS.CALCULATION_COMPLETED

// Error
MESSAGES.ERROR.CALCULATION_FAILED

// Warning
MESSAGES.WARNING.NO_ACCOMMODATION

// Info
MESSAGES.INFO.VEHICLE_INFO
MESSAGES.INFO.GENERATE_PLAN

// Buttons
MESSAGES.BUTTONS.CALCULATE
MESSAGES.BUTTONS.GENERATE_PLAN
MESSAGES.BUTTONS.ADD_ROOM_TYPE

// Labels
MESSAGES.LABELS.SCHOOL_NAME
MESSAGES.LABELS.CUSTOMER_CATEGORY

// Placeholders
MESSAGES.PLACEHOLDERS.SCHOOL_NAME
MESSAGES.PLACEHOLDERS.ENQUIRY_REF

// Step Descriptions
MESSAGES.STEP_DESCRIPTIONS.BASIC_INFO
MESSAGES.STEP_DESCRIPTIONS.VEHICLE

// Invoice
MESSAGES.INVOICE.TITLE
MESSAGES.INVOICE.TOTAL_TRIP_COST

// UI Text
UI_TEXT.APP_TITLE
UI_TEXT.PORTAL_BADGE
```

---

## 🌐 Environment Variables

```env
# Application
VITE_APP_NAME=Joshy's Tour Planner
VITE_APP_VERSION=1.0.0

# Logging
VITE_ENABLE_LOGGING=true
VITE_LOG_LEVEL=debug

# Business
VITE_PROFIT_MARGIN=0.20

# API
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=30000
```

Access via:
```typescript
import { config } from '@config/environment';
config.app.name
config.business.profitMargin
config.logging.enabled
```

---

## 🚨 Common Mistakes to Avoid

❌ **WRONG:**
```typescript
// Hardcoded strings
alert("Enter your name");
setError("Field required");
<button>Click Me</button>
console.log("Debug info");
const margin = 0.20;
import { MESSAGES } from '../../../constants/messages';
```

✅ **RIGHT:**
```typescript
// Centralized messages
alert(MESSAGES.VALIDATION.REQUIRED_NAME);
setError(MESSAGES.VALIDATION.REQUIRED_FIELD);
<button>{MESSAGES.BUTTONS.CALCULATE}</button>
logger.info("Action started");
const margin = config.business.profitMargin;
import { MESSAGES } from '@constants/messages';
```

---

## 📚 Documentation Quick Links

- **Full Overview** → `README.md`
- **Architecture Details** → `ARCHITECTURE.md`
- **How to Implement** → `IMPLEMENTATION_GUIDE.md`
- **Migrate Components** → `COMPONENT_MIGRATION_GUIDE.md`
- **Completion Summary** → `PROJECT_COMPLETION_SUMMARY.md`

---

## ⚡ Performance Tips

1. **Vendor bundle** is separate (cache improvements)
2. **CSS is minified** automatically
3. **JavaScript is minified** automatically
4. **Dev mode is fast** with HMR
5. **Production build** is optimized

---

## 🎓 Learning Path

1. Start with `README.md` (overview)
2. Review `ARCHITECTURE.md` (structure)
3. Check `src/components/Step01BasicInfo.tsx` (example)
4. Review `IMPLEMENTATION_GUIDE.md` (concepts)
5. Use `COMPONENT_MIGRATION_GUIDE.md` (when updating)
6. Reference this quick card often!

---

## 💡 Pro Tips

- Use logger.info() for tracking user actions
- Use logger.debug() for development debugging
- Keep messages descriptive and user-friendly
- Use config for ALL environment-specific values
- Keep components small and focused
- Use TypeScript strictly
- Leverage import aliases for clean code

---

**Keep this card handy for quick reference!** 📌
