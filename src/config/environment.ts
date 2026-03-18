/**
 * Environment Configuration
 * Centralized environment variable management
 */

export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME || "Joshy's Tour Planner",
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    description:
      import.meta.env.VITE_APP_DESCRIPTION || 'Student Trip Enquiry & Live Cost Estimation System',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  },
  logging: {
    enabled: import.meta.env.VITE_ENABLE_LOGGING === 'true',
    level: import.meta.env.VITE_LOG_LEVEL || 'debug',
  },
  rateCard: {
    version: import.meta.env.VITE_RATE_CARD_VERSION || '2.0',
  },
  ui: {
    port: parseInt(import.meta.env.VITE_DEFAULT_PORT || '5173'),
    autoOpen: import.meta.env.VITE_AUTO_OPEN_BROWSER === 'true',
  },
  business: {
    profitMargin: parseFloat(import.meta.env.VITE_PROFIT_MARGIN || '0.20'),
  },
};
