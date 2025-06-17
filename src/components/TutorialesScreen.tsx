
import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, Play, FileText, BookOpen, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TutorialesScreenProps {
  onBack: () => void;
}

const TutorialesScreen = ({ onBack }: TutorialesScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [showContentModal, setShowContentModal] = useState(false);

  const tutorials = {
    video: [
      {
        id: 1,
        title: 'Introducción a BovinTech',
        description: 'Aprende los conceptos básicos de la plataforma',
        duration: '5:30',
        category: 'Básico',
        thumbnail: '/lovable-uploads/9d9ec8ea-0bc4-43c2-ad0a-76b0525d6cac.png'
      },
      {
        id: 2,
        title: 'Registro de animales',
        description: 'Cómo registrar y gestionar tu ganado',
        duration: '8:15',
        category: 'Trazabilidad',
        thumbnail: '/lovable-uploads/b4215cfb-75b3-40f1-a0a9-986cd912f86d.png'
      },
      {
        id: 3,
        title: 'Monitoreo de peso',
        description: 'Configura y utiliza las básculas conectadas',
        duration: '6:45',
        category: 'Peso',
        thumbnail: '/lovable-uploads/c50da2fa-905f-4dc2-9c68-bb2c03f795fb.png'
      },
      {
        id: 4,
        title: 'Gestión sanitaria',
        description: 'Programa y controla vacunas y tratamientos',
        duration: '12:20',
        category: 'Sanidad',
        thumbnail: '/lovable-uploads/f8178e85-cd3b-45d0-a23b-4dddda732411.png'
      }
    ],
    pdf: [
      {
        id: 1,
        title: 'Manual completo BovinTech',
        description: 'Guía completa de todas las funciones',
        pages: 45,
        category: 'General',
        preview: '/lovable-uploads/9adfd864-ba52-4ec8-bafc-c4900c5b98d9.png'
      },
      {
        id: 2,
        title: 'Protocolo de vacunación',
        description: 'Calendario y procedimientos recomendados',
        pages: 12,
        category: 'Sanidad',
        preview: '/lovable-uploads/e6148b8f-bed7-49ff-88ee-f4dc9c5437ae.png'
      },
      {
        id: 3,
        title: 'Análisis financiero ganadero',
        description: 'Cómo interpretar los reportes económicos',
        pages: 18,
        category: 'Finanzas',
        preview: '/lovable-uploads/ecb70fe3-2f1a-475b-9191-ddaa4b955297.png'
      },
      {
        id: 4,
        title: 'Conectividad IoT',
        description: 'Configuración de dispositivos Bluetooth',
        pages: 8,
        category: 'Técnico',
        preview: '/lovable-uploads/a02b8dad-ecf9-44f7-872b-c33a14109717.png'
      }
    ],
    glosario: [
      {
        id: 1,
        title: 'Trazabilidad',
        description: 'Sistema que permite seguir el rastro de un animal desde su nacimiento hasta...',
        entries: 150,
        category: 'General',
        fullDefinition: 'Sistema que permite seguir el rastro de un animal desde su nacimiento hasta su destino final, registrando todos los movimientos, tratamientos y eventos importantes durante su vida.'
      },
      {
        id: 2,
        title: 'Identificación individual',
        description: 'Código único asignado a cada animal para su identificación...',
        entries: 25,
        category: 'Trazabilidad',
        fullDefinition: 'Código único asignado a cada animal para su identificación inequívoca dentro del sistema de trazabilidad. Puede incluir aretes, chips o tatuajes.'
      },
      {
        id: 3,
        title: 'Vacuna antiaftosa',
        description: 'Inmunización contra la fiebre aftosa, enfermedad viral altamente...',
        entries: 80,
        category: 'Sanidad',
        fullDefinition: 'Inmunización contra la fiebre aftosa, enfermedad viral altamente contagiosa que afecta a animales de pezuña hendida. Aplicación obligatoria según calendario sanitario.'
      },
      {
        id: 4,
        title: 'Angus',
        description: 'Raza bovina originaria de Escocia, conocida por su excelente...',
        entries: 35,
        category: 'General',
        fullDefinition: 'Raza bovina originaria de Escocia, conocida por su excelente calidad de carne, facilidad de parto y adaptabilidad. Pelaje negro o colorado, sin cuernos.'
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

  const handleContentClick = (content: any, type: string) => {
    setSelectedContent({ ...content, type });
    setShowContentModal(true);
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
              <Card 
                key={video.id} 
                className="border border-gray-200 hover:border-[#ac815d] transition-colors cursor-pointer"
                onClick={() => handleContentClick(video, 'video')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-16 h-12 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt="Thumbnail" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white drop-shadow-lg" />
                        </div>
                      </div>
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
              <Card 
                key={pdf.id} 
                className="border border-gray-200 hover:border-[#ac815d] transition-colors cursor-pointer"
                onClick={() => handleContentClick(pdf, 'pdf')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="h-6 w-6 text-[#ac815d]" />
                      </div>
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
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="glosario" className="space-y-3">
            {filterContent(tutorials.glosario).map((glosario) => (
              <Card 
                key={glosario.id} 
                className="border border-gray-200 hover:border-[#ac815d] transition-colors cursor-pointer"
                onClick={() => handleContentClick(glosario, 'glosario')}
              >
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
                          <button className="text-xs text-[#ac815d] hover:underline">
                            Ver más
                          </button>
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

      {/* Modal para contenido */}
      <Dialog open={showContentModal} onOpenChange={setShowContentModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#3a210c]">
              {selectedContent?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedContent?.type === 'video' && (
              <div className="w-full h-96 bg-gray-100 rounded flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-[#ac815d] mx-auto mb-2" />
                  <p className="text-gray-600">Reproductor de video</p>
                  <p className="text-sm text-gray-500">{selectedContent?.duration}</p>
                </div>
              </div>
            )}
            
            {selectedContent?.type === 'pdf' && (
              <div className="w-full h-96 border border-gray-200 rounded overflow-hidden">
                <img 
                  src={selectedContent?.preview} 
                  alt="Vista previa PDF" 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            
            {selectedContent?.type === 'glosario' && (
              <div className="space-y-4">
                <div className="p-4 bg-[#f0cbad] rounded-lg">
                  <h3 className="font-semibold text-[#3a210c] mb-2">{selectedContent?.title}</h3>
                  <p className="text-[#3a210c]">{selectedContent?.fullDefinition}</p>
                </div>
              </div>
            )}
            
            {selectedContent?.type === 'pdf' && (
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="border-[#ac815d] text-[#ac815d]"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar PDF
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TutorialesScreen;
