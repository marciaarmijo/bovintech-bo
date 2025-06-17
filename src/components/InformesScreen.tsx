
import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, BarChart3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Dynamic data generation based on filters
  const generateReportData = () => {
    const baseData = {
      trazabilidad: [
        { id: '001', descripcion: 'Animal Angus', valor: 'Corral A-1', fecha: '2024-01-15' },
        { id: '002', descripcion: 'Animal Holstein', valor: 'Corral B-2', fecha: '2024-01-14' },
        { id: '003', descripcion: 'Animal Brahman', valor: 'Corral A-3', fecha: '2024-01-13' },
      ],
      sanidad: [
        { id: '001', descripcion: 'Vacuna Fiebre Aftosa', valor: 'Completado', fecha: '2024-01-15' },
        { id: '002', descripcion: 'Desparasitación', valor: 'Pendiente', fecha: '2024-01-14' },
        { id: '003', descripcion: 'Vitaminas A/D', valor: 'Completado', fecha: '2024-01-13' },
      ],
      peso: [
        { id: '001', descripcion: 'Animal Angus 450kg', valor: '450 kg', fecha: '2024-01-15' },
        { id: '002', descripcion: 'Animal Holstein 475kg', valor: '475 kg', fecha: '2024-01-14' },
        { id: '003', descripcion: 'Animal Brahman 430kg', valor: '430 kg', fecha: '2024-01-13' },
      ],
      finanzas: [
        { id: '001', descripcion: 'Venta Animal 001', valor: '+$8,500', fecha: '2024-01-15' },
        { id: '002', descripcion: 'Compra Alimento', valor: '-$1,200', fecha: '2024-01-14' },
        { id: '003', descripcion: 'Gastos Veterinarios', valor: '-$350', fecha: '2024-01-13' },
      ]
    };

    let filteredData = baseData[selectedModule as keyof typeof baseData] || [];
    
    // Apply date filters
    if (startDate) {
      filteredData = filteredData.filter(item => item.fecha >= startDate);
    }
    if (endDate) {
      filteredData = filteredData.filter(item => item.fecha <= endDate);
    }
    
    // Apply lote filter (simplified)
    if (loteId) {
      filteredData = filteredData.filter(item => 
        item.id.includes(loteId) || item.descripcion.toLowerCase().includes(loteId.toLowerCase())
      );
    }

    return filteredData;
  };

  const recentReports = [
    { 
      id: 1, 
      type: 'Trazabilidad', 
      date: '2024-01-15', 
      title: 'Informe de movimientos',
      module: 'trazabilidad',
      params: { param1: 'Movimientos', param2: 'Por lote', param3: 'Detallado' }
    },
    { 
      id: 2, 
      type: 'Sanidad', 
      date: '2024-01-14', 
      title: 'Estado sanitario general',
      module: 'sanidad',
      params: { param1: 'Estado general', param2: 'Completados', param3: 'Por veterinario' }
    },
    { 
      id: 3, 
      type: 'Peso', 
      date: '2024-01-13', 
      title: 'Análisis de peso promedio',
      module: 'peso', 
      params: { param1: 'Peso promedio', param2: 'Por lote', param3: 'Mensual' }
    },
    { 
      id: 4, 
      type: 'Finanzas', 
      date: '2024-01-12', 
      title: 'Rentabilidad mensual',
      module: 'finanzas',
      params: { param1: 'Rentabilidad', param2: 'Por período', param3: 'Detallado' }
    },
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

  const generateReportPreview = (module: string, params: any) => {
    // Generate dynamic SVG charts based on module and parameters
    if (module === 'peso') {
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" className="w-full h-full">
          <rect width="120" height="80" fill="#f8f9fa"/>
          <path d="M10,70 Q30,50 50,40 T90,30 L110,25" stroke="#ac815d" strokeWidth="2" fill="none"/>
          <circle cx="30" cy="50" r="2" fill="#3a210c"/>
          <circle cx="50" cy="40" r="2" fill="#3a210c"/>
          <circle cx="70" cy="35" r="2" fill="#3a210c"/>
          <circle cx="90" cy="30" r="2" fill="#3a210c"/>
          <text x="10" y="15" fontSize="8" fill="#3a210c">Peso (kg)</text>
          <text x="95" y="75" fontSize="6" fill="#666">Tiempo</text>
        </svg>
      );
    } else if (module === 'sanidad') {
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" className="w-full h-full">
          <rect width="120" height="80" fill="#f8f9fa"/>
          <rect x="20" y="20" width="15" height="40" fill="#22c55e"/>
          <rect x="40" y="35" width="15" height="25" fill="#ef4444"/>
          <rect x="60" y="25" width="15" height="35" fill="#3b82f6"/>
          <rect x="80" y="30" width="15" height="30" fill="#f59e0b"/>
          <text x="10" y="15" fontSize="8" fill="#3a210c">Estado</text>
          <text x="22" y="75" fontSize="6" fill="#666">✓</text>
          <text x="42" y="75" fontSize="6" fill="#666">✗</text>
          <text x="62" y="75" fontSize="6" fill="#666">◐</text>
          <text x="82" y="75" fontSize="6" fill="#666">⚠</text>
        </svg>
      );
    } else if (module === 'finanzas') {
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" className="w-full h-full">
          <rect width="120" height="80" fill="#f8f9fa"/>
          <rect x="20" y="20" width="20" height="40" fill="#22c55e"/>
          <rect x="45" y="35" width="20" height="25" fill="#ef4444"/>
          <rect x="70" y="15" width="20" height="45" fill="#ac815d"/>
          <text x="10" y="15" fontSize="8" fill="#3a210c">Bs.</text>
          <text x="15" y="75" fontSize="6" fill="#666">Ingreso</text>
          <text x="45" y="75" fontSize="6" fill="#666">Gasto</text>
          <text x="72" y="75" fontSize="6" fill="#666">Neto</text>
        </svg>
      );
    } else {
      return (
        <svg width="120" height="80" viewBox="0 0 120 80" className="w-full h-full">
          <rect width="120" height="80" fill="#f8f9fa"/>
          <rect x="10" y="10" width="100" height="8" fill="#e5e7eb"/>
          <rect x="10" y="25" width="80" height="8" fill="#e5e7eb"/>
          <rect x="10" y="40" width="90" height="8" fill="#e5e7eb"/>
          <rect x="10" y="55" width="70" height="8" fill="#e5e7eb"/>
          <circle cx="95" cy="14" r="3" fill="#ac815d"/>
          <circle cx="85" cy="29" r="3" fill="#3a210c"/>
          <circle cx="90" cy="44" r="3" fill="#ac815d"/>
          <circle cx="75" cy="59" r="3" fill="#3a210c"/>
          <text x="10" y="75" fontSize="8" fill="#3a210c">Trazabilidad</text>
        </svg>
      );
    }
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

    setReportGenerated(true);
    toast({
      title: "Informe generado con éxito",
      description: "El informe se ha creado correctamente con datos actualizados",
    });
  };

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Descargando PDF",
      description: "El archivo PDF se está descargando...",
    });
  };

  const handleDownloadExcel = () => {
    toast({
      title: "Descargando Excel",
      description: "El archivo Excel se está descargando...",
    });
  };

  const currentReportData = reportGenerated ? generateReportData() : [];

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
                      <div className="w-16 h-12 border border-gray-200 rounded overflow-hidden bg-white">
                        {generateReportPreview(report.module, report.params)}
                      </div>
                      <div>
                        <h3 className="font-medium text-[#3a210c]">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-[#ac815d] text-[#ac815d]"
                      onClick={() => handleViewReport(report)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
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

        {/* Resultados con preview dinámico y botones de descarga */}
        {reportGenerated && selectedModule && parameter1 && (
          <Card className="border border-[#ac815d]">
            <CardHeader>
              <CardTitle className="text-[#3a210c]">Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Preview ampliado dinámico */}
                <div className="flex items-start space-x-4">
                  <div className="w-48 h-32 border border-gray-200 rounded overflow-hidden bg-white">
                    {generateReportPreview(selectedModule, { parameter1, parameter2, parameter3 })}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#3a210c] mb-2">
                      Informe de {selectedModule} - {parameter1}
                      {parameter2 && ` (${parameter2})`}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Generado con {currentReportData.length} registros
                      {startDate && endDate && ` del ${startDate} al ${endDate}`}
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#ac815d] text-[#ac815d]"
                        onClick={handleDownloadPDF}
                      >
                        📥 Descargar PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[#ac815d] text-[#ac815d]"
                        onClick={handleDownloadExcel}
                      >
                        📊 Descargar Excel
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tabla de datos reales basada en filtros */}
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
                      {currentReportData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                          <td className="p-2">{item.id}</td>
                          <td className="p-2">{item.descripcion}</td>
                          <td className="p-2">{item.valor}</td>
                          <td className="p-2">{item.fecha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal para ver informe completo con datos reales */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#3a210c]">
              {selectedReport?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="w-full h-96 border border-gray-200 rounded overflow-hidden bg-white flex items-center justify-center">
              {selectedReport && (
                <div className="w-full h-full scale-150 flex items-center justify-center">
                  {generateReportPreview(selectedReport.module, selectedReport.params)}
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                className="border-[#ac815d] text-[#ac815d]"
                onClick={handleDownloadPDF}
              >
                📥 Descargar PDF
              </Button>
              <Button 
                variant="outline" 
                className="border-[#ac815d] text-[#ac815d]"
                onClick={handleDownloadExcel}
              >
                📊 Descargar Excel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InformesScreen;
