import { Category } from '../../../types';

export interface SidebarProps {
  selectedCategory: Category | null;
  onCategorySelect: (category: Category) => void;
  onBackToMain: () => void;
  onBrandHubSelect?: () => void;
  onContentMemorySelect?: () => void;
}

export interface NavItem {
  icon: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  badge?: {
    type: 'crown' | 'count';
    value?: number;
  };
}

export interface TeamSelectorProps {
  selectedTeam: string;
  onTeamChange: (team: string) => void;
}

export interface UserProfileProps {
  name: string;
  email: string;
  avatar?: string;
  onInviteClick: () => void;
  trialDaysLeft: number;
} 