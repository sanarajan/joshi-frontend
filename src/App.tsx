import React from 'react';
import { TourPlannerProvider } from '@context/TourPlannerContext';
import { AppContent } from '@components/AppContent';
import { MainLayout } from '@presentation/layouts/MainLayout';
import { logger } from '@utils/logger';
import { config } from '@config/environment';

const App: React.FC = () => {
  React.useEffect(() => {
    logger.info(`${config.app.name} v${config.app.version} started`, {
      description: config.app.description,
      loggingEnabled: config.logging.enabled,
      environment: import.meta.env.MODE,
    });
  }, []);

  return (
    <MainLayout>
      <TourPlannerProvider>
        <AppContent />
      </TourPlannerProvider>
    </MainLayout>
  );
};

export default App;
