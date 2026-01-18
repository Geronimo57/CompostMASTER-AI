/**
* (c) 2026 Joël LARSKI
* Released under the MIT License
* Part of the CompostMASTER-AI Project.
*/

import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-emerald-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full text-emerald-600 shadow-inner">
            <i className="fas fa-leaf text-2xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold">Maitre composteur</h1>
            <p className="text-emerald-100 text-xs italic">Cultivons notre avenir</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-emerald-100 px-6 py-3 flex justify-between items-center z-50">
        <button 
          onClick={() => setActiveTab(AppTab.IDENTIFY)}
          className={`flex flex-col items-center transition-colors ${activeTab === AppTab.IDENTIFY ? 'text-emerald-600' : 'text-stone-400'}`}
        >
          <i className={`fas fa-camera text-xl ${activeTab === AppTab.IDENTIFY ? 'scale-110' : ''}`}></i>
          <span className="text-[10px] mt-1 font-medium">Identifier</span>
        </button>
        
        <button 
          onClick={() => setActiveTab(AppTab.CHAT)}
          className={`flex flex-col items-center transition-colors ${activeTab === AppTab.CHAT ? 'text-emerald-600' : 'text-stone-400'}`}
        >
          <i className={`fas fa-comment-dots text-xl ${activeTab === AppTab.CHAT ? 'scale-110' : ''}`}></i>
          <span className="text-[10px] mt-1 font-medium">Assistant</span>
        </button>

        <button 
          onClick={() => setActiveTab(AppTab.GUIDE)}
          className={`flex flex-col items-center transition-colors ${activeTab === AppTab.GUIDE ? 'text-emerald-600' : 'text-stone-400'}`}
        >
          <i className={`fas fa-book-open text-xl ${activeTab === AppTab.GUIDE ? 'scale-110' : ''}`}></i>
          <span className="text-[10px] mt-1 font-medium">Guide</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
