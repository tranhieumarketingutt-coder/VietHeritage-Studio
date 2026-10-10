import React, { ReactNode } from 'react';

export interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Application providers wrapper.
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return <>{children}</>;
};
