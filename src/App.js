import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { TourPlannerProvider } from '@context/TourPlannerContext';
import { AppContent } from '@components/AppContent';
import '@styles/globals.css';
import { logger } from '@utils/logger';
const App = () => {
    React.useEffect(() => {
        logger.info('Application started');
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "scene", children: [_jsx("div", { className: "blob b1" }), _jsx("div", { className: "blob b2" }), _jsx("div", { className: "blob b3" }), _jsx("div", { className: "blob b4" })] }), _jsx(TourPlannerProvider, { children: _jsx(AppContent, {}) })] }));
};
export default App;
