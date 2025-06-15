
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
  const [currentView, setCurrentView] = useState<'lista' | 'mensual' | 'semanal'>('lista');
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
      responsable: 'Juan Pérez',
      prioridad: 'Alta'
    },
    {
      id: 2,
      fecha: '2024-06-15',
      tipo: 'Tratamiento',
      subtipo: 'Desparasitación interna',
      animal: '00994',
      estado: 'Pendiente',
      responsable: 'María García',
      prioridad: 'Media'
    },
    {
      id: 3,
      fecha: '2024-06-18',
      tipo: 'Vacuna',
      subtipo: 'Brucelosis',
      animal: '00995',
      estado: 'Programado',
      responsable: 'Carlos López',
      prioridad: 'Alta'
    },
    {
      id: 4,
      fecha: '2024-06-20',
      tipo: 'Control',
      subtipo: 'Control garrapatas',
      animal: '00996',
      estado: 'Pendiente',
      responsable: 'Ana Martínez',
      prioridad: 'Baja'
    }
  ];

  const renderCalendarView = () => {
    const currentMonth = 'Junio 2024';
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const eventosDelMes = eventos.filter(e => e.fecha.includes('2024-06'));
    
    return (
      <div className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-[#3a210c] mb-2">{currentMonth}</h3>
          <div className="flex justify-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Completado</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Pendiente</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Programado</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-[#3a210c] py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => {
            const hasEvent = eventos.some(e => new Date(e.fecha).getDate() === day);
            const evento = eventos.find(e => new Date(e.fecha).getDate() === day);
            
            return (
              <button
                key={day}
                className="aspect-square flex flex-col items-center justify-center text-sm text-[#3a210c] hover:bg-[#f0cbad] rounded-lg relative p-1"
              >
                <span className="font-medium">{day}</span>
                {hasEvent && evento && (
                  <div className={`w-2 h-2 rounded-full mt-1 ${
                    evento.estado === 'Completado' ? 'bg-green-500' :
                    evento.estado === 'Pendiente' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-[#3a210c] mb-3">Próximos eventos</h4>
          <div className="space-y-2">
            {eventosDelMes.slice(0, 3).map(evento => (
              <div key={evento.id} className="bg-white p-3 rounded-lg border border-[#ac815d]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{evento.tipo === 'Vacuna' ? '💉' : '💊'}</span>
                    <div>
                      <p className="text-sm font-medium text-[#3a210c]">{evento.subtipo}</p>
                      <p className="text-xs text-gray-500">Animal {evento.animal} - {evento.fecha}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    evento.estado === 'Completado' 
                      ? 'bg-green-100 text-green-800' 
                      : evento.estado === 'Pendiente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {evento.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#3a210c]">Todos los eventos</h3>
        <div className="flex space-x-2">
          <span className="text-sm text-gray-600">{eventos.length} eventos</span>
        </div>
      </div>
      
      {eventos.map(evento => (
        <Card key={evento.id} className="border-l-4 border-l-[#ac815d]">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{evento.tipo === 'Vacuna' ? '💉' : evento.tipo === 'Tratamiento' ? '💊' : '🔍'}</span>
                  <h4 className="font-medium text-[#3a210c]">{evento.tipo}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    evento.estado === 'Completado' 
                      ? 'bg-green-100 text-green-800' 
                      : evento.estado === 'Pendiente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {evento.estado}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    evento.prioridad === 'Alta' 
                      ? 'bg-red-100 text-red-800' 
                      : evento.prioridad === 'Media'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {evento.prioridad}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1 font-medium">{evento.subtipo}</p>
                <p className="text-sm text-gray-500">Animal: {evento.animal}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">{evento.fecha}</p>
                  <p className="text-xs text-gray-500">{evento.responsable}</p>
                </div>
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

  const renderWeeklyView = () => {
    const semanaActual = 'Semana del 10-16 Junio 2024';
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const eventosSemanales = eventos.filter(e => {
      const fecha = new Date(e.fecha);
      return fecha.getDate() >= 10 && fecha.getDate() <= 16;
    });
    
    return (
      <div className="p-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-[#3a210c] mb-2">{semanaActual}</h3>
          <div className="flex justify-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-[#ac815d] rounded-full"></div>
              <span className="text-xs text-gray-600">Eventos programados</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {diasSemana.map((dia, index) => {
            const fechaDia = 10 + index;
            const eventosDelDia = eventosSemanales.filter(e => new Date(e.fecha).getDate() === fechaDia);
            
            return (
              <div key={dia} className="bg-white rounded-lg border border-[#ac815d] p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-[#3a210c]">{dia} {fechaDia}</h4>
                  <span className="text-xs text-gray-500">{eventosDelDia.length} eventos</span>
                </div>
                
                {eventosDelDia.length > 0 ? (
                  <div className="space-y-2">
                    {eventosDelDia.map(evento => (
                      <div key={evento.id} className="flex items-center space-x-3 p-2 bg-[#f0cbad] rounded-lg">
                        <span className="text-lg">{evento.tipo === 'Vacuna' ? '💉' : '💊'}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#3a210c]">{evento.subtipo}</p>
                          <p className="text-xs text-gray-600">Animal {evento.animal} - {evento.responsable}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          evento.estado === 'Completado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {evento.estado}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No hay eventos programados</p>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 bg-[#f0cbad] p-4 rounded-lg">
          <h4 className="font-medium text-[#3a210c] mb-2">Resumen semanal</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-[#3a210c]">{eventosSemanales.filter(e => e.estado === 'Completado').length}</p>
              <p className="text-xs text-gray-600">Completados</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#3a210c]">{eventosSemanales.filter(e => e.estado === 'Pendiente').length}</p>
              <p className="text-xs text-gray-600">Pendientes</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#3a210c]">{eventosSemanales.filter(e => e.estado === 'Programado').length}</p>
              <p className="text-xs text-gray-600">Programados</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        <Label className="text-[#3a210c]">Prioridad</Label>
        <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
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
            { id: 'lista', label: 'Lista', icon: List },
            { id: 'mensual', label: 'Mensual', icon: Calendar },
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
      {currentView === 'lista' && renderListView()}
      {currentView === 'mensual' && renderCalendarView()}
      {currentView === 'semanal' && renderWeeklyView()}

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
