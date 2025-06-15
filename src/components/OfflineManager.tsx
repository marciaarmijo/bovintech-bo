
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  isSyncing: boolean;
  pendingItems: number;
  syncData: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineManager');
  }
  return context;
};

interface OfflineManagerProps {
  children: ReactNode;
}

const OfflineManager = ({ children }: OfflineManagerProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingItems, setPendingItems] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto sync when coming back online
      syncData();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize sync manager on global window
    const globalSync = {
      isOnline,
      isSyncing,
      pendingItems,
      SyncManager: () => (
        <div className="p-4 space-y-4">
          <div className="text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
              isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{isOnline ? 'Conectado' : 'Sin conexión'}</span>
            </div>
          </div>
          
          {pendingItems > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-2">Datos pendientes de sincronización</h3>
              <p className="text-amber-700">{pendingItems} elementos esperando sincronización</p>
            </div>
          )}
          
          <button
            onClick={syncData}
            disabled={!isOnline || isSyncing}
            className="w-full bg-[#3a210c] text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSyncing ? 'Sincronizando...' : 'Sincronizar ahora'}
          </button>
          
          <div className="text-sm text-gray-600">
            <p>Última sincronización: Hace 2 horas</p>
          </div>
        </div>
      )
    };

    (window as any).BovinTechSync = globalSync;

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      delete (window as any).BovinTechSync;
    };
  }, [isOnline, isSyncing, pendingItems]);

  const syncData = async () => {
    if (!isOnline || isSyncing) return;
    
    setIsSyncing(true);
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPendingItems(0);
      console.log('Sync completed successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const value: OfflineContextType = {
    isOnline,
    isSyncing,
    pendingItems,
    syncData
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};

export default OfflineManager;
