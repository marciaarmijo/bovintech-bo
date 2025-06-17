
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface OfflineModeProps {
  onBack: () => void;
}

const OfflineMode = ({ onBack }: OfflineModeProps) => {
  const [isOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingItems, setPendingItems] = useState(12);
  const [lastSync, setLastSync] = useState('Hace 2 horas');
  const { toast } = useToast();

  const handleSync = async () => {
    if (!isOnline || isSyncing) return;
    
    setIsSyncing(true);
    
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update pending items and last sync time
      setPendingItems(0);
      const now = new Date();
      const formattedDate = now.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const formattedTime = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setLastSync(`${formattedDate} – ${formattedTime}`);
      
      toast({
        title: "Sincronización completada",
        description: "Todos los datos han sido sincronizados correctamente",
      });
    } catch (error) {
      toast({
        title: "Error de sincronización",
        description: "No se pudo completar la sincronización",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
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
        
        <Button
          onClick={handleSync}
          disabled={!isOnline || isSyncing}
          className="w-full bg-[#3a210c] text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSyncing ? 'Sincronizando...' : 'Sincronizar ahora'}
        </Button>
        
        <div className="text-sm text-gray-600 text-center">
          <p>Último sync: {lastSync}</p>
        </div>
      </div>
    </div>
  );
};

export default OfflineMode;
