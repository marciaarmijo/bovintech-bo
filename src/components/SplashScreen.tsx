
import React from 'react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen = ({ onStart }: SplashScreenProps) => {
  return (
    <div className="min-h-screen bovin-gradient flex flex-col items-center justify-center text-white px-6">
      <div className="mb-8 animate-scale-in">
        <img 
          src="/lovable-uploads/ecb70fe3-2f1a-475b-9191-ddaa4b955297.png" 
          alt="BovinTech Logo" 
          className="w-40 h-40 object-contain"
        />
      </div>
      
      <div className="text-center animate-fade-in mb-12">
        <h1 className="text-3xl font-bold mb-4">BovinTech</h1>
        <p className="text-lg opacity-90 max-w-sm leading-relaxed">
          Empoderando al ganadero boliviano con tecnología accesible e intuitiva
        </p>
      </div>
      
      <div className="animate-fade-in">
        <Button 
          onClick={onStart}
          className="bg-white text-[#3a210c] hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg"
        >
          Iniciar
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
