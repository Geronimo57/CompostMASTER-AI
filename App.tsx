/**
* (c) 2026 Joël LARSKI
* Released under the MIT License
* Part of the CompostMASTER-AI Project.
*/


import React, { useState } from 'react';
import Layout from './components/Layout';
import IdentifyView from './components/IdentifyView';
import ChatView from './components/ChatView';
import GuideView from './components/GuideView';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.IDENTIFY);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.IDENTIFY:
        return <IdentifyView />;
      case AppTab.CHAT:
        return <ChatView />;
      case AppTab.GUIDE:
        return <GuideView />;
      default:
        return <IdentifyView />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-300 h-full">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
