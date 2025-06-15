
import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface InformesScreenProps {
  onBack: () => void;
}

const InformesScreen = ({ onBack }: InformesScreenProps) => {
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState('');
  const [parameter1, setParameter1] = useState('');
  const [parameter2, setParameter2] = useState('');
  const [parameter3, setParameter3] = useState('');
  const [loteId, setLoteId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const recentReports = [
    { id: 1, type: 'Trazabilidad', date: '2024-01-15', title: 'Informe de movimientos' },
    { id: 2, type: 'Sanidad', date: '2024-01-14', title: 'Estado sanitario general' },
    { id: 3, type: 'Peso', date: '2024-01-13', title: 'Análisis de peso promedio' },
    { id: 4, type: 'Finanzas', date: '2024-01-12', title: 'Rentabilidad mensual' },
    { id: 5, type: 'Trazabilidad', date: '2024-01-11', title: 'Historial de lote A' }
  ];

  const moduleOptions = [
    { value: 'trazabilidad', label: 'Trazabilidad' },
    { value: 'sanidad', label: 'Sanidad' },
    { value: 'peso', label: 'Peso' },
    { value: 'finanzas', label: 'Finanzas' }
  ];

  const getParameterOptions = (module: string, paramNumber: number) => {
    const options = {
      trazabilidad: {
        1: ['Movimientos', 'Ubicaciones', 'Historial'],
        2: ['Por lote', 'Por animal', 'Por fecha'],
        3: ['Detallado', 'Resumido']
      },
      sanidad: {
        1: ['Vacunaciones', 'Tratamientos', 'Estado general'],
        2: ['Pendientes', 'Completados', 'Vencidos'],
        3: ['Por veterinario', 'Por tipo']
      },
      peso: {
        1: ['Peso promedio', 'Ganancia diaria', 'Comparativa'],
        2: ['Por lote', 'Por rango de edad', 'Por género'],
        3: ['Semanal', 'Mensual', 'Trimestral']
      },
      finanzas: {
        1: ['Rentabilidad', 'Costos', 'Ingresos'],
        2: ['Por categoría', 'Por período', 'Por lote'],
        3: ['Detallado', 'Resumido', 'Con proyecciones']
      }
    };
    return options[module as keyof typeof options]?.[paramNumber as keyof typeof options.trazabilidad] || [];
  };

  const handleGenerateReport = () => {
    if (!selectedModule || !parameter1) {
      toast({
        title: "Error",
        description: "Por favor selecciona el módulo y al menos un parámetro",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Informe generado con éxito",
      description: "El informe se ha creado correctamente",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#3a210c]">Informes</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Historial de informes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#3a210c]">Historial</h2>
            <button className="text-sm text-[#ac815d] hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <Card key={report.id} className="border border-[#ac815d]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-[#ac815d]" />
                      <div>
                        <h3 className="font-medium text-[#3a210c]">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#ac815d] text-[#ac815d]">
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Crear informe */}
        <Card className="border border-[#ac815d]">
          <CardHeader>
            <CardTitle className="text-[#3a210c]">Crear informe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="module">Módulo</Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un módulo" />
                </SelectTrigger>
                <SelectContent>
                  {moduleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedModule && (
              <div>
                <Label htmlFor="parameter1">Parámetro 1</Label>
                <Select value={parameter1} onValueChange={setParameter1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona parámetro 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {getParameterOptions(selectedModule, 1).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {parameter1 && (
              <div>
                <Label htmlFor="parameter2">Parámetro 2</Label>
                <Select value={parameter2} onValueChange={setParameter2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona parámetro 2 (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {getParameterOptions(selectedModule, 2).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {parameter2 && (
              <div>
                <Label htmlFor="parameter3">Parámetro 3</Label>
                <Select value={parameter3} onValueChange={setParameter3}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona parámetro 3 (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {getParameterOptions(selectedModule, 3).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Fecha inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Fecha fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="loteId">Lote/ID Animal</Label>
              <Input
                id="loteId"
                placeholder="Buscar lote o ID..."
                value={loteId}
                onChange={(e) => setLoteId(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleGenerateReport}
              className="w-full bg-[#ac815d] hover:bg-[#8d6b47] text-white"
            >
              Generar informe
            </Button>
          </CardContent>
        </Card>

        {/* Resultados (simulado) */}
        {selectedModule && parameter1 && (
          <Card className="border border-[#ac815d]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#3a210c]">Resultados</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-[#ac815d] text-[#ac815d]">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#ac815d] text-[#ac815d]">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-4">
                <p className="text-gray-500">Gráfico del informe</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">Descripción</th>
                      <th className="text-left p-2">Valor</th>
                      <th className="text-left p-2">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 cursor-pointer">
                      <td className="p-2">001</td>
                      <td className="p-2">Animal ejemplo</td>
                      <td className="p-2">450 kg</td>
                      <td className="p-2">2024-01-15</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 cursor-pointer">
                      <td className="p-2">002</td>
                      <td className="p-2">Animal ejemplo 2</td>
                      <td className="p-2">475 kg</td>
                      <td className="p-2">2024-01-14</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InformesScreen;
