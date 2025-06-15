
import React, { useState } from 'react';
import { ArrowLeft, Plus, TrendingUp, Scale, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MonitoreoPesoModuleProps {
  onBack: () => void;
}

const MonitoreoPesoModule = ({ onBack }: MonitoreoPesoModuleProps) => {
  const [showWeightForm, setShowWeightForm] = useState(false);

  const pesoData = [
    { id: '00993', lote: 'A-2024', pesoActual: 450, pesoAnterior: 445, fecha: '2024-06-15', ganancia: '+5kg' },
    { id: '00994', lote: 'A-2024', pesoActual: 425, pesoAnterior: 422, fecha: '2024-06-14', ganancia: '+3kg' },
    { id: '00995', lote: 'B-2024', pesoActual: 380, pesoAnterior: 385, fecha: '2024-06-13', ganancia: '-5kg' },
    { id: '00996', lote: 'B-2024', pesoActual: 465, pesoAnterior: 458, fecha: '2024-06-12', ganancia: '+7kg' },
    { id: '00997', lote: 'C-2024', pesoActual: 440, pesoAnterior: 435, fecha: '2024-06-11', ganancia: '+5kg' }
  ];

  const promedios = [
    { lote: 'A-2024', promedio: 437.5, animales: 25, objetivo: 450, progreso: 97 },
    { lote: 'B-2024', promedio: 422.5, animales: 30, objetivo: 440, progreso: 96 },
    { lote: 'C-2024', promedio: 440, animales: 22, objetivo: 455, progreso: 97 }
  ];

  return (
    <div className="min-h-screen bg-[#F1D2B9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#3a210c]">Monitoreo de Peso</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="card-shadow bg-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Scale className="h-6 w-6 text-[#ac815d]" />
              </div>
              <div className="text-2xl font-bold text-[#3a210c]">438kg</div>
              <div className="text-sm text-gray-600">Peso Promedio</div>
            </CardContent>
          </Card>
          <Card className="card-shadow bg-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">+4.2kg</div>
              <div className="text-sm text-gray-600">Ganancia Semanal</div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Tendencia */}
        <Card className="border border-[#ac815d] bg-white">
          <CardHeader>
            <CardTitle className="text-[#3a210c] flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Tendencia de Peso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-between p-4">
              {/* Gráfico simplificado */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-16 bg-[#ac815d] rounded-t"></div>
                <span className="text-xs text-gray-600">Sem 1</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-18 bg-[#ac815d] rounded-t"></div>
                <span className="text-xs text-gray-600">Sem 2</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-20 bg-[#ac815d] rounded-t"></div>
                <span className="text-xs text-gray-600">Sem 3</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-6 h-24 bg-[#ac815d] rounded-t"></div>
                <span className="text-xs text-gray-600">Sem 4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promedios por Lote */}
        <div>
          <h2 className="text-lg font-semibold text-[#3a210c] mb-4">Promedios por Lote</h2>
          <div className="space-y-3">
            {promedios.map(lote => (
              <Card key={lote.lote} className="border border-[#ac815d] bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-[#3a210c]">{lote.lote}</h3>
                    <span className="text-sm text-gray-500">{lote.animales} animales</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Peso promedio:</span>
                      <span className="font-semibold text-[#3a210c]">{lote.promedio}kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Objetivo:</span>
                      <span className="text-sm text-gray-600">{lote.objetivo}kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#ac815d] h-2 rounded-full" 
                        style={{ width: `${lote.progreso}%` }}
                      ></div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{lote.progreso}% del objetivo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registros Individuales */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3a210c]">Últimos Registros</h2>
            <button className="text-sm text-[#ac815d] hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {pesoData.map(animal => (
              <Card key={animal.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-[#3a210c]">ID: {animal.id}</h3>
                        <span className="px-2 py-1 bg-[#f0cbad] text-[#3a210c] text-xs rounded-full">
                          {animal.lote}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Peso actual:</span>
                          <span className="font-semibold text-[#3a210c]">{animal.pesoActual}kg</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Anterior:</span>
                          <span className="text-sm text-gray-600">{animal.pesoAnterior}kg</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        animal.ganancia.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {animal.ganancia}
                      </div>
                      <div className="text-xs text-gray-500">{animal.fecha}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6">
        <Sheet open={showWeightForm} onOpenChange={setShowWeightForm}>
          <SheetTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full bg-[#ac815d] hover:bg-[#3a210c] text-white fab-shadow"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh]">
            <SheetHeader>
              <SheetTitle className="text-[#3a210c]">Registrar Peso</SheetTitle>
            </SheetHeader>
            
            <div className="p-4 space-y-4">
              <div>
                <Label className="text-[#3a210c]">ID Animal</Label>
                <Input placeholder="Escanear o escribir ID" className="mt-1" />
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
                <Label className="text-[#3a210c]">Observaciones</Label>
                <textarea 
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md" 
                  rows={3}
                  placeholder="Observaciones adicionales..."
                ></textarea>
              </div>

              <Button className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white">
                Guardar Peso
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MonitoreoPesoModule;
