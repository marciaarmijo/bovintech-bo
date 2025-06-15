import React, { useState } from 'react';
import { Menu, User, Search, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import TrazabilidadModule from './TrazabilidadModule';
import GestionSanitariaModule from './GestionSanitariaModule';
import MonitoreoPesoModule from './MonitoreoPesoModule';
import AnalisisFinancieroModule from './AnalisisFinancieroModule';
import OfflineManager from './OfflineManager';
import OfflineMode from './OfflineMode';

const MainApp = () => {
  const [currentModule, setCurrentModule] = useState<string>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const modules = [
    {
      id: 'trazabilidad',
      title: 'Trazabilidad',
      icon: '/lovable-uploads/27978196-8c14-400d-b6f9-470e2504d535.png'
    },
    {
      id: 'sanidad',
      title: 'Gestión Sanitaria',
      icon: '/lovable-uploads/c63c2cd7-0428-4558-b822-b46447863975.png'
    },
    {
      id: 'peso',
      title: 'Monitoreo de Peso',
      icon: '/lovable-uploads/9adfd864-ba52-4ec8-bafc-c4900c5b98d9.png'
    },
    {
      id: 'finanzas',
      title: 'Análisis Financiero',
      icon: '/lovable-uploads/9d9ec8ea-0bc4-43c2-ad0a-76b0525d6cac.png'
    }
  ];

  const drawerItems = {
    herramientas: [
      { id: 'reportes', title: 'Reportes y analíticas', icon: '/lovable-uploads/b4215cfb-75b3-40f1-a0a9-986cd912f86d.png' },
      { id: 'alertas', title: 'Alertas inteligentes', icon: Bell },
      { id: 'offline', title: 'Modo offline', icon: 'offline' },
      { id: 'iot', title: 'Conectividad IoT', icon: 'bluetooth' }
    ],
    recursos: [
      { id: 'bovintech', title: 'BovinTech', icon: '/lovable-uploads/971a2a52-95fd-42f6-b39c-380f8db46647.png' },
      { id: 'tutoriales', title: 'Tutoriales y nomenclaturas', icon: 'help' }
    ],
    gestion: [
      { id: 'trabajadores', title: 'Trabajadores', icon: 'users' }
    ]
  };

  const recentAlerts = [
    { id: 1, title: 'Vacunación pendiente', subtitle: 'Animal 00993 - Fiebre aftosa', time: '2 horas' },
    { id: 2, title: 'Peso bajo objetivo', subtitle: 'Lote A - Promedio 15kg menos', time: '1 día' },
    { id: 3, title: 'Revisión sanitaria', subtitle: '5 animales programados', time: '3 días' }
  ];

  // Renderizar módulos específicos
  if (currentModule === 'trazabilidad') {
    return <TrazabilidadModule onBack={() => setCurrentModule('home')} />;
  }

  if (currentModule === 'sanidad') {
    return <GestionSanitariaModule onBack={() => setCurrentModule('home')} />;
  }

  if (currentModule === 'peso') {
    return <MonitoreoPesoModule onBack={() => setCurrentModule('home')} />;
  }

  if (currentModule === 'finanzas') {
    return <AnalisisFinancieroModule onBack={() => setCurrentModule('home')} />;
  }

  if (currentModule === 'offline') {
    return <OfflineMode onBack={() => setCurrentModule('home')} />;
  }

  return (
    <OfflineManager>
      <div className="min-h-screen bg-[#ac815d]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#3a210c]">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="h-full bg-white">
                    <div className="p-6 bg-[#3a210c] text-white">
                      <div className="flex items-center space-x-3">
                        <img 
                          src="/lovable-uploads/971a2a52-95fd-42f6-b39c-380f8db46647.png" 
                          alt="BovinTech" 
                          className="w-8 h-8"
                        />
                        <div>
                          <h2 className="font-semibold">Juan Pérez</h2>
                          <p className="text-sm opacity-90">Finca El Progreso</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-3">HERRAMIENTAS</h3>
                        <div className="space-y-1">
                          {drawerItems.herramientas.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                if (item.id === 'offline') {
                                  setCurrentModule('offline');
                                }
                                setIsDrawerOpen(false);
                              }}
                              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg bovin-transition"
                            >
                              {typeof item.icon === 'string' ? (
                                item.icon.startsWith('/') ? (
                                  <img src={item.icon} alt="" className="w-5 h-5" />
                                ) : (
                                  <div className="w-5 h-5 bg-[#ac815d] rounded"></div>
                                )
                              ) : (
                                <item.icon className="w-5 h-5 text-[#3a210c]" />
                              )}
                              <span className="text-[#3a210c]">{item.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-3">RECURSOS</h3>
                        <div className="space-y-1">
                          {drawerItems.recursos.map((item) => (
                            <button
                              key={item.id}
                              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg bovin-transition"
                            >
                              <img src={item.icon} alt="" className="w-5 h-5" />
                              <span className="text-[#3a210c]">{item.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-3">GESTIÓN</h3>
                        <div className="space-y-1">
                          {drawerItems.gestion.map((item) => (
                            <button
                              key={item.id}
                              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg bovin-transition"
                            >
                              <div className="w-5 h-5 bg-[#ac815d] rounded"></div>
                              <span className="text-[#3a210c]">{item.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg bovin-transition">
                        <User className="w-5 h-5 text-[#3a210c]" />
                        <span className="text-[#3a210c]">Perfil y ajustes</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg bovin-transition text-red-600">
                        <div className="w-5 h-5"></div>
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-semibold text-[#3a210c]">Inicio</h1>
            </div>
            <Button variant="ghost" size="icon" className="text-[#3a210c]">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <div className="p-4 space-y-8">
          {/* Main Modules Grid - Now takes full priority */}
          <div className="grid grid-cols-2 gap-6" style={{ minHeight: '70vh' }}>
            {modules.map((module) => (
              <Card 
                key={module.id} 
                className="card-shadow border border-[#ac815d] hover:shadow-lg bovin-transition cursor-pointer bg-white"
                onClick={() => setCurrentModule(module.id)}
              >
                <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                    <img 
                      src={module.icon} 
                      alt={module.title} 
                      className="w-28 h-28 object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-[#3a210c] text-lg">{module.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Alertas Strip - Now positioned lower */}
          <div className="bg-[#f0cbad] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-[#3a210c]">Alertas</h2>
              <button className="text-sm text-[#3a210c] hover:underline">Ver todas</button>
            </div>
            <div className="space-y-2">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#3a210c] text-sm">{alert.title}</h4>
                    <p className="text-xs text-[#3a210c] opacity-80">{alert.subtitle}</p>
                  </div>
                  <span className="text-xs text-[#3a210c] opacity-60">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OfflineManager>
  );
};

export default MainApp;
