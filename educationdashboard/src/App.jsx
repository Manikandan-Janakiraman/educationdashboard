import React, { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './components/Home';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TopicViewer from './components/TopicViewer';
import { ThemeProvider } from './context/ThemeContext';

function DashboardApp() {
  const { user } = useAuth();
  const [currentTopic, setCurrentTopic] = useState('Dashboard');
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  // If user is not logged in, show Auth screens
  if (!user) {
    if (authView === 'login') {
      return <Login onSwitchToRegister={() => setAuthView('register')} />;
    } else {
      return <Register onSwitchToLogin={() => setAuthView('login')} />;
    }
  }

  // If user IS logged in, show Dashboard
  return (
    <DashboardLayout onMenuSelect={(topic) => setCurrentTopic(topic)}>
      {/* Dynamic Content Rendering */}
      {currentTopic === 'Dashboard' ? (
        <Home />
      ) : currentTopic === 'Profile' ? (
        <Profile />
      ) : (
        <TopicViewer topic={currentTopic} />
      )}
    </DashboardLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DashboardApp />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
