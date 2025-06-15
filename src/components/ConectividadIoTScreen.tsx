
import React, { useState, useEffect } from 'react';
import { X, Check, AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConectividadIoTScreenProps {
  onBack: () => void;
}

const ConectividadIoTScreen = ({ onBack }: ConectividadIoTScreenProps) => {
  const [connectionState, setConnectionState] = useState<'searching' | 'connected' | 'error'>('searching');
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    // Simular búsqueda de dispositivo
    const timer = setTimeout(() => {
      setShowSpinner(false);
      // Simular resultado aleatorio
      const success = Math.random() > 0.3; // 70% de éxito
      setConnectionState(success ? 'connected' : 'error');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setConnectionState('searching');
    setShowSpinner(true);
    
    const timer = setTimeout(() => {
      setShowSpinner(false);
      const success = Math.random() > 0.3;
      setConnectionState(success ? 'connected' : 'error');
    }, 3000);

    return () => clearTimeout(timer);
  };

  const getStateIcon = () => {
    switch (connectionState) {
      case 'connected':
        return <Check className="h-16 w-16 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-16 w-16 text-red-500" />;
      default:
        return (
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
        );
    }
  };

  const getStateText = () => {
    switch (connectionState) {
      case 'connected':
        return 'Dispositivo conectado';
      case 'error':
        return 'No se encontró dispositivo';
      default:
        return showSpinner ? 'Buscando dispositivo...' : 'Conectando...';
    }
  };

  return (
    <div className="min-h-screen bg-[#3a210c] relative">
      {/* Header */}
      <header className="bg-[#3a210c] px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Conectando dispositivo</h1>
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/10">
            <X className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-8 py-16 text-center text-white min-h-[calc(100vh-80px)]">
        {/* Device illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-20 border-2 border-white rounded-lg flex items-center justify-center mb-4">
            <div className="text-white text-sm">Báscula</div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Bluetooth icon */}
        <div className="mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <div className="text-white text-xl">⚡</div>
          </div>
        </div>

        {/* Instruction text */}
        <p className="text-lg mb-8 max-w-sm">
          Acerca el dispositivo a la báscula Bluetooth.
        </p>

        {/* State indicator */}
        <div className="mb-8">
          {getStateIcon()}
        </div>

        {/* Status text */}
        <p className="text-lg mb-8">
          {getStateText()}
        </p>

        {/* Action buttons */}
        {connectionState === 'error' && (
          <div className="flex space-x-4">
            <Button
              onClick={handleRetry}
              className="bg-white text-[#3a210c] hover:bg-gray-100"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
          </div>
        )}

        {connectionState === 'connected' && (
          <Button
            onClick={onBack}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Continuar
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConectividadIoTScreen;
