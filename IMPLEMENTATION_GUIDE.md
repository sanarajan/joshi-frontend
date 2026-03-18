# Clean Architecture Implementation

## Overview

This project has been refactored with **Clean Architecture** principles and **Centralized Configuration Management**. All messages, labels, and constants are now managed from central locations.

---

## Key Features Implemented

### 1. ✅ Environment Configuration

**Files:**
- `.env` - Local development variables (ignored by git)
- `.env.example` - Template for environment variables
- `src/config/environment.ts` - Centralized environment access

**All configuration prefixed with `VITE_`:**
```env
VITE_APP_NAME=Joshy's Tour Planner
VITE_APP_VERSION=1.0.0
VITE_PROFIT_MARGIN=0.20
VITE_ENABLE_LOGGING=true
```

**Access in code:**
```typescript
import { config } from '@config/environment';
console.log(config.app.name);
console.log(config.business.profitMargin);
```

### 2. ✅ Centralized Messages & Constants

**Files:**
- `src/constants/messages.ts` - All UI text, labels, messages
- `src/constants/constants.ts` - Business rules, rate cards, destinations

**Message Categories:**
```typescript
import { MESSAGES, UI_TEXT } from '@constants/messages';

// Validation
MESSAGES.VALIDATION.REQUIRED_DAYS
MESSAGES.VALIDATION.REQUIRED_CATEGORY

// Success/Error/Warning
MESSAGES.SUCCESS.CALCULATION_COMPLETED
MESSAGES.ERROR.CALCULATION_FAILED
MESSAGES.WARNING.NO_ACCOMMODATION

// Labels & Placeholders
MESSAGES.LABELS.SCHOOL_NAME
MESSAGES.PLACEHOLDERS.SCHOOL_NAME

// Button text
MESSAGES.BUTTONS.CALCULATE

// Step descriptions
MESSAGES.STEP_DESCRIPTIONS.BASIC_INFO

// Invoice labels
MESSAGES.INVOICE.TITLE
```

### 3. ✅ Clean Architecture Structure

```
src/
├── domain/                 # 🎯 BUSINESS LOGIC
│   ├── entities/
│   │   └── Tour.ts        # Core entities (TourQuotation, CostBreakdown, etc.)
│   └── interfaces/
│       └── index.ts       # Service contracts (ICalculationService, etc.)
│
├── application/            # 📋 USE CASES
│   ├── services/
│   │   └── CalculationService.ts   # Orchestration logic
│   └── usecases/           # Future: specific use cases
│
├── infrastructure/         # 🔌 DATA ACCESS
│   ├── repositories/
│   │   └── RateCardRepository.ts   # Data implementations
│   └── api/                # Future: external APIs
│
├── presentation/           # 🎨 UI LAYER
│   ├── components/         # Components (moved from src/components)
│   ├── layouts/
│   │   └── MainLayout.tsx # Main wrapper
│   └── pages/              # Future: page components
│
├── context/                # ⚛️ STATE MANAGEMENT
│   └── TourPlannerContext.tsx
│
├── config/                 # ⚙️ CONFIGURATION
│   └── environment.ts      # Environment variables
│
├── constants/              # 📦 CONSTANTS
│   ├── constants.ts        # Business constants
│   └── messages.ts         # All UI messages
│
├── utils/                  # 🛠️ UTILITIES
│   ├── logger.ts           # Logging utility
│   ├── helpers.ts          # Helper functions
│   └── constants.ts        # (Old - can be merged into constants/)
│
├── types/                  # 📝 TYPE DEFINITIONS
│   └── index.ts            # TypeScript interfaces
│
└── styles/                 # 🎨 STYLES
    └── globals.css
```

### 4. ✅ Build Output - Clean Dist Folder

**Build command:**
```bash
npm run build
```

**Output structure (ONLY):**
```
dist/
├── index.html              # Entry point (0.84 KB)
└── assets/
    ├── index-*.css         # App styles (14.37 KB, gzipped: 3.62 KB)
    ├── index-*.js          # App code (31.44 KB, gzipped: 9.66 KB)
    └── vendor-*.js         # React libs (139.72 KB, gzipped: 44.87 KB)
```

**Key Features:**
✅ No source files in dist
✅ No TypeScript files in dist
✅ All JS/CSS minified
✅ Assets hashed for cache busting
✅ Vendor libraries split for better caching
✅ `emptyOutDir: true` ensures clean build

---

## Implementation Examples

### Example 1: Using Messages in Components

**Before:**
```typescript
const error = "Please enter number of days";
setError(error);
```

**After:**
```typescript
import { MESSAGES } from '@constants/messages';

const error = MESSAGES.VALIDATION.REQUIRED_DAYS;
setError(error);

// Benefits:
// - Single source of truth
// - Easy to find/update all messages
// - Consistency across app
// - I18n ready (future enhancement)
```

### Example 2: Using Environment Configuration

