import { ReactNode } from 'react';
import { HeaderProps } from '../Header';
import { SidebarProps } from '../Sidebar';

export interface LayoutProps {
  children: ReactNode;
  headerProps: Omit<HeaderProps, 'className'>;
  sidebarProps: Omit<SidebarProps, 'className'>;
  contentClassName?: string;
} 