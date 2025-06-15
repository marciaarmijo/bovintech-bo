
import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, Play, FileText, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TutorialesScreenProps {
  onBack: () => void;
}

const TutorialesScreen = ({ onBack }: TutorialesScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tutorials = {
    video: [
      {
        id: 1,
        title: 'Introducción a BovinTech',
        description: 'Aprende los conceptos básicos de la plataforma',
        duration: '5:30',
        category: 'Básico'
      },
      {
        id: 2,
        title: 'Registro de animales',
        description: 'Cómo registrar y gestionar tu ganado',
        duration: '8:15',
        category: 'Trazabilidad'
      },
      {
        id: 3,
        title: 'Monitoreo de peso',
        description: 'Configura y utiliza las básculas conectadas',
        duration: '6:45',
        category: 'Peso'
      },
      {
        id: 4,
        title: 'Gestión sanitaria',
        description: 'Programa y controla vacunas y tratamientos',
        duration: '12:20',
        category: 'Sanidad'
      }
    ],
    pdf: [
      {
        id: 1,
        title: 'Manual completo BovinTech',
        description: 'Guía completa de todas las funciones',
        pages: 45,
        category: 'General'
      },
      {
        id: 2,
        title: 'Protocolo de vacunación',
        description: 'Calendario y procedimientos recomendados',
        pages: 12,
        category: 'Sanidad'
      },
      {
        id: 3,
        title: 'Análisis financiero ganadero',
        description: 'Cómo interpretar los reportes económicos',
        pages: 18,
        category: 'Finanzas'
      },
      {
        id: 4,
        title: 'Conectividad IoT',
        description: 'Configuración de dispositivos Bluetooth',
        pages: 8,
        category: 'Técnico'
      }
    ],
    glosario: [
      {
        id: 1,
        title: 'Glosario de términos ganaderos',
        description: 'Definiciones de términos técnicos utilizados',
        entries: 150,
        category: 'General'
      },
      {
        id: 2,
        title: 'Códigos de identificación',
        description: 'Sistema de numeración y etiquetado',
        entries: 25,
        category: 'Trazabilidad'
      },
      {
        id: 3,
        title: 'Medicamentos veterinarios',
        description: 'Base de datos de medicamentos y dosis',
        entries: 80,
        category: 'Sanidad'
      },
      {
        id: 4,
        title: 'Razas bovinas',
        description: 'Características de las principales razas',
        entries: 35,
        category: 'General'
      }
    ]
  };

  const filterContent = (content: any[]) => {
    if (!searchQuery) return content;
    return content.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-5 w-5 text-[#ac815d]" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-[#ac815d]" />;
      case 'glosario':
        return <BookOpen className="h-5 w-5 text-[#ac815d]" />;
      default:
        return <FileText className="h-5 w-5 text-[#ac815d]" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#3a210c]">Tutoriales y nomenclaturas</h1>
        </div>
      </header>

      <div className="p-4">
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por palabra clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="glosario">Glosario</TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="space-y-3">
            {filterContent(tutorials.video).map((video) => (
              <Card key={video.id} className="border border-gray-200 hover:border-[#ac815d] transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getIcon('video')}
                      <div className="flex-1">
                        <h3 className="font-medium text-[#3a210c]">{video.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-[#ac815d] bg-[#f0cbad] px-2 py-1 rounded">
                            {video.category}
                          </span>
                          <span className="text-xs text-gray-500">{video.duration}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pdf" className="space-y-3">
            {filterContent(tutorials.pdf).map((pdf) => (
              <Card key={pdf.id} className="border border-gray-200 hover:border-[#ac815d] transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getIcon('pdf')}
                      <div className="flex-1">
                        <h3 className="font-medium text-[#3a210c]">{pdf.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{pdf.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-[#ac815d] bg-[#f0cbad] px-2 py-1 rounded">
                            {pdf.category}
                          </span>
                          <span className="text-xs text-gray-500">{pdf.pages} páginas</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="glosario" className="space-y-3">
            {filterContent(tutorials.glosario).map((glosario) => (
              <Card key={glosario.id} className="border border-gray-200 hover:border-[#ac815d] transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getIcon('glosario')}
                      <div className="flex-1">
                        <h3 className="font-medium text-[#3a210c]">{glosario.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{glosario.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-[#ac815d] bg-[#f0cbad] px-2 py-1 rounded">
                            {glosario.category}
                          </span>
                          <span className="text-xs text-gray-500">{glosario.entries} entradas</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TutorialesScreen;
