
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RotateCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OfflineManagerProps {
  children: React.ReactNode;
}

interface SyncItem {
  id: string;
  module: string;
  action: string;
  timestamp: string;
  status: 'pending' | 'synced' | 'error';
}

const OfflineManager = ({ children }: OfflineManagerProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingItems, setPendingItems] = useState<SyncItem[]>([
    {
      id: '1',
      module: 'Trazabilidad',
      action: 'Crear animal 00995',
      timestamp: '2024-06-15 14:30',
      status: 'pending'
    },
    {
      id: '2',
      module: 'Peso',
      action: 'Registrar peso 640kg',
      timestamp: '2024-06-15 15:15',
      status: 'pending'
    },
    {
      id: '3',
      module: 'Sanidad',
      action: 'Vacuna Fiebre Aftosa',
      timestamp: '2024-06-15 16:00',
      status: 'pending'
    }
  ]);

  const [syncHistory, setSyncHistory] = useState([
    { timestamp: '2024-06-15 13:45', items: 5, status: 'success' },
    { timestamp: '2024-06-15 10:30', items: 2, status: 'success' },
    { timestamp: '2024-06-14 18:20', items: 8, status: 'success' },
    { timestamp: '2024-06-14 15:10', items: 3, status: 'error' },
    { timestamp: '2024-06-14 12:05', items: 6, status: 'success' }
  ]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (pendingItems.some(item => item.status === 'pending')) {
        // Auto-sync cuando se recupera la conexión
        setTimeout(() => {
          handleSync();
        }, 2000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingItems]);

  const handleSync = async () => {
    setIsSyncing(true);
    
    // Simular sincronización
    for (let i = 0; i < pendingItems.length; i++) {
      if (pendingItems[i].status === 'pending') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPendingItems(prev => prev.map((item, index) => 
          index === i ? { ...item, status: 'synced' as const } : item
        ));
      }
    }

    // Agregar al historial
    const syncedCount = pendingItems.filter(item => item.status === 'pending').length;
    if (syncedCount > 0) {
      setSyncHistory(prev => [{
        timestamp: new Date().toLocaleString('es-BO'),
        items: syncedCount,
        status: 'success'
      }, ...prev.slice(0, 4)]);
    }

    setIsSyncing(false);
  };

  const ConnectionIndicator = () => (
    <div className="fixed top-2 right-2 z-50">
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
        isSyncing 
          ? 'bg-yellow-100 text-yellow-800' 
          : isOnline 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
      }`}>
        {isSyncing ? (
          <RotateCw className="h-3 w-3 animate-spin" />
        ) : isOnline ? (
          <Wifi className="h-3 w-3" />
        ) : (
          <WifiOff className="h-3 w-3" />
        )}
        <span>
          {isSyncing ? 'Sincronizando...' : isOnline ? 'Conectado' : 'Sin conexión'}
        </span>
      </div>
    </div>
  );

  const OfflineBanner = () => {
    if (isOnline) return null;
    
    return (
      <div className="bg-red-600 text-white px-4 py-2 text-center text-sm">
        Sin conexión: datos guardados localmente
      </div>
    );
  };

  const SyncManager = () => (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#3a210c] flex items-center justify-between">
            <span>Estado de Sincronización</span>
            <div className={`flex items-center space-x-1 ${
              isOnline ? 'text-green-600' : 'text-red-600'
            }`}>
              {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              <span className="text-sm">
                {isOnline ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#3a210c]">Elementos pendientes:</span>
              <span className="font-bold text-[#ac815d]">
                {pendingItems.filter(item => item.status === 'pending').length}
              </span>
            </div>
            
            {isOnline && pendingItems.some(item => item.status === 'pending') && (
              <Button 
                onClick={handleSync}
                disabled={isSyncing}
                className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white"
              >
                {isSyncing ? (
                  <>
                    <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  'Sincronizar ahora'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Elementos Pendientes */}
      {pendingItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#3a210c]">Elementos Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pendingItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#3a210c]">{item.action}</p>
                    <p className="text-xs text-gray-600">{item.module} - {item.timestamp}</p>
                  </div>
                  <div className="ml-2">
                    {item.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                    {item.status === 'synced' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {item.status === 'error' && <XCircle className="h-4 w-4 text-red-600" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historial de Sincronización */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#3a210c]">Historial de Sincronización</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {syncHistory.map((sync, index) => (
              <div key={index} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm text-[#3a210c]">{sync.items} elementos</p>
                  <p className="text-xs text-gray-600">{sync.timestamp}</p>
                </div>
                <div className="ml-2">
                  {sync.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Exportar componentes para uso en otros módulos
  React.useEffect(() => {
    // Hacer disponibles globalmente los componentes de sincronización
    window.BovinTechSync = {
      ConnectionIndicator,
      OfflineBanner,
      SyncManager,
      isOnline,
      isSyncing,
      pendingItems: pendingItems.filter(item => item.status === 'pending').length
    };
  }, [isOnline, isSyncing, pendingItems]);

  return (
    <>
      <ConnectionIndicator />
      <OfflineBanner />
      {children}
    </>
  );
};

export default OfflineManager;
