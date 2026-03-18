/**
 * Application Messages & Constants
 * Centralized messaging for errors, warnings, success, and info
 */

export const MESSAGES = {
  // Validation Messages
  VALIDATION: {
    REQUIRED_DAYS: 'Please enter number of days first.',
    REQUIRED_CATEGORY: 'Please select a customer category (Step 01).',
    REQUIRED_STUDENTS: 'Please enter number of students (Step 01).',
    REQUIRED_TRIP_DURATION: 'Please enter trip duration in days (Step 01).',
    REQUIRED_PLAN_GENERATION: 'Please click "Generate Trip Plan" first.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PHONE: 'Please enter a valid phone number.',
    MINIMUM_PAX: 'Minimum 1 student is required.',
    MAXIMUM_DAYS: 'Maximum 30 days allowed.',
    MAXIMUM_NIGHTS: 'Maximum 30 nights allowed.',
  },

  // Success Messages
  SUCCESS: {
    PLAN_GENERATED: 'Trip plan has been generated successfully.',
    CALCULATION_COMPLETED: 'Calculation completed successfully.',
    INVOICE_GENERATED: 'Invoice has been generated.',
    DATA_SAVED: 'Data saved successfully.',
  },

  // Error Messages
  ERROR: {
    CALCULATION_FAILED: 'Calculation failed. Please check the console for details.',
    GENERATION_FAILED: 'Plan generation failed. Please try again.',
    INVALID_INPUT: 'Invalid input provided.',
    UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
    SERVER_ERROR: 'Server error. Please contact support.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
  },

  // Warning Messages
  WARNING: {
    NO_ACCOMMODATION: '0 nights — no accommodation needed.',
    NO_VEHICLE_SELECTED: 'No vehicle type selected.',
    NO_MEALS_SELECTED: 'No meals selected for this day.',
    NO_LOCATIONS_SELECTED: 'No tourist locations selected for this day.',
    UNSAVED_CHANGES: 'You have unsaved changes.',
  },

  // Info Messages
  INFO: {
    GENERATE_PLAN: 'Generate the trip plan to build the day-wise itinerary.',
    CONFIGURE_ACCOMMODATION: 'Generate the trip plan to configure accommodation.',
    CONFIGURE_FRESHUPS: 'Generate the trip plan to configure fresh-ups.',
    CONFIGURE_MEALS: 'Generate the trip plan to configure the meal plan.',
    CONFIGURE_EXTRAS: 'Generate the trip plan to configure extra charges.',
    VEHICLE_INFO: 'ℹ️  First 100 KM/day included in basic rent. An additional 80 KM/day is auto-added for city travel. Enter daily trip KM in the itinerary below.',
    FRESHUP_SHARING_INFO: 'Select sharing to determine the per-head fresh-up rate from the rate card.',
    ENTERTAINMENT_INFO: 'Cost calculated as: Rate × Number of Vehicles',
  },

  // Button Labels
  BUTTONS: {
    GENERATE_PLAN: 'Generate Trip Plan',
    CALCULATE: 'Calculate Total Trip Cost & Generate Invoice',
    ADD_ROOM_TYPE: 'Add Room Type',
    DELETE: 'Delete',
    CANCEL: 'Cancel',
    SUBMIT: 'Submit',
    RESET: 'Reset',
  },

  // Labels
  LABELS: {
    SCHOOL_NAME: 'School / Institution Name',
    ENQUIRY_REF: 'Enquiry Reference No.',
    CUSTOMER_CATEGORY: 'Customer Category',
    NO_STUDENTS: 'No. of Students',
    NO_STAFFS: 'No. of Staffs',
    TRIP_DURATION: 'Trip Duration (Days)',
    NO_NIGHTS: 'No. of Nights',
    VEHICLE_TYPE: 'Vehicle Type',
    NO_VEHICLES: 'No. of Vehicles',
    DESTINATION: 'Destination',
    KILOMETRES: 'Total Kilometres',
    TOURIST_SPOTS: 'Tourist Spots',
    SHARING_TYPE: 'Sharing Type',
    NO_ROOMS: 'No. of Rooms',
    FRESHUP_SHARING: 'Fresh-up Sharing Type (for rate)',
    MEAL_PLAN: 'Meal Plan',
    OPTIONAL: 'Optional',
    REQUIRED: 'Required',
  },

  // Placeholders
  PLACEHOLDERS: {
    SCHOOL_NAME: 'e.g. St. Mary\'s Higher Secondary School',
    ENQUIRY_REF: 'e.g. ENQ-2025-001',
    NO_STUDENTS: 'e.g. 45',
    NO_STAFFS: 'e.g. 5',
    TRIP_DURATION: 'e.g. 3',
    NO_NIGHTS: 'e.g. 2',
    KILOMETRES: 'e.g. 150',
  },

  // Category Info
  CATEGORY_INFO: 'KG = Kinder Garten   ·   LP = Lower Primary   ·   UP = Upper Primary   ·   HS = High School   ·   HSS = Higher Secondary   ·   CLG = College',

  // Step Descriptions
  STEP_DESCRIPTIONS: {
    BASIC_INFO: 'School details, pax count & trip duration',
    VEHICLE: 'Transport type & fleet count',
    ITINERARY: 'Destinations, KM & tourist spots with entry fees',
    ACCOMMODATION: 'Night-wise room sharing plan (toggle to opt-out any night)',
    FRESHUPS: 'Day-wise refreshment stops — select time slots',
    MEALS: 'Day-wise food selection with Veg / Non-Veg preference',
    ENTERTAINMENT: 'Cost calculated as: Rate × Number of Vehicles',
    EXTRA_CHARGES: 'Day-wise: Guide, Tolls, Bata & RTO',
  },

  // Invoice Labels
  INVOICE: {
    TITLE: 'Trip Cost Estimate',
    INSTITUTION: 'Institution',
    CATEGORY: 'Category',
    PAX: 'Pax',
    DURATION: 'Duration',
    VEHICLE: 'Vehicle',
    ENQUIRY_REF: 'Enquiry Ref',
    BASE_COST: 'Base Cost (All Components)',
    PROFIT_MARGIN: 'Profit Margin (20%)',
    TOTAL_TRIP_COST: 'Total Trip Cost',
    PER_HEAD_COST: 'Per Head Cost',
    STUDENTS: 'students',
    FOOTER: 'This is a preliminary estimate. Final pricing may vary based on availability and season.   —   Joshy\'s Tours & Travels',
  },
};

// UI Text Snippets
export const UI_TEXT = {
  PORTAL_BADGE: 'Tele-Caller Portal',
  APP_TITLE: "Joshy's Tour Planner",
  APP_SUBTITLE: 'Student Trip Enquiry & Live Cost Estimation System',
  LOGO_TEXT: '✦ Joshy\'s Tour Planner · Tele-Caller Estimate',
  ENTRY_INCLUDED: '(entry incl.)',
  ENTRY_FREE: 'Free',
  STUDENTS_LABEL: 'Students',
  STAFFS_LABEL: 'Staffs',
  STUDENTS_PER: 'students',
  VEHICLES: 'vehicles',
  VEHICLE: 'vehicle',
  PER_DAY: '/day',
  PER_HEAD: '/head',
  PER_PERSON: '/person',
  TOTAL: 'Total',
  SUBTOTAL: 'Subtotal',
  RATE: 'Rate',
  COST: 'Cost',
};
