import React from 'react';
import { ArrowLeft, Home, Crown, BrainCircuit } from 'lucide-react';
import { SidebarProps } from './Sidebar.types';
import { TeamSelector } from './components/TeamSelector';
import { UserProfile } from './components/UserProfile';
import { commonStyles } from '../../../styles/common';

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onBackToMain,
  onBrandHubSelect,
  onContentMemorySelect
}) => {
  const navItems = [
    {
      icon: 'home',
      label: 'Home',
      onClick: onBackToMain,
      isActive: !selectedCategory
    },
    {
      icon: 'crown',
      label: 'Brand Hub',
      onClick: onBrandHubSelect,
      badge: { type: 'crown' }
    },
    {
      icon: 'brain',
      label: 'Content Memory',
      onClick: onContentMemorySelect,
      badge: { type: 'count', value: 3 }
    }
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'crown':
        return <Crown className="w-5 h-5" />;
      case 'brain':
        return <BrainCircuit className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={`w-64 h-screen bg-white border-r border-gray-200 flex flex-col ${commonStyles.fontFamily}`}>
      <div className="p-4">
        <TeamSelector
          selectedTeam="Personal"
          onTeamChange={(team) => console.log('Team changed:', team)}
        />
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {selectedCategory && (
          <button
            onClick={onBackToMain}
            className={`w-full flex items-center px-3 py-2 ${commonStyles.text.base} text-gray-600 hover:bg-gray-100`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Main
          </button>
        )}

        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`w-full flex items-center justify-between px-3 py-2 ${commonStyles.text.base} ${
              item.isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              {renderIcon(item.icon)}
              <span className="ml-3">{item.label}</span>
            </div>

            {item.badge && (
              <div className={`flex items-center ${
                item.badge.type === 'crown' ? 'text-yellow-500' : 'text-blue-600'
              }`}>
                {item.badge.type === 'crown' ? (
                  <Crown className="w-4 h-4" />
                ) : (
                  <span className={`${commonStyles.text.base}`}>{item.badge.value}</span>
                )}
              </div>
            )}
          </button>
        ))}
      </nav>

      <UserProfile
        name="John Doe"
        email="john@example.com"
        onInviteClick={() => console.log('Invite clicked')}
        trialDaysLeft={14}
      />
    </div>
  );
}; 