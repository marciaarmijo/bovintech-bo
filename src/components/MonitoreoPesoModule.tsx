
import React, { useState } from 'react';
import { ArrowLeft, Plus, Bluetooth, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MonitoreoPesoModuleProps {
  onBack: () => void;
}

const MonitoreoPesoModule = ({ onBack }: MonitoreoPesoModuleProps) => {
  const [showPesoForm, setShowPesoForm] = useState(false);
  const [bluetoothConnected, setBluetoothConnected] = useState(false);

  const pesosRecientes = [
    { id: 1, fecha: '2024-06-15', peso: 640, bluetooth: true },
    { id: 2, fecha: '2024-06-10', peso: 635, bluetooth: false },
    { id: 3, fecha: '2024-06-05', peso: 630, bluetooth: true },
    { id: 4, fecha: '2024-06-01', peso: 625, bluetooth: false }
  ];

  const ultimoPeso = pesosRecientes[0];
  const gananciaMedia = 2.5; // kg/día

  const handleBluetoothSync = () => {
    setBluetoothConnected(true);
    // Simular importación de datos
    setTimeout(() => {
      alert('3 nuevas lecturas importadas exitosamente');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
            </Button>
            <h1 className="text-xl font-semibold text-[#3a210c]">Monitoreo de Peso</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBluetoothSync}
            className={bluetoothConnected ? 'text-green-600' : 'text-[#3a210c]'}
          >
            <Bluetooth className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Resumen del Animal */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#3a210c]">Animal 00993</CardTitle>
                <p className="text-lg font-semibold text-[#ac815d]">
                  Último peso: {ultimoPeso.peso} kg
                </p>
              </div>
              <div className="w-16 h-16 bg-[#f0cbad] rounded-full flex items-center justify-center">
                <span className="text-[#3a210c] font-bold text-lg">993</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Evolución */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#3a210c] flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Evolución
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#3a210c]">Peso actual:</span>
                <span className="font-semibold text-[#3a210c]">{ultimoPeso.peso} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#3a210c]">Ganancia media:</span>
                <span className="font-semibold text-green-600">+{gananciaMedia} kg/día</span>
              </div>
              
              {/* Gráfico Simulado */}
              <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-between p-2 mt-4">
                {pesosRecientes.reverse().map((peso, index) => (
                  <div key={peso.id} className="flex flex-col items-center">
                    <div 
                      className="bg-[#ac815d] rounded-t-sm w-6"
                      style={{ height: `${(peso.peso - 600) * 2}px` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">
                      {peso.fecha.split('-')[2]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bluetooth Sync */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-[#3a210c]">Sincronización Bluetooth</h4>
                <p className="text-sm text-gray-600">
                  {bluetoothConnected ? 'Conectado - ' : 'Desconectado - '}
                  Última sync: 10:30 AM
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={handleBluetoothSync}
                className="border-[#ac815d] text-[#ac815d]"
              >
                Sincronizar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Historial Reciente */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3a210c]">Historial</h2>
            <button className="text-sm text-[#ac815d] hover:underline">Ver todas</button>
          </div>
          <div className="space-y-3">
            {pesosRecientes.slice(0, 3).map(peso => (
              <Card key={peso.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-[#3a210c]">{peso.peso} kg</span>
                        {peso.bluetooth && (
                          <Bluetooth className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{peso.fecha}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Calendar className="h-4 w-4 text-[#ac815d]" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6">
        <Sheet open={showPesoForm} onOpenChange={setShowPesoForm}>
          <SheetTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full bg-[#ac815d] hover:bg-[#3a210c] text-white fab-shadow"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[60vh]">
            <SheetHeader>
              <SheetTitle className="text-[#3a210c]">Registrar Peso</SheetTitle>
            </SheetHeader>
            
            <div className="p-4 space-y-4">
              <div>
                <Label className="text-[#3a210c]">Animal</Label>
                <Input placeholder="Código del animal" className="mt-1" />
              </div>
              
              <div>
                <Label className="text-[#3a210c]">Peso (kg)</Label>
                <Input type="number" placeholder="0.0" className="mt-1" />
              </div>

              <div>
                <Label className="text-[#3a210c]">Fecha</Label>
                <Input type="date" className="mt-1" />
              </div>

              <div>
                <Label className="text-[#3a210c]">Notas</Label>
                <textarea 
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md h-16"
                  placeholder="Observaciones..."
                />
              </div>

              <Button className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white">
                Registrar Peso
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MonitoreoPesoModule;
