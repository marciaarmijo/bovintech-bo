
import React, { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import AuthScreens from '@/components/AuthScreens';
import MainApp from '@/components/MainApp';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'auth' | 'app'>('splash');

  const handleStart = () => {
    setCurrentScreen('auth');
  };

  const handleLogin = () => {
    setCurrentScreen('app');
  };

  if (currentScreen === 'splash') {
    return <SplashScreen onStart={handleStart} />;
  }

  if (currentScreen === 'auth') {
    return <AuthScreens onLogin={handleLogin} />;
  }

  return <MainApp />;
};

export default Index;
