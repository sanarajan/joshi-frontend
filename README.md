# Joshy's Tour Planner - React TypeScript Vite

Professional React + TypeScript + Vite project with Clean Architecture, centralized configuration management, and comprehensive constants management.

## 🚀 Quick Start

### Installation
```bash
npm install --legacy-peer-deps
```

### Development
```bash
npm run dev
# Opens http://localhost:5173
```

### Build
```bash
npm run build
# Creates dist/ folder only
```

### Lint
```bash
npm run lint       # Check code
npm run lint:fix   # Auto-fix issues
```

---

## ✨ Key Features

### ✅ Environment Configuration
- **Files:** `.env`, `.env.example`, `src/config/environment.ts`
- **Variables:** All prefixed with `VITE_`
- **Access:** `import { config } from '@config/environment'`

```env
VITE_APP_NAME=Joshy's Tour Planner
VITE_PROFIT_MARGIN=0.20
VITE_ENABLE_LOGGING=true
```

```typescript
import { config } from '@config/environment';
console.log(config.app.name);           // "Joshy's Tour Planner"
console.log(config.business.profitMargin);  // 0.20
```

### ✅ Centralized Messages & Constants

**File:** `src/constants/messages.ts`

All UI messages, labels, buttons, and text:
```typescript
import { MESSAGES, UI_TEXT } from '@constants/messages';

// Validation messages
MESSAGES.VALIDATION.REQUIRED_DAYS
MESSAGES.VALIDATION.REQUIRED_STUDENTS

// Buttons
MESSAGES.BUTTONS.CALCULATE
MESSAGES.BUTTONS.GENERATE_PLAN

// Labels
MESSAGES.LABELS.SCHOOL_NAME
MESSAGES.LABELS.CUSTOMER_CATEGORY

// Info text
MESSAGES.INFO.VEHICLE_INFO
MESSAGES.STEP_DESCRIPTIONS.BASIC_INFO
```

**File:** `src/constants/constants.ts`

Business logic constants:
```typescript
import { RATE_CARD, DESTINATIONS, CATEGORY_LABELS } from '@constants/constants';
```

### ✅ Clean Architecture

**4 Main Layers:**

1. **Domain** (`src/domain/`) - Business logic
   - `entities/Tour.ts` - Core entities
   - `interfaces/index.ts` - Service contracts

2. **Application** (`src/application/`) - Use cases
   - `services/CalculationService.ts` - Business operations

3. **Infrastructure** (`src/infrastructure/`) - Data access
   - `repositories/RateCardRepository.ts` - Data implementations

4. **Presentation** (`src/presentation/`) - React UI
   - `components/` - UI components
   - `layouts/MainLayout.tsx` - Main wrapper

### ✅ Clean Build Output

```
dist/
├── index.html                    (0.84 KB)
└── assets/
    ├── index-*.css              (14.37 KB)
    ├── index-*.js               (31.44 KB)
    └── vendor-*.js              (139.72 KB)
```

**Features:**
- ✅ No source files in dist
- ✅ No TypeScript files in dist
- ✅ All JavaScript minified
- ✅ CSS minified & optimized
- ✅ Vendor libraries separated
- ✅ Assets cache-busted

### ✅ Comprehensive Logging

```typescript
import { logger } from '@utils/logger';

logger.debug('Debug info', { data: 'value' });
logger.info('Operation', { status: 'success' });
logger.warn('Warning', { issue: 'something' });
logger.error('Error', { error: 'details' });

// Access logs
const logs = logger.getLogs();
const exported = logger.exportLogs();
```

---

## 📁 Project Structure

```
joshy-tour-planner/
├── public/
│   └── index.html
├── src/
│   ├── domain/                 # 🎯 Business Logic
│   │   ├── entities/
│   │   │   └── Tour.ts
│   │   └── interfaces/
│   │       └── index.ts
│   ├── application/            # 📋 Use Cases
│   │   ├── services/
│   │   │   └── CalculationService.ts
│   │   └── usecases/
│   ├── infrastructure/         # 🔌 Data Access
│   │   ├── repositories/
│   │   │   └── RateCardRepository.ts
│   │   └── api/
│   ├── presentation/           # 🎨 React UI
│   │   ├── components/
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx
│   │   └── pages/
│   ├── context/                # ⚛️ State (Context API)
│   │   └── TourPlannerContext.tsx
│   ├── config/                 # ⚙️ Configuration
│   │   └── environment.ts
│   ├── constants/              # 📦 Constants
│   │   ├── constants.ts
│   │   └── messages.ts
│   ├── utils/                  # 🛠️ Utilities
│   │   ├── logger.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── types/                  # 📝 Types
│   │   └── index.ts
│   ├── styles/                 # 🎨 Styles
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── .env                        # Local environment (ignored)
├── .env.example                # Environment template
├── vite.config.ts              # Vite config
├── tsconfig.json               # TypeScript config
├── .eslintrc.json              # ESLint rules
├── ARCHITECTURE.md             # Architecture details
├── IMPLEMENTATION_GUIDE.md     # Implementation guide
├── COMPONENT_MIGRATION_GUIDE.md # Migration guide
└── package.json                # Dependencies
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` based on `.env.example`:

```bash
cp .env.example .env
```

**Available variables:**
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - App version
- `VITE_ENABLE_LOGGING` - Enable/disable logging
- `VITE_LOG_LEVEL` - Logging level (debug, info, warn, error)
- `VITE_PROFIT_MARGIN` - Business profit margin (0.20 = 20%)
- `VITE_API_BASE_URL` - API base URL
- `VITE_API_TIMEOUT` - API timeout in ms

