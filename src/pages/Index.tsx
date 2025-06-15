
import React, { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AuthScreens from '@/components/AuthScreens';
import MainApp from '@/components/MainApp';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'auth' | 'app'>('splash');

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setCurrentScreen('auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setCurrentScreen('app');
  };

  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'auth') {
    return <AuthScreens onLogin={handleLogin} />;
  }

  return <MainApp />;
};

export default Index;
