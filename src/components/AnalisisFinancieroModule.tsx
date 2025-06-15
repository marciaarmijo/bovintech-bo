
import React, { useState } from 'react';
import { ArrowLeft, Plus, DollarSign, TrendingUp, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AnalisisFinancieroModuleProps {
  onBack: () => void;
}

const AnalisisFinancieroModule = ({ onBack }: AnalisisFinancieroModuleProps) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [targetMargin, setTargetMargin] = useState(25);

  const kpis = [
    { label: 'Ingresos totales', value: '125,400', unit: 'Bs.', change: '+12%' },
    { label: 'Costos totales', value: '89,200', unit: 'Bs.', change: '+8%' },
    { label: 'Margen bruto', value: '36,200', unit: 'Bs.', change: '+18%' },
    { label: 'ROI', value: '28.9', unit: '%', change: '+3.2%' },
    { label: 'Coste promedio/cabeza', value: '1,450', unit: 'Bs.', change: '-5%' },
    { label: 'Margen promedio/cabeza', value: '425', unit: 'Bs.', change: '+15%' }
  ];

  const transacciones = [
    {
      id: 1,
      fecha: '2024-06-15',
      concepto: 'Venta Animal 00993',
      tipo: 'Ingreso',
      categoria: 'Ventas',
      monto: 8500,
      lote: 'A-2024'
    },
    {
      id: 2,
      fecha: '2024-06-14',
      concepto: 'Compra alimento balanceado',
      tipo: 'Gasto',
      categoria: 'Alimentación',
      monto: -1200,
      lote: 'General'
    },
    {
      id: 3,
      fecha: '2024-06-12',
      concepto: 'Vacunación Fiebre Aftosa',
      tipo: 'Gasto',
      categoria: 'Sanidad',
      monto: -350,
      lote: 'B-2024'
    }
  ];

  const categorias = ['Alimentación', 'Sanidad', 'Mantenimiento', 'Transporte', 'Ventas', 'Otros'];

  const calcularPrecioSugerido = () => {
    const costoPromedio = 1450;
    const margenDeseado = targetMargin / 100;
    return Math.round(costoPromedio * (1 + margenDeseado));
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
            <h1 className="text-xl font-semibold text-[#3a210c]">Análisis Financiero</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-6 w-6 text-[#3a210c]" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi, index) => (
            <Card key={index} className="card-shadow">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 font-medium">{kpi.label}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-lg font-bold text-[#3a210c]">{kpi.value}</span>
                    <span className="text-sm text-gray-500">{kpi.unit}</span>
                  </div>
                  <div className={`text-xs font-medium ${
                    kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.change} vs mes anterior
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Precio Sugerido */}
        <Card className="border-l-4 border-l-[#ac815d]">
          <CardHeader>
            <CardTitle className="text-[#3a210c] flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Precio Sugerido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-[#3a210c]">Margen objetivo: {targetMargin}%</Label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={targetMargin}
                  onChange={(e) => setTargetMargin(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>
              <div className="bg-[#f0cbad] p-4 rounded-lg">
                <p className="text-sm text-[#3a210c] mb-1">Precio venta sugerido:</p>
                <p className="text-2xl font-bold text-[#3a210c]">
                  {calcularPrecioSugerido().toLocaleString()} Bs.
                </p>
              </div>
              <Button className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white">
                Guardar Objetivo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico Comparativo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#3a210c] flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Ingresos vs Gastos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-between p-4">
              {/* Gráfico simplificado */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-20 bg-green-500 rounded-t"></div>
                <span className="text-xs text-gray-600">Ingresos</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-14 bg-red-500 rounded-t"></div>
                <span className="text-xs text-gray-600">Gastos</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-6 bg-[#ac815d] rounded-t"></div>
                <span className="text-xs text-gray-600">Margen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transacciones Recientes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3a210c]">Transacciones Recientes</h2>
            <button className="text-sm text-[#ac815d] hover:underline">Ver todas</button>
          </div>
          <div className="space-y-3">
            {transacciones.map(transaccion => (
              <Card key={transaccion.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-[#3a210c]">{transaccion.concepto}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaccion.tipo === 'Ingreso' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaccion.tipo}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{transaccion.categoria}</p>
                      <p className="text-xs text-gray-400">
                        {transaccion.fecha} - Lote: {transaccion.lote}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${
                        transaccion.monto > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaccion.monto > 0 ? '+' : ''}{transaccion.monto.toLocaleString()} Bs.
                      </span>
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
        <Sheet open={showTransactionForm} onOpenChange={setShowTransactionForm}>
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
              <SheetTitle className="text-[#3a210c]">Añadir Transacción</SheetTitle>
            </SheetHeader>
            
            <div className="p-4 space-y-4">
              <div>
                <Label className="text-[#3a210c]">Fecha</Label>
                <Input type="date" className="mt-1" />
              </div>
              
              <div>
                <Label className="text-[#3a210c]">Concepto</Label>
                <Input placeholder="Descripción de la transacción" className="mt-1" />
              </div>

              <div>
                <Label className="text-[#3a210c]">Tipo</Label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                  <option value="Ingreso">Ingreso</option>
                  <option value="Gasto">Gasto</option>
                </select>
              </div>

              <div>
                <Label className="text-[#3a210c]">Categoría</Label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                  {categorias.map(categoria => (
                    <option key={categoria} value={categoria}>{categoria}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-[#3a210c]">Monto (Bs.)</Label>
                <Input type="number" placeholder="0.00" className="mt-1" />
              </div>

              <div>
                <Label className="text-[#3a210c]">Lote/Animal</Label>
                <Input placeholder="Lote o código de animal" className="mt-1" />
              </div>

              <Button className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white">
                Guardar Transacción
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default AnalisisFinancieroModule;
