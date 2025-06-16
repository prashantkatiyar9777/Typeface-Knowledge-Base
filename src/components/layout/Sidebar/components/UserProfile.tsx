import React from 'react';
import { UserPlus } from 'lucide-react';
import { UserProfileProps } from '../Sidebar.types';
import { commonStyles } from '../../../../styles/common';

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  avatar,
  onInviteClick,
  trialDaysLeft
}) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
              <span className={`text-gray-600 text-lg font-medium ${commonStyles.fontFamily}`}>
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-gray-900 truncate ${commonStyles.text.base}`}>
            {name}
          </p>
          <p className={`text-gray-500 truncate ${commonStyles.text.base}`}>
            {email}
          </p>
          {trialDaysLeft > 0 && (
            <p className={`mt-1 text-blue-600 ${commonStyles.text.base}`}>
              {trialDaysLeft} days left in trial
            </p>
          )}
        </div>

        <button
          onClick={onInviteClick}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600"
          title="Invite team members"
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}; 