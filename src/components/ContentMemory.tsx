import React, { useState } from 'react';
import { Users, BarChart2, Clock } from 'lucide-react';
import { GlobalInsightsDashboard } from './memory/GlobalInsightsDashboard';
import { FolderLevelInsights } from './memory/FolderLevelInsights';
import { AgentTrainingSystem } from './memory/AgentTrainingSystem';

interface ContentMemoryProps {
  onBack: () => void;
}

type TabId = 'dashboard' | 'patterns' | 'agents';

interface NavigationItem {
  icon: JSX.Element;
  title: string;
  description: string;
  path: TabId;
}

export const ContentMemory: React.FC<ContentMemoryProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const navigationItems: NavigationItem[] = [
    {
      icon: <BarChart2 className="w-5 h-5 text-[#111013]" />,
      title: "Global Brand DNA Dashboard",
      description: "See the big picture of your brand's content",
      path: "dashboard"
    },
    {
      icon: <Clock className="w-5 h-5 text-[#111013]" />,
      title: "Category Level Insights",
      description: "See the brand DNA for each category",
      path: "patterns"
    },
    {
      icon: <Users className="w-5 h-5 text-[#111013]" />,
      title: "Agents Settings",
      description: "Personalise Agents on your Brand's Content Behavior",
      path: "agents"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <GlobalInsightsDashboard />;
      case 'patterns':
        return <FolderLevelInsights onBack={() => setActiveTab('dashboard')} />;
      case 'agents':
        return <AgentTrainingSystem onBack={() => setActiveTab('dashboard')} />;
      default:
        return <GlobalInsightsDashboard />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Content Memory</h1>          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => setActiveTab(item.path)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors flex-1 ${
                activeTab === item.path
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <div className="text-left">
                <div>{item.title}</div>
                <div className="text-xs text-gray-500 font-normal">{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};