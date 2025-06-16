import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import FolderView from './components/FolderView';
import { ContentMemory } from './components/ContentMemory';
import { Category } from './types';

type ViewType = 'main' | 'folder' | 'brandHub' | 'contentMemory';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('folder');
  };

  const handleBackToMain = () => {
    setSelectedCategory(null);
    setCurrentView('main');
  };

  const handleContentMemorySelect = () => {
    setCurrentView('contentMemory');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'folder':
        return selectedCategory ? (
          <FolderView 
            category={selectedCategory} 
            onBack={handleBackToMain}
          />
        ) : null;
      case 'brandHub':
        return null;
      case 'contentMemory':
        return <ContentMemory onBack={handleBackToMain} />;
      default:
        return <MainContent onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar 
        onBackToMain={handleBackToMain}
        onContentMemorySelect={handleContentMemorySelect}
        currentView={currentView}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;