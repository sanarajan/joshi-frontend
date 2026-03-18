/**
 * Presentation - Main Layout
 * Top level wrapper for the application
 */

import React, { ReactNode } from 'react';
import '@styles/globals.css';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="scene">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
        <div className="blob b4"></div>
      </div>
      {children}
    </>
  );
};
