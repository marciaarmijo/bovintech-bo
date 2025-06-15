
import React from 'react';

const SplashScreen = () => {
  return (
    <div className="min-h-screen bovin-gradient flex flex-col items-center justify-center text-white">
      <div className="mb-8 animate-scale-in">
        <img 
          src="/lovable-uploads/971a2a52-95fd-42f6-b39c-380f8db46647.png" 
          alt="BovinTech Logo" 
          className="w-32 h-32 object-contain"
        />
      </div>
      
      <div className="text-center animate-fade-in px-6">
        <h1 className="text-2xl font-bold mb-2">BovinTech</h1>
        <p className="text-lg opacity-90 max-w-sm leading-relaxed">
          Empoderando al ganadero boliviano con tecnología accesible e intuitiva
        </p>
      </div>
      
      <div className="mt-12 animate-fade-in">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
