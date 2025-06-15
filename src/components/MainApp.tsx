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
import InformesScreen from './InformesScreen';
import AlertasScreen from './AlertasScreen';
import ConectividadIoTScreen from './ConectividadIoTScreen';
import TrabajadoresScreen from './TrabajadoresScreen';
import TutorialesScreen from './TutorialesScreen';

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
      { id: 'alertas', title: 'Alertas inteligentes', icon: '/lovable-uploads/57f3d62b-f346-4e5c-bc8b-9d5b5f90bf5b.png' },
      { id: 'offline', title: 'Modo offline', icon: '/lovable-uploads/91b5dade-9c5b-48df-940b-e3b85b83ac5c.png' },
      { id: 'iot', title: 'Conectividad IoT', icon: '/lovable-uploads/4b1b1e10-2d4a-4e3e-a3e6-4b7f4b5b2b3a.png' }
    ],
    recursos: [
      { id: 'bovintech', title: 'BovinTech', icon: '/lovable-uploads/8e35e0b9-cfcf-484e-b7f5-b0e1b5b5b5b5.png' },
      { id: 'tutoriales', title: 'Tutoriales y nomenclaturas', icon: '/lovable-uploads/6f1c8c8c-8c8c-8c8c-8c8c-8c8c8c8c8c8c.png' }
    ],
    gestion: [
      { id: 'trabajadores', title: 'Trabajadores', icon: '/lovable-uploads/2c5c5c5c-5c5c-5c5c-5c5c-5c5c5c5c5c5c.png' }
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

  if (currentModule === 'reportes') {
    return <InformesScreen onBack={() => setCurrentModule('home')} />;
  }

  if (currentModule === 'alertas') {
    return <AlertasScreen onBack={() => setCurrentModule('home')} />;
  }

  if (currentModule === 'iot') {
    return <ConectividadIoTScreen onBack={() => setCurrentModule('home')} />;
  }

  if (currentModule === 'trabajadores') {
    return <TrabajadoresScreen onBack={() => setCurrentModule('home')} />;
  }

  if (currentModule === 'tutoriales') {
    return <TutorialesScreen onBack={() => setCurrentModule('home')} />;
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
                                setCurrentModule(item.id);
                                setIsDrawerOpen(false);
                              }}
                              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg bovin-transition"
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f7e9db] border border-[#e2cbb2]">
                                <img
                                  src={item.icon}
                                  alt=""
                                  className="w-5 h-5 object-contain"
                                  style={{ display: "block" }}
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.border = '1px solid red'; }}
                                />
                              </span>
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
                              onClick={() => {
                                if (item.id === 'tutoriales') {
                                  setCurrentModule('tutoriales');
                                }
                                setIsDrawerOpen(false);
                              }}
                              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg bovin-transition"
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f7e9db] border border-[#e2cbb2]">
                                <img
                                  src={item.icon}
                                  alt=""
                                  className="w-5 h-5 object-contain"
                                  style={{ display: "block" }}
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.border = '1px solid red'; }}
                                />
                              </span>
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
                              onClick={() => {
                                setCurrentModule('trabajadores');
                                setIsDrawerOpen(false);
                              }}
                              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-lg bovin-transition"
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f7e9db] border border-[#e2cbb2]">
                                <img
                                  src={item.icon}
                                  alt=""
                                  className="w-5 h-5 object-contain"
                                  style={{ display: "block" }}
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.border = '1px solid red'; }}
                                />
                              </span>
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
          {/* Main Modules Grid */}
          <div className="grid grid-cols-2 gap-6" style={{ minHeight: '70vh' }}>
            {modules.map((module) => (
              <Card 
                key={module.id} 
                className="card-shadow border border-[#ac815d] hover:shadow-lg bovin-transition cursor-pointer bg-white"
                onClick={() => setCurrentModule(module.id)}
              >
                <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={module.icon} 
                      alt={module.title} 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-[#3a210c] text-lg">{module.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Alertas Strip */}
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
