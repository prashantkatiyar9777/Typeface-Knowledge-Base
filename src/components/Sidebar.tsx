import React, { useState } from 'react';
import { ChevronDown, Home, Folder, Image, Users, FileText, Crown, UserCheck, Brain, Database } from 'lucide-react';
import BrandIcon from './icons/BrandIcon';

interface SidebarProps {
  onBackToMain: () => void;
  onContentMemorySelect: () => void;
  currentView: 'main' | 'folder' | 'brandHub' | 'contentMemory';
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onBackToMain,
  onContentMemorySelect,
  currentView
}) => {
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="font-semibold text-gray-900">Typeface</span>
        </div>
        
        {/* Team Selector */}
        <div className="relative">
          <button
            onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
            className="w-full flex items-center justify-between p-2 border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xs font-medium">NT</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Prashant's Team</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#111013]" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          <button 
            className="w-full flex items-center space-x-3 p-2 text-left transition-colors text-gray-600 cursor-not-allowed"
            disabled
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </button>

          <button 
            className="w-full flex items-center space-x-3 p-2 text-left transition-colors text-gray-600 cursor-not-allowed"
            disabled
          >
            <Folder className="w-5 h-5" />
            <span className="text-sm font-medium">Projects</span>
          </button>
        </div>

        {/* Hub Section */}
        <div className="mt-6">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Hub</h3>
          <div className="space-y-1">
            <button 
              className="w-full flex items-center space-x-3 p-2 text-left transition-colors text-gray-600 cursor-not-allowed"
              disabled
            >
              <Image className="w-5 h-5" />
              <span className="text-sm font-medium">Assets</span>
            </button>

            <button 
              onClick={onBackToMain}
              className={`w-full flex items-center space-x-3 p-2 text-left transition-colors ${
                currentView === 'main' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Database className="w-5 h-5" />
              <span className="text-sm font-medium">Knowledge Repository</span>
            </button>

            <button 
              onClick={onContentMemorySelect}
              className={`w-full flex items-center space-x-3 p-2 text-left transition-colors ${
                currentView === 'contentMemory' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium">Content Memory</span>
            </button>

            <button 
              className="w-full flex items-center justify-between p-2 text-left transition-colors text-gray-600 cursor-not-allowed"
              disabled
            >
              <div className="flex items-center space-x-3">
                <BrandIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Brands</span>
              </div>
              <Crown className="w-3 h-3 text-[#111013]" />
            </button>

            <button 
              className="w-full flex items-center justify-between p-2 text-left transition-colors text-gray-600 cursor-not-allowed"
              disabled
            >
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Audiences</span>
              </div>
              <Crown className="w-3 h-3 text-[#111013]" />
            </button>

            <button 
              className="w-full flex items-center space-x-3 p-2 text-left transition-colors text-gray-600 cursor-not-allowed"
              disabled
            >
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Templates</span>
            </button>
          </div>
        </div>

        {/* Other Section */}
        <div className="mt-6">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Other</h3>
          <div className="space-y-1">
            <button 
              className="w-full flex items-center space-x-3 p-2 text-left transition-colors text-gray-600 cursor-not-allowed"
              disabled
            >
              <UserCheck className="w-5 h-5" />
              <span className="text-sm font-medium">Approvals</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Section - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-gray-100 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">P</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Prashant Katiyar</div>
            <div className="text-xs text-gray-500">hwewniwhrew@gmail.com</div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#111013]" />
        </div>
        
        <button className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors mb-3">
          <Users className="w-4 h-4" />
          <span>Invite</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-red-500"></div>
          <span>Trial ends in 10 days</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;