**Before:**
```typescript
const profitMargin = 0.20;
const apiTimeout = 30000;
const enableLogging = true;
```

**After:**
```typescript
import { config } from '@config/environment';

const profitMargin = config.business.profitMargin;     // from .env: 0.20
const apiTimeout = config.api.timeout;                  // from .env: 30000
const enableLogging = config.logging.enabled;           // from .env: true

// Change values:
// Edit .env file → environment changes without code changes
// For production: use different .env or CI/CD secrets
```

### Example 3: Logging with Context

**Before:**
```typescript
console.log('Generated plan with 3 days');
```

**After:**
```typescript
import { logger } from '@utils/logger';

logger.info('Generating trip plan', {
  days: basicInfo.numDays,
  nights: basicInfo.numNights,
  category: basicInfo.category,
});

// All logs tracked with timestamps
// Accessible via browser dev tools
// Can be exported for debugging
```

---

## Usage Guide

### Development

```bash
# Start dev server
npm run dev

# Will open http://localhost:5173 automatically
# HMR (Hot Module Reloading) enabled
```

### Building for Production

```bash
# Update .env with production values
# Or use CI/CD to inject VITE_* variables

npm run build

# Output: dist/ folder ready to deploy
```

### Code Quality

```bash
# Lint code
npm run lint

# Auto-fix issues
npm run lint:fix
```

### Working with Messages

1. **Update existing message:**
   ```typescript
   // File: src/constants/messages.ts
   MESSAGES.VALIDATION.REQUIRED_DAYS: 'Enter the number of days.'
   ```

2. **Add new message:**
   ```typescript
   // File: src/constants/messages.ts
   MESSAGES.VALIDATION: {
     // ... existing messages
     NEW_MESSAGE: 'Your new message here',
   }

   // Use in component:
   import { MESSAGES } from '@constants/messages';
   setError(MESSAGES.VALIDATION.NEW_MESSAGE);
   ```

### Working with Environment Variables

1. **Add new environment variable:**
   ```bash
   # Add to .env and .env.example
   VITE_NEW_SETTING=value
   ```

2. **Register in config:**
   ```typescript
   // File: src/config/environment.ts
   export const config = {
     // ...
     newSetting: import.meta.env.VITE_NEW_SETTING || 'default_value',
   };
   ```

3. **Use in code:**
   ```typescript
   import { config } from '@config/environment';
   console.log(config.newSetting);
   ```

---

## Architecture Benefits

### Scalability
- ✅ New layers can be added without affecting existing code
- ✅ Services are testable and reusable
- ✅ Clear separation of concerns

### Maintainability
- ✅ Single source of truth for all messages
- ✅ Environment variables centralized
- ✅ Easy to locate and update configuration
- ✅ Clear import path aliases (@)

### Testability
- ✅ Domain layer has no framework dependencies
- ✅ Services can be tested independently
- ✅ Mock repositories easily

### Flexibility
- ✅ Different .env files for different environments
- ✅ Easy to add logging, monitoring, analytics
- ✅ Ready for internationalization (i18n)
- ✅ API integration layer ready

---

## File Organization Summary

| Layer | Purpose | Files |
|-------|---------|-------|
| **Domain** | Business rules | entities/, interfaces/ |
| **Application** | Use cases | services/, usecases/ |
| **Infrastructure** | Data access | repositories/, api/ |
| **Presentation** | React UI | components/, layouts/, pages/ |
| **Supporting** | Config & Constants | config/, constants/ |

---

## Next Steps

### Easy Enhancements
1. **Add database support** - Create `infrastructure/repositories/TourRepository.ts`
2. **Add API integration** - Create `infrastructure/api/TourService.ts`
3. **Add i18n** - Expand MESSAGES to support multiple languages
4. **Add more services** - Create new services in `application/services/`

### Best Practices Going Forward
- ✅ Always use MESSAGES for UI text
- ✅ Always use config for environment values
- ✅ Use logger instead of console.log
- ✅ Keep domain layer framework-agnostic
- ✅ Use import aliases (@) consistently

---

## Environment Variable Examples

### Development (.env)
```env
VITE_APP_NAME=Joshy's Tour Planner
VITE_LOG_LEVEL=debug
VITE_ENABLE_LOGGING=true
VITE_PROFIT_MARGIN=0.20
```

### Production (inject via CI/CD)
```bash
# GitHub Actions example
- name: Build
  env:
    VITE_APP_NAME: Joshy's Tour Planner
    VITE_LOG_LEVEL: error
    VITE_ENABLE_LOGGING: false
    VITE_PROFIT_MARGIN: 0.25
  run: npm run build
```

---

## Summary

✅ **Environment Configuration** - Centralized, manageable via .env
✅ **Centralized Messages** - All UI text in one place
✅ **Clean Architecture** - Clear separation of concerns
✅ **Clean Build Output** - Only necessary files in dist/
✅ **Best Practices** - Established patterns for future development
✅ **Documentation** - Clear guidance for team members
