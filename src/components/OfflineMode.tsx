
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OfflineManager from './OfflineManager';

interface OfflineModeProps {
  onBack: () => void;
}

const OfflineMode = ({ onBack }: OfflineModeProps) => {
  // Acceder al estado de sincronización global
  const syncData = (window as any).BovinTechSync || {
    isOnline: true,
    isSyncing: false,
    pendingItems: 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#3a210c]">Modo Offline</h1>
        </div>
      </header>

      {/* Componente de gestión offline */}
      {syncData.SyncManager ? (
        <syncData.SyncManager />
      ) : (
        <div className="p-4">
          <div className="text-center text-gray-500">
            Cargando información de sincronización...
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineMode;
