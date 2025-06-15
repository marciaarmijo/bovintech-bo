
import React, { useState } from 'react';
import { ArrowLeft, Plus, Calendar, List, Filter, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GestionSanitariaModuleProps {
  onBack: () => void;
}

const GestionSanitariaModule = ({ onBack }: GestionSanitariaModuleProps) => {
  const [currentView, setCurrentView] = useState<'mensual' | 'lista' | 'semanal'>('mensual');
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState('');

  const eventTypes = [
    { id: 'tratamiento', title: 'Tratamiento', icon: '💊' },
    { id: 'vacuna', title: 'Vacuna', icon: '💉' },
    { id: 'alerta', title: 'Alerta', icon: '⚠️' },
    { id: 'fallecimiento', title: 'Fallecimiento', icon: '💀' }
  ];

  const tiposSanitarios = [
    'Fiebre Aftosa', 'Brucelosis', 'Carbunco sintomático', 'Leptospirosis', 
    'Rabia', 'Desparasitación interna', 'Desparasitación externa', 
    'Control garrapatas', 'Antibiótico', 'Mastitis', 'Otros'
  ];

  const eventos = [
    {
      id: 1,
      fecha: '2024-06-10',
      tipo: 'Vacuna',
      subtipo: 'Fiebre Aftosa',
      animal: '00993',
      estado: 'Completado',
      responsable: 'Juan Pérez'
    },
    {
      id: 2,
      fecha: '2024-06-15',
      tipo: 'Tratamiento',
      subtipo: 'Desparasitación interna',
      animal: '00994',
      estado: 'Pendiente',
      responsable: 'María García'
    }
  ];

  const renderCalendarView = () => {
    const days = Array.from({ length: 35 }, (_, i) => i + 1);
    
    return (
      <div className="p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-[#3a210c] py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => (
            <button
              key={day}
              className="aspect-square flex items-center justify-center text-sm text-[#3a210c] hover:bg-[#f0cbad] rounded-lg relative"
            >
              {day}
              {(day === 10 || day === 15) && (
                <div className="absolute bottom-1 w-2 h-2 bg-[#ac815d] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => (
    <div className="p-4 space-y-3">
      {eventos.map(evento => (
        <Card key={evento.id} className="border-l-4 border-l-[#ac815d]">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{evento.tipo === 'Vacuna' ? '💉' : '💊'}</span>
                  <h4 className="font-medium text-[#3a210c]">{evento.tipo}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    evento.estado === 'Completado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {evento.estado}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{evento.subtipo}</p>
                <p className="text-sm text-gray-500">Animal: {evento.animal}</p>
                <p className="text-xs text-gray-400">{evento.fecha} - {evento.responsable}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderEventForm = () => (
    <div className="p-4 space-y-4">
      <div>
        <Label className="text-[#3a210c]">Fecha</Label>
        <Input type="date" className="mt-1" />
      </div>
      
      <div>
        <Label className="text-[#3a210c]">Tipo</Label>
        <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
          {tiposSanitarios.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      <div>
        <Label className="text-[#3a210c]">Animal</Label>
        <Input placeholder="Código del animal" className="mt-1" />
      </div>

      <div>
        <Label className="text-[#3a210c]">Responsable</Label>
        <Input placeholder="Nombre del responsable" className="mt-1" />
      </div>

      <div>
        <Label className="text-[#3a210c]">Notas</Label>
        <textarea 
          className="w-full mt-1 p-2 border border-gray-300 rounded-md h-20"
          placeholder="Observaciones adicionales..."
        />
      </div>

      <Button className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white">
        Guardar Evento
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
            </Button>
            <h1 className="text-xl font-semibold text-[#3a210c]">Gestión Sanitaria</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-6 w-6 text-[#3a210c]" />
          </Button>
        </div>
      </header>

      {/* View Toggle */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex space-x-1">
          {[
            { id: 'mensual', label: 'Mensual', icon: Calendar },
            { id: 'lista', label: 'Lista', icon: List },
            { id: 'semanal', label: 'Semanal', icon: Calendar }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={currentView === id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView(id as typeof currentView)}
              className={currentView === id ? 'bg-[#ac815d] text-white' : 'text-[#3a210c]'}
            >
              <Icon className="h-4 w-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      {currentView === 'mensual' && renderCalendarView()}
      {currentView === 'lista' && renderListView()}
      {currentView === 'semanal' && renderListView()}

      {/* FAB */}
      <div className="fixed bottom-6 right-6">
        <Sheet open={showEventForm} onOpenChange={setShowEventForm}>
          <SheetTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full bg-[#ac815d] hover:bg-[#3a210c] text-white fab-shadow"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle className="text-[#3a210c]">
                {selectedEventType ? `Registrar ${selectedEventType}` : 'Seleccionar Evento'}
              </SheetTitle>
            </SheetHeader>
            
            {!selectedEventType ? (
              <div className="grid grid-cols-2 gap-4 p-4">
                {eventTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedEventType(type.title)}
                    className="p-6 bg-white border border-[#ac815d] rounded-lg hover:bg-[#f0cbad] bovin-transition"
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-[#3a210c] font-medium">{type.title}</div>
                  </button>
                ))}
              </div>
            ) : (
              renderEventForm()
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default GestionSanitariaModule;
