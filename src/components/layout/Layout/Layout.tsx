import React from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { LayoutProps } from './Layout.types';

export const Layout: React.FC<LayoutProps> = ({
  children,
  headerProps,
  sidebarProps,
  contentClassName = ''
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar {...sidebarProps} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header {...headerProps} />
        
        <main className={`flex-1 overflow-auto p-6 ${contentClassName}`}>
          {children}
        </main>
      </div>
    </div>
  );
}; 