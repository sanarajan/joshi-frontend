# Component Migration Guide

This guide shows how to update remaining components to use centralized constants and messages.

## Pattern to Follow

### Step 1: Import Messages and Constants

```typescript
import { MESSAGES, UI_TEXT } from '@constants/messages';
import { CATEGORY_LABELS, RATE_CARD, DESTINATIONS } from '@constants/constants';
import { config } from '@config/environment';
import { logger } from '@utils/logger';
```

### Step 2: Replace Hardcoded Strings

**Example: Step02VehicleSelection Component**

**Before:**
```typescript
<SectionCard
  icon="🚌"
  title="Vehicle Selection"
  description="Transport type & fleet count"
  stepNumber="STEP 02"
>
```

**After:**
```typescript
<SectionCard
  icon="🚌"
  title="Vehicle Selection"
  description={MESSAGES.STEP_DESCRIPTIONS.VEHICLE}
  stepNumber="STEP 02"
>
```

### Step 3: Replace Button Labels

**Before:**
```typescript
<Button variant="primary">Add Room Type</Button>
```

**After:**
```typescript
<Button variant="primary">
  <i className="fa-solid fa-plus"></i> {MESSAGES.BUTTONS.ADD_ROOM_TYPE}
</Button>
```

### Step 4: Replace Form Labels

**Before:**
```typescript
<FormField label="Vehicle Type">
  <select className="fc" value={vehicleSelection.type}>
    <option value="">— Select Vehicle —</option>
```

**After:**
```typescript
<FormField label={MESSAGES.LABELS.VEHICLE_TYPE}>
  <select className="fc" value={vehicleSelection.type}>
    <option value="">{MESSAGES.LABELS.CHOOSE_VEHICLE}</option>
```

### Step 5: Replace Info Messages

**Before:**
```typescript
<InfoText>
  ℹ️  First 100 KM/day included in basic rent. An additional 80 KM/day is auto-added for city travel.
</InfoText>
```

**After:**
```typescript
<InfoText>
  {MESSAGES.INFO.VEHICLE_INFO}
</InfoText>
```

### Step 6: Use Logger

**Before:**
```typescript
console.debug(`Vehicle selected: ${type}`);
```

**After:**
```typescript
logger.debug(`Vehicle selected: ${type}`);
```

### Step 7: Error Validation Messages

**Before:**
```typescript
if (!category) {
  alert('Please select a customer category');
  return;
}
```

**After:**
```typescript
if (!category) {
  alert(MESSAGES.VALIDATION.REQUIRED_CATEGORY);
  logger.warn('Validation failed: category', { category });
  return;
}
```

---

## Components to Migrate

### ✅ Step01BasicInfo.tsx
**Status:** COMPLETED
- Imports updated
- Messages applied
- Validation messages centralized
- Button labels updated

### ⏳ Step02VehicleSelection.tsx
**Files to update:**
```typescript
// Line 3
import { MESSAGES } from '@constants/messages';

// Replace "Transport type & fleet count" with:
description={MESSAGES.STEP_DESCRIPTIONS.VEHICLE}

// Replace "Vehicle Type" with:
label={MESSAGES.LABELS.VEHICLE_TYPE}

// Replace "— Select Vehicle —" with:
<option value="">{MESSAGES.LABELS.CHOOSE_VEHICLE}</option>
```

### ⏳ Step03Itinerary.tsx
**Files to update:**
```typescript
// Replace step description
description={MESSAGES.STEP_DESCRIPTIONS.ITINERARY}

// Replace labels
label={MESSAGES.LABELS.DESTINATION}
label={MESSAGES.LABELS.KILOMETRES}

// Replace info text
{MESSAGES.INFO.GENERATE_PLAN}
```

### ⏳ Step04Accommodation.tsx
**Files to update:**
```typescript
// Replace step description
description={MESSAGES.STEP_DESCRIPTIONS.ACCOMMODATION}

// Replace button labels
{MESSAGES.BUTTONS.ADD_ROOM_TYPE}

// Replace labels
label={MESSAGES.LABELS.SHARING_TYPE}
label={MESSAGES.LABELS.NO_ROOMS}
```

### ⏳ Step05Freshups.tsx
**Files to update:**
```typescript
// Replace step description
description={MESSAGES.STEP_DESCRIPTIONS.FRESHUPS}

// Replace label
label={MESSAGES.LABELS.FRESHUP_SHARING}

// Replace info
{MESSAGES.INFO.FRESHUP_SHARING_INFO}
```

