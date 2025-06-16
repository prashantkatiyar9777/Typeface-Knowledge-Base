import React from 'react';
import { Dropdown } from '../../../common/Dropdown/Dropdown';
import { TeamSelectorProps } from '../Sidebar.types';

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  selectedTeam,
  onTeamChange
}) => {
  const teams = ['Personal', 'Team A', 'Team B'];

  const renderTeamInitials = (team: string) => {
    return team.split(' ').map(word => word[0]).join('');
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-6 h-6 bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 text-xs font-medium">
            {renderTeamInitials(selectedTeam)}
          </span>
        </div>
      </div>
      <Dropdown
        options={teams}
        selectedOption={selectedTeam}
        onSelect={onTeamChange}
      />
    </div>
  );
}; 