### Import Aliases

Use `@` prefix for clean imports:

```typescript
// ✅ DO
import { MESSAGES } from '@constants/messages';
import { CalculationService } from '@application/services/CalculationService';
import { logger } from '@utils/logger';

// ❌ DON'T
import { MESSAGES } from '../../../../constants/messages';
```

---

## 📖 Usage Examples

### Using Environment Configuration

```typescript
import { config } from '@config/environment';

// Application info
const appName = config.app.name;
const version = config.app.version;

// Business settings
const profitMargin = config.business.profitMargin;

// Logging
if (config.logging.enabled) {
  logger.info('App started');
}
```

### Using Messages

```typescript
import { MESSAGES } from '@constants/messages';

// Validation
if (!numDays) {
  alert(MESSAGES.VALIDATION.REQUIRED_DAYS);
}

// Success
showSuccess(MESSAGES.SUCCESS.CALCULATION_COMPLETED);

// Error
catch (error) {
  alert(MESSAGES.ERROR.CALCULATION_FAILED);
}

// Buttons
<button>{MESSAGES.BUTTONS.CALCULATE}</button>

// Labels
<label>{MESSAGES.LABELS.SCHOOL_NAME}</label>

// Info text
<div>{MESSAGES.INFO.VEHICLE_INFO}</div>
```

### Using Logger

```typescript
import { logger } from '@utils/logger';

// Debug
logger.debug('Vehicle selected', { type: 'BUS 55' });

// Info
logger.info('Plan generated', { days: 3, nights: 2 });

// Warn
logger.warn('No accommodation', { nights: 0 });

// Error
logger.error('Calculation failed', error);

// Access logs
const allLogs = logger.getLogs();
const exported = logger.exportLogs();
console.log(exported);
```

---

## 🎯 Best Practices

✅ **DO:**
- Use environment variables for configuration
- Use MESSAGES for all UI text
- Use logger instead of console.log
- Use import aliases (@)
- Keep domain layer framework-agnostic
- Add new messages to messages.ts
- Add new config to environment.ts

❌ **DON'T:**
- Hardcode strings in components
- Use console.log directly
- Use relative import paths (../../)
- Put UI strings in utility files
- Mix configuration values in components
- Large functions without splitting

---

## 📚 Documentation

Comprehensive guides included:

- **`ARCHITECTURE.md`** - Detailed architecture explanation
- **`IMPLEMENTATION_GUIDE.md`** - How to implement features
- **`COMPONENT_MIGRATION_GUIDE.md`** - How to migrate existing components

---

## 🔄 Development Workflow

### Adding a New Feature

1. **Add UI messages** to `src/constants/messages.ts`
2. **Create domain entities** in `src/domain/entities/`
3. **Create services** in `src/application/services/`
4. **Create components** in `src/presentation/components/`
5. **Use centralized messages** in components
6. **Log with logger** instead of console
7. **Access config** for environment-dependent values

### Updating Messages

All UI text is in one file:

```typescript
// Before: Search entire codebase
grep -r "Please enter" src/

// After: Edit one file
src/constants/messages.ts
```

### Environment-Specific Builds

```bash
# Development
npm run build

# Production (inject via CI/CD)
VITE_LOG_LEVEL=error \
VITE_PROFIT_MARGIN=0.25 \
npm run build
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy

Copy `dist/` folder to your server:

```bash
# Example: Deploy to web server
scp -r dist/* user@server:/var/www/app/
```

### Configure Web Server

For SPA routing (React Router):

```nginx
# Nginx
location / {
  try_files $uri /index.html;
}
```

```apache
# Apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🐛 Troubleshooting

### Build includes source files?
- Check `emptyOutDir: true` in vite.config.ts
- Run `npm run build` fresh (delete dist first)

### Environment variables not working?
- Must start with `VITE_` prefix
- Rebuild after changing .env
- Access via `import.meta.env.VITE_*`

### Messages not updating?
- Ensure importing from `@constants/messages`
- Check spelling of message key
- Verify component is re-rendering

### Port 5173 already in use?
- Run: `lsof -i :5173` to find process
- Or change port in vite.config.ts

---

## 📦 Dependencies

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool
- **ESLint 8** - Code linter
- **Prettier 3** - Code formatter
- **Terser** - JavaScript minifier

---

## 📝 License

Proprietary - All rights reserved

---

## 📞 Support

For questions or issues:
1. Check `ARCHITECTURE.md`
2. Check `IMPLEMENTATION_GUIDE.md`
3. Check `COMPONENT_MIGRATION_GUIDE.md`
4. Review example in `src/components/Step01BasicInfo.tsx`

---

## ✅ Checklist for New Developers

When joining the project:

- [ ] Clone repository
- [ ] Run `npm install --legacy-peer-deps`
- [ ] Copy `.env.example` to `.env`
- [ ] Run `npm run dev`
- [ ] Read `ARCHITECTURE.md`
- [ ] Read `IMPLEMENTATION_GUIDE.md`
- [ ] Review `src/components/Step01BasicInfo.tsx` as example
- [ ] Understand message usage pattern
- [ ] Understand environment configuration
- [ ] Ready to contribute!

---

## 🎉 Summary

This project provides:

✅ Professional clean architecture
✅ Centralized configuration management
✅ All UI messages in one place
✅ Type-safe with TypeScript
✅ Fast development with Vite
✅ Production-ready build output
✅ Comprehensive documentation
✅ Easy to maintain and scale

**Happy coding! 🚀**
