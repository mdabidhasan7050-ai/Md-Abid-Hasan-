
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ChatSection from './components/ChatSection';
import MediaSection from './components/MediaSection';
import HistorySection from './components/HistorySection';
import AboutSection from './components/AboutSection';
import { ChatSession } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('abid_ai_history');
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem('abid_ai_history', JSON.stringify(sessions));
  }, [sessions]);

  const saveSession = (session: ChatSession) => {
    setSessions(prev => [session, ...prev]);
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const clearAllSessions = () => {
    if (window.confirm("Are you sure you want to wipe all your data? This action cannot be undone.")) {
      setSessions([]);
    }
  };

  const selectSession = (session: ChatSession) => {
    // Logic to reload a session could go here
    // For now, we'll just alert that history viewing is coming
    alert(`Viewing history for: ${session.title}\n(Feature to reload chat into interface is under development)`);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'chat' && (
        <ChatSection onSaveSession={saveSession} />
      )}
      {activeTab === 'media' && (
        <MediaSection />
      )}
      {activeTab === 'history' && (
        <HistorySection 
          sessions={sessions} 
          onDelete={deleteSession} 
          onClearAll={clearAllSessions}
          onSelect={selectSession}
        />
      )}
      {activeTab === 'founder' && (
        <AboutSection />
      )}
    </Layout>
  );
};

export default App;
