
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Plus, DollarSign, TrendingUp, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalisisFinancieroModuleProps {
  onBack: () => void;
}

const AnalisisFinancieroModule = ({ onBack }: AnalisisFinancieroModuleProps) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [targetMargin, setTargetMargin] = useState(25);

  // Filter states
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    lote: '',
    tipo: '',
    categoria: ''
  });

  const allTransactions = [
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
    },
    {
      id: 4,
      fecha: '2024-06-10',
      concepto: 'Venta Animal 00875',
      tipo: 'Ingreso',
      categoria: 'Ventas',
      monto: 7800,
      lote: 'A-2024'
    },
    {
      id: 5,
      fecha: '2024-06-08',
      concepto: 'Mantenimiento corral',
      tipo: 'Gasto',
      categoria: 'Mantenimiento',
      monto: -450,
      lote: 'General'
    }
  ];

  const categorias = ['Alimentación', 'Sanidad', 'Mantenimiento', 'Transporte', 'Ventas', 'Otros'];
  const lotes = ['A-2024', 'B-2024', 'C-2024', 'General'];

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      if (filters.startDate && transaction.fecha < filters.startDate) return false;
      if (filters.endDate && transaction.fecha > filters.endDate) return false;
      if (filters.lote && filters.lote !== 'all' && transaction.lote !== filters.lote) return false;
      if (filters.tipo && filters.tipo !== 'all' && transaction.tipo !== filters.tipo) return false;
      if (filters.categoria && filters.categoria !== 'all' && transaction.categoria !== filters.categoria) return false;
      return true;
    });
  }, [filters]);

  // Calculate KPIs based on filtered data
  const filteredKpis = useMemo(() => {
    const ingresos = filteredTransactions
      .filter(t => t.tipo === 'Ingreso')
      .reduce((sum, t) => sum + t.monto, 0);
    
    const gastos = Math.abs(filteredTransactions
      .filter(t => t.tipo === 'Gasto')
      .reduce((sum, t) => sum + t.monto, 0));
    
    const margen = ingresos - gastos;
    const roi = gastos > 0 ? ((margen / gastos) * 100) : 0;

    return [
      { label: 'Ingresos totales', value: ingresos.toLocaleString(), unit: 'Bs.', change: '+12%' },
      { label: 'Costos totales', value: gastos.toLocaleString(), unit: 'Bs.', change: '+8%' },
      { label: 'Margen bruto', value: margen.toLocaleString(), unit: 'Bs.', change: '+18%' },
      { label: 'ROI', value: roi.toFixed(1), unit: '%', change: '+3.2%' },
      { label: 'Coste promedio/cabeza', value: '1,450', unit: 'Bs.', change: '-5%' },
      { label: 'Margen promedio/cabeza', value: '425', unit: 'Bs.', change: '+15%' }
    ];
  }, [filteredTransactions]);

  const calcularPrecioSugerido = () => {
    const costoPromedio = 1450;
    const margenDeseado = targetMargin / 100;
    return Math.round(costoPromedio * (1 + margenDeseado));
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      lote: '',
      tipo: '',
      categoria: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
            </Button>
            <h1 className="text-xl font-semibold text-[#3a210c]">Análisis Financiero</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-6 w-6 text-[#3a210c]" />
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Filters Panel */}
        {showFilters && (
          <Card className="bg-white border border-[#ac815d]">
            <CardHeader>
              <CardTitle className="text-[#3a210c] text-sm">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#3a210c]">Fecha inicio</Label>
                  <Input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-[#3a210c]">Fecha fin</Label>
                  <Input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-[#3a210c]">Lote</Label>
                  <Select value={filters.lote} onValueChange={(value) => setFilters({...filters, lote: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {lotes.map(lote => (
                        <SelectItem key={lote} value={lote}>{lote}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-[#3a210c]">Tipo</Label>
                  <Select value={filters.tipo} onValueChange={(value) => setFilters({...filters, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Ingreso">Ingreso</SelectItem>
                      <SelectItem value="Gasto">Gasto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-[#3a210c]">Categoría</Label>
                  <Select value={filters.categoria} onValueChange={(value) => setFilters({...filters, categoria: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {categorias.map(categoria => (
                        <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                className="border-[#ac815d] text-[#ac815d]"
              >
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          {filteredKpis.map((kpi, index) => (
            <Card key={index} className="card-shadow bg-white">
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
        <Card className="border-l-4 border-l-[#ac815d] bg-white">
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
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-[#3a210c] flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Ingresos vs Gastos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-between p-4">
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

        {/* Transacciones Filtradas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3a210c]">
              Transacciones {filteredTransactions.length !== allTransactions.length && `(${filteredTransactions.length})`}
            </h2>
            <button className="text-sm text-[#ac815d] hover:underline">Ver todas</button>
          </div>
          <div className="space-y-3">
            {filteredTransactions.map(transaccion => (
              <Card key={transaccion.id} className="bg-white">
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