### ⏳ Step06Meals.tsx
**Files to update:**
```typescript
// Replace step description
description={MESSAGES.STEP_DESCRIPTIONS.MEALS}

// Replace empty state
{MESSAGES.INFO.CONFIGURE_MEALS}
```

### ⏳ Step07Entertainment.tsx
**Files to update:**
```typescript
// Replace step description
description={MESSAGES.STEP_DESCRIPTIONS.ENTERTAINMENT}

// Replace info
{MESSAGES.INFO.ENTERTAINMENT_INFO}
```

### ⏳ Step08ExtraCharges.tsx
**Files to update:**
```typescript
// Replace step description
description={MESSAGES.STEP_DESCRIPTIONS.EXTRA_CHARGES}

// Replace info
{MESSAGES.INFO.CONFIGURE_EXTRAS}
```

### ⏳ AppContent.tsx
**Files to update:**
```typescript
// Update error messages
alert(MESSAGES.VALIDATION.REQUIRED_CATEGORY);
alert(MESSAGES.VALIDATION.REQUIRED_STUDENTS);
alert(MESSAGES.VALIDATION.REQUIRED_TRIP_DURATION);
alert(MESSAGES.VALIDATION.REQUIRED_PLAN_GENERATION);

// Update error handling
logger.error('Calculation failed', error);

// Update button text
{MESSAGES.BUTTONS.CALCULATE}

// Update logger on calculation
logger.info('Starting calculation');
logger.info('Calculation completed successfully', {
  grandTotal: newInvoice.grandTotal,
  perHead: newInvoice.perHead,
});
```

### ⏳ InvoiceComponent.tsx
**Files to update:**
```typescript
// Replace invoice labels
<div className="inv-logo">{UI_TEXT.LOGO_TEXT}</div>
<div className="inv-title">{MESSAGES.INVOICE.TITLE}</div>

// Replace all invoice labels
<div className="meta-lbl">{MESSAGES.INVOICE.INSTITUTION}</div>
<div className="meta-lbl">{MESSAGES.INVOICE.CATEGORY}</div>
<div className="meta-lbl">{MESSAGES.INVOICE.PAX}</div>
<div className="meta-lbl">{MESSAGES.INVOICE.DURATION}</div>

// Replace invoice footer
<div className="inv-foot">{MESSAGES.INVOICE.FOOTER}</div>
```

---

## Quick Reference: Message Categories

### Validation Messages
```typescript
MESSAGES.VALIDATION.REQUIRED_DAYS
MESSAGES.VALIDATION.REQUIRED_CATEGORY
MESSAGES.VALIDATION.REQUIRED_STUDENTS
MESSAGES.VALIDATION.REQUIRED_TRIP_DURATION
MESSAGES.VALIDATION.REQUIRED_PLAN_GENERATION
```

### Step Descriptions
```typescript
MESSAGES.STEP_DESCRIPTIONS.BASIC_INFO
MESSAGES.STEP_DESCRIPTIONS.VEHICLE
MESSAGES.STEP_DESCRIPTIONS.ITINERARY
MESSAGES.STEP_DESCRIPTIONS.ACCOMMODATION
MESSAGES.STEP_DESCRIPTIONS.FRESHUPS
MESSAGES.STEP_DESCRIPTIONS.MEALS
MESSAGES.STEP_DESCRIPTIONS.ENTERTAINMENT
MESSAGES.STEP_DESCRIPTIONS.EXTRA_CHARGES
```

### Button Labels
```typescript
MESSAGES.BUTTONS.GENERATE_PLAN
MESSAGES.BUTTONS.CALCULATE
MESSAGES.BUTTONS.ADD_ROOM_TYPE
MESSAGES.BUTTONS.DELETE
```

### Form Labels
```typescript
MESSAGES.LABELS.SCHOOL_NAME
MESSAGES.LABELS.ENQUIRY_REF
MESSAGES.LABELS.CUSTOMER_CATEGORY
MESSAGES.LABELS.NO_STUDENTS
MESSAGES.LABELS.NO_STAFFS
MESSAGES.LABELS.TRIP_DURATION
MESSAGES.LABELS.NO_NIGHTS
MESSAGES.LABELS.VEHICLE_TYPE
MESSAGES.LABELS.NO_VEHICLES
```

### Info Messages
```typescript
MESSAGES.INFO.VEHICLE_INFO
MESSAGES.INFO.FRESHUP_SHARING_INFO
MESSAGES.INFO.ENTERTAINMENT_INFO
MESSAGES.INFO.GENERATE_PLAN
MESSAGES.INFO.CONFIGURE_ACCOMMODATION
MESSAGES.INFO.CONFIGURE_FRESHUPS
MESSAGES.INFO.CONFIGURE_MEALS
MESSAGES.INFO.CONFIGURE_EXTRAS
```

