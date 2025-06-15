import React, { useState } from 'react';
import { ArrowLeft, Plus, Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface GestionSanitariaModuleProps {
  onBack: () => void;
}

const GestionSanitariaModule = ({ onBack }: GestionSanitariaModuleProps) => {
  const [currentView, setCurrentView] = useState<'lista' | 'mensual' | 'semanal'>('lista');
  const [showTreatmentForm, setShowTreatmentForm] = useState(false);

  const treatments = [
    {
      id: 1,
      animal: '00993',
      tipo: 'Vacunación',
      tratamiento: 'Fiebre Aftosa',
      fecha: '2024-06-15',
      estado: 'pendiente',
      veterinario: 'Dr. García',
      dosis: '5ml',
      observaciones: 'Primera dosis del año'
    },
    {
      id: 2,
      animal: '00994',
      tipo: 'Tratamiento',
      tratamiento: 'Antibiótico',
      fecha: '2024-06-14',
      estado: 'completado',
      veterinario: 'Dr. López',
      dosis: '10ml',
      observaciones: 'Infección respiratoria'
    },
    {
      id: 3,
      animal: '00995',
      tipo: 'Desparasitación',
      tratamiento: 'Ivermectina',
      fecha: '2024-06-13',
      estado: 'completado',
      veterinario: 'Dr. García',
      dosis: '8ml',
      observaciones: 'Tratamiento preventivo'
    },
    {
      id: 4,
      animal: '00996',
      tipo: 'Vacunación',
      tratamiento: 'Brucelosis',
      fecha: '2024-06-16',
      estado: 'programado',
      veterinario: 'Dr. López',
      dosis: '2ml',
      observaciones: 'Vacunación anual'
    }
  ];

  const monthlyCalendar = [
    { date: '2024-06-16', events: ['Vacunación Brucelosis - 00996', 'Revisión general - Lote A'] },
    { date: '2024-06-17', events: ['Desparasitación - 00997'] },
    { date: '2024-06-18', events: ['Control veterinario - 5 animales'] },
    { date: '2024-06-20', events: ['Vacunación Fiebre Aftosa - Lote B'] },
    { date: '2024-06-22', events: ['Revisión heridas - 00993'] }
  ];

  const weeklySchedule = [
    { day: 'Lunes 17', tasks: ['09:00 - Vacunación Lote A (Dr. García)', '14:00 - Revisión 00993'] },
    { day: 'Martes 18', tasks: ['08:00 - Desparasitación general', '16:00 - Control peso sanitario'] },
    { day: 'Miércoles 19', tasks: ['10:00 - Tratamiento 00995 (Dr. López)'] },
    { day: 'Jueves 20', tasks: ['09:00 - Vacunación Brucelosis', '15:00 - Revisión heridas'] },
    { day: 'Viernes 21', tasks: ['08:00 - Control veterinario semanal'] }
  ];

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'completado':
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
      case 'pendiente':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      case 'programado':
        return <Badge className="bg-blue-100 text-blue-800">Programado</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{estado}</Badge>;
    }
  };

  const renderListView = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="card-shadow bg-white">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-[#3a210c]">8</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </CardContent>
        </Card>
        <Card className="card-shadow bg-white">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-[#3a210c]">15</div>
            <div className="text-sm text-gray-600">Completados</div>
          </CardContent>
        </Card>
      </div>

      {/* Treatments List */}
      <div>
        <h2 className="text-lg font-semibold text-[#3a210c] mb-4">Tratamientos</h2>
        <div className="space-y-3">
          {treatments.map(treatment => (
            <Card key={treatment.id} className="border border-[#ac815d] bg-white">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-[#3a210c]">Animal {treatment.animal}</h3>
                    {getStatusBadge(treatment.estado)}
                  </div>
                  <span className="text-sm text-gray-500">{treatment.fecha}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#3a210c]">{treatment.tipo}</span>
                    <span className="text-sm text-gray-600">{treatment.tratamiento}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Veterinario: {treatment.veterinario}</span>
                    <span className="text-sm text-gray-600">Dosis: {treatment.dosis}</span>
                  </div>
                  {treatment.observaciones && (
                    <p className="text-xs text-gray-500 italic">{treatment.observaciones}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMonthlyView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 border border-[#ac815d]">
        <h3 className="font-semibold text-[#3a210c] mb-4">Junio 2024</h3>
        <div className="space-y-3">
          {monthlyCalendar.map((day, index) => (
            <div key={index} className="border-l-4 border-l-[#ac815d] pl-4">
              <div className="font-medium text-[#3a210c] mb-1">
                {new Date(day.date).toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="space-y-1">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-3 w-3 mr-2 text-[#ac815d]" />
                    {event}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-white border border-[#ac815d]">
        <CardHeader>
          <CardTitle className="text-[#3a210c]">Resumen del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3a210c]">23</div>
              <div className="text-sm text-gray-600">Tratamientos programados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-gray-600">Completados</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWeeklyView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 border border-[#ac815d]">
        <h3 className="font-semibold text-[#3a210c] mb-4">Semana del 17-21 Junio</h3>
        <div className="space-y-4">
          {weeklySchedule.map((day, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0 pb-3 last:pb-0">
              <div className="font-medium text-[#3a210c] mb-2">{day.day}</div>
              <div className="space-y-1">
                {day.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-[#ac815d] rounded-full mr-3"></div>
                    {task}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-white border border-[#ac815d]">
        <CardHeader>
          <CardTitle className="text-[#3a210c]">Próximas 48 horas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
              <span className="text-sm font-medium text-[#3a210c]">Hoy - Vacunación Lote A</span>
              <Badge className="bg-yellow-100 text-yellow-800">Urgente</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <span className="text-sm font-medium text-[#3a210c]">Mañana - Control veterinario</span>
              <Badge className="bg-blue-100 text-blue-800">Programado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#3a210c]">Gestión Sanitaria</h1>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-8">
          <button
            onClick={() => setCurrentView('lista')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              currentView === 'lista'
                ? 'border-[#ac815d] text-[#ac815d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setCurrentView('mensual')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              currentView === 'mensual'
                ? 'border-[#ac815d] text-[#ac815d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setCurrentView('semanal')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              currentView === 'semanal'
                ? 'border-[#ac815d] text-[#ac815d]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Semanal
          </button>
        </div>
      </div>

      <div className="p-4">
        {currentView === 'lista' && renderListView()}
        {currentView === 'mensual' && renderMonthlyView()}
        {currentView === 'semanal' && renderWeeklyView()}
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6">
        <Sheet open={showTreatmentForm} onOpenChange={setShowTreatmentForm}>
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
              <SheetTitle className="text-[#3a210c]">Nuevo Tratamiento</SheetTitle>
            </SheetHeader>
            
            <div className="p-4 space-y-4">
              <div>
                <Label className="text-[#3a210c]">ID Animal</Label>
                <Input placeholder="Escanear o escribir ID" className="mt-1" />
              </div>
              
              <div>
                <Label className="text-[#3a210c]">Tipo de tratamiento</Label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                  <option>Vacunación</option>
                  <option>Desparasitación</option>
                  <option>Antibiótico</option>
                  <option>Vitaminas</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <Label className="text-[#3a210c]">Medicamento/Vacuna</Label>
                <Input placeholder="Nombre del medicamento" className="mt-1" />
              </div>

              <div>
                <Label className="text-[#3a210c]">Dosis</Label>
                <Input placeholder="Cantidad y unidad (ej: 5ml)" className="mt-1" />
              </div>

              <div>
                <Label className="text-[#3a210c]">Fecha</Label>
                <Input type="date" className="mt-1" />
              </div>

              <div>
                <Label className="text-[#3a210c]">Veterinario</Label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                  <option>Dr. García</option>
                  <option>Dr. López</option>
                  <option>Dr. Martínez</option>
                </select>
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
                Guardar Tratamiento
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default GestionSanitariaModule;
