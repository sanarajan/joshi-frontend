# Joshy's Tour Planner - Clean Architecture

## Project Structure

This project follows **Clean Architecture** principles with a layered approach:

```
src/
├── domain/                    # Business Logic Layer
│   ├── entities/             # Core business entities
│   └── interfaces/           # Contracts & interfaces
├── application/              # Application Logic Layer
│   ├── services/             # Business use cases
│   └── usecases/             # Application workflows
├── infrastructure/           # Infrastructure Layer
│   ├── repositories/         # Data access implementations
│   └── api/                  # External service integrations
├── presentation/             # Presentation Layer (React)
│   ├── components/           # Reusable UI components
│   ├── layouts/              # Page layouts
│   └── pages/                # Page components
├── config/                   # Configuration
│   └── environment.ts        # Environment variables
├── constants/                # Constants
│   ├── constants.ts          # Business constants (rate cards, etc.)
│   └── messages.ts           # UI messages & labels
├── context/                  # React Context (State Management)
├── utils/                    # Utility functions
├── styles/                   # Global styles
└── types/                    # TypeScript type definitions
```

## Environment Configuration

### Environment Files

- `.env.example` - Template for environment variables
- `.env` - Local environment configuration (not committed)

### Environment Variables

All environment variables are prefixed with `VITE_` for Vite to recognize them:

```env
# Application Settings
VITE_APP_NAME=Joshy's Tour Planner
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Student Trip Enquiry & Live Cost Estimation System

# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_LOGGING=true
VITE_LOG_LEVEL=debug

# Business Settings
VITE_PROFIT_MARGIN=0.20
```

### Usage in Code

Access environment variables through the config object:

```typescript
import { config } from '@config/environment';

console.log(config.app.name);           // "Joshy's Tour Planner"
console.log(config.business.profitMargin);  // 0.20
console.log(config.logging.enabled);    // true
```

## Centralized Messages & Constants

### Messages Constants (`src/constants/messages.ts`)

All UI messages, labels, placeholders, and error messages are centralized:

```typescript
import { MESSAGES, UI_TEXT } from '@constants/messages';

// Validation messages
MESSAGES.VALIDATION.REQUIRED_DAYS
MESSAGES.VALIDATION.REQUIRED_STUDENTS

// Success messages
MESSAGES.SUCCESS.CALCULATION_COMPLETED

// Error messages
MESSAGES.ERROR.CALCULATION_FAILED

// UI buttons
MESSAGES.BUTTONS.CALCULATE

// Form labels
MESSAGES.LABELS.SCHOOL_NAME

// Info text
MESSAGES.INFO.VEHICLE_INFO

// UI Text snippets
UI_TEXT.APP_TITLE
UI_TEXT.PORTAL_BADGE
```

### Business Constants (`src/constants/constants.ts`)

Rate cards, destinations, category labels, etc.:

```typescript
import { RATE_CARD, DESTINATIONS, CATEGORY_LABELS, MEAL_TYPES } from '@constants/constants';

// Profit margin from environment (1.0 = 100%)
const margin = config.business.profitMargin;
```

## Architecture Layers

### 1. **Domain Layer** (`src/domain/`)
- Contains pure business logic
- No dependencies on framework or UI
- Entities and interfaces
- **Files:**
  - `entities/Tour.ts` - Core business entities
  - `interfaces/index.ts` - Service contracts

### 2. **Application Layer** (`src/application/`)
- Orchestrates use cases
- Implements services
- Uses domain interfaces
- **Files:**
  - `services/CalculationService.ts` - Calculation logic

### 3. **Infrastructure Layer** (`src/infrastructure/`)
- Implements data access
- External service integrations
- Repository implementations
- **Files:**
  - `repositories/RateCardRepository.ts` - Rate card data access

### 4. **Presentation Layer** (`src/presentation/`)
- React components
- UI layouts
- User interactions
- **Files:**
  - `layouts/MainLayout.tsx` - Main application wrapper
  - Components organized by feature

### 5. **Supporting Layers**
- **Context** (`src/context/`) - React Context for state management
- **Utils** (`src/utils/`) - Helper utilities & logger
- **Config** (`src/config/`) - Environment configuration
- **Constants** (`src/constants/`) - Centralized constants
- **Types** (`src/types/`) - TypeScript definitions
- **Styles** (`src/styles/`) - Global CSS

## Build Output

The build process ensures all files are contained in the `dist/` folder only:

```bash
npm run build
```

This creates:
- `dist/index.html` - Entry point
- `dist/assets/index-*.css` - Styles (minified)
- `dist/assets/index-*.js` - Main bundle (minified)
- `dist/assets/vendor-*.js` - React library bundle (separated)

**Important:** No source files are included in the build output. All TypeScript is compiled to JavaScript.

## Development

### Start Development Server

```bash
npm run dev
```

- Opens automatically at `http://localhost:5173`
- Hot Module Reloading (HMR) enabled
- Development mode uses readable JS

### Lint Code

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```

### Code Quality

- **ESLint** - Enforces code quality standards
- **Prettier** - Formats code consistently
- **TypeScript** - Type safety

## Best Practices

### 1. Use Centralized Constants
```typescript
// ✅ DO THIS
import { MESSAGES } from '@constants/messages';
setError(MESSAGES.VALIDATION.REQUIRED_DAYS);

// ❌ DON'T DO THIS
setError('Please enter number of days');
```

### 2. Use Config for Environment Values
```typescript
// ✅ DO THIS
import { config } from '@config/environment';
const margin = config.business.profitMargin;

// ❌ DON'T DO THIS
const margin = 0.20;  // Hardcoded
```

### 3. Logging
```typescript
import { logger } from '@utils/logger';

logger.info('Plan generated', { days: 3, nights: 2 });
logger.error('Calculation failed', error);
```

### 4. Import Path Aliases
```typescript
// ✅ DO THIS
import { MESSAGES } from '@constants/messages';
import { logger } from '@utils/logger';

// ❌ DON'T DO THIS
import { MESSAGES } from '../../../../constants/messages';
```

## Environment-Specific Configurations

Create different `.env` files for different environments:

```bash
.env              # Local development
.env.production   # Production values
.env.staging      # Staging values
```

Then build for specific environments:

```bash
# Build with specific env file
npm run build -- --mode production
```

## Deployment

### Production Build

1. Update `.env` with production values
2. Run build:
   ```bash
   npm run build
   ```
3. Deploy `dist/` folder to your server
4. Configure web server to serve `dist/index.html` for SPA routing

### Environment Variables in Production

Use environment-specific `.env` files or CI/CD system to set `VITE_*` variables at build time.

## Troubleshooting

### Messages not updating?
- Check if using `MESSAGES` constant correctly
- Verify import path: `@constants/messages`

### Build includes source files?
- Ensure `build.emptyOutDir: true` in vite.config.ts
- Check dist folder is clean before building

### Environment variables not available?
- Must start with `VITE_` prefix
- Use for build-time constants only
- Access via `import.meta.env.VITE_*`