### Invoice Labels
```typescript
MESSAGES.INVOICE.TITLE
MESSAGES.INVOICE.INSTITUTION
MESSAGES.INVOICE.CATEGORY
MESSAGES.INVOICE.PAX
MESSAGES.INVOICE.DURATION
MESSAGES.INVOICE.VEHICLE
MESSAGES.INVOICE.ENQUIRY_REF
MESSAGES.INVOICE.BASE_COST
MESSAGES.INVOICE.PROFIT_MARGIN
MESSAGES.INVOICE.TOTAL_TRIP_COST
MESSAGES.INVOICE.PER_HEAD_COST
```

### UI Text Snippets
```typescript
UI_TEXT.PORTAL_BADGE
UI_TEXT.APP_TITLE
UI_TEXT.APP_SUBTITLE
UI_TEXT.LOGO_TEXT
```

---

## Common Patterns

### Pattern 1: Empty State Messages
```typescript
// Before
<EmptyState icon="fa-solid fa-bed" message="Generate the trip plan to configure accommodation." />

// After
<EmptyState
  icon="fa-solid fa-bed"
  message={MESSAGES.INFO.CONFIGURE_ACCOMMODATION}
/>
```

### Pattern 2: Form Labels with Placeholders
```typescript
// Before
<FormField label="School / Institution Name">
  <input placeholder="e.g. St. Mary's Higher Secondary School" />
</FormField>

// After
<FormField label={MESSAGES.LABELS.SCHOOL_NAME}>
  <input placeholder={MESSAGES.PLACEHOLDERS.SCHOOL_NAME} />
</FormField>
```

### Pattern 3: Category Info Text
```typescript
// Before
<InfoText>
  KG = Kinder Garten · LP = Lower Primary · UP = Upper Primary ...
</InfoText>

// After
<InfoText>
  {MESSAGES.CATEGORY_INFO}
</InfoText>
```

### Pattern 4: Error Handling
```typescript
// Before
try {
  doSomething();
} catch (error) {
  alert('An error occurred');
  console.error(error);
}

// After
try {
  doSomething();
} catch (error) {
  alert(MESSAGES.ERROR.UNEXPECTED_ERROR);
  logger.error('Operation failed', error);
}
```

---

## Checklist for Migration

Use this checklist when migrating a component:

- [ ] Import MESSAGES and UI_TEXT
- [ ] Import config from @config/environment
- [ ] Import logger from @utils/logger
- [ ] Replace all hardcoded button labels
- [ ] Replace all hardcoded form labels
- [ ] Replace all hardcoded step descriptions
- [ ] Replace all hardcoded error messages
- [ ] Replace all hardcoded info text
- [ ] Replace console.log/console.debug with logger
- [ ] Replace alert/setError with MESSAGES constants
- [ ] Test component still works correctly
- [ ] Verify no breaking changes

---

## Why This Matters

### Before (Scattered Strings)
```typescript
// Component A
alert("Please enter number of days");

// Component B
throw new Error("Please enter number of days");

// Component C
setMessage("Please enter number of days");

// Issue: 3 different strings, hard to maintain, hard to change
```

### After (Centralized)
```typescript
// All components use:
MESSAGES.VALIDATION.REQUIRED_DAYS

// Benefits:
// 1. Single point of change
// 2. Consistency guaranteed
// 3. Easier to spot duplicate messages
// 4. Ready for i18n (internationalization)
// 5. Professional & maintainable
```

---

## Adding New Messages

When you need a new message:

1. **Add to `src/constants/messages.ts`**
   ```typescript
   MESSAGES.VALIDATION: {
     // ... existing
     MY_NEW_MESSAGE: 'Your message here',
   }
   ```

2. **Use in component**
   ```typescript
   import { MESSAGES } from '@constants/messages';

   if (someCondition) {
     alert(MESSAGES.VALIDATION.MY_NEW_MESSAGE);
   }
   ```

3. **Never add inline strings in components**
   ```typescript
   // ❌ WRONG
   alert("This is my message");

   // ✅ RIGHT
   alert(MESSAGES.VALIDATION.MY_NEW_MESSAGE);
   ```

---

## Questions?

Refer to:
- **Architecture details** → `ARCHITECTURE.md`
- **Environment setup** → `.env.example`
- **Example usage** → `src/components/Step01BasicInfo.tsx`
