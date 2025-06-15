
import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Animal {
  id: string;
  codigo: string;
  sexo: 'M' | 'H';
  lote: string;
  pesoCompra: number;
  fechaIngreso: string;
  procedencia: string;
  avatar: string;
}

interface TrazabilidadModuleProps {
  onBack: () => void;
}

const TrazabilidadModule: React.FC<TrazabilidadModuleProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'import' | 'detail'>('list');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [newAnimal, setNewAnimal] = useState({
    codigo: '',
    sexo: 'M',
    lote: '',
    fechaIngreso: '',
    pesoCompra: '',
    fechaCompra: '',
    precioCompra: '',
    procedenciaDept: '',
    procedenciaProveedor: '',
    observaciones: '',
    pesoNacer: '',
    pesoDestete: '',
    peso12m: ''
  });

  // Mock data
  const animals: Animal[] = [
    {
      id: '1',
      codigo: '00993',
      sexo: 'M',
      lote: 'A',
      pesoCompra: 450,
      fechaIngreso: '2024-01-15',
      procedencia: 'Santa Cruz',
      avatar: '00'
    },
    {
      id: '2',
      codigo: '00994',
      sexo: 'H',
      lote: 'B',
      pesoCompra: 380,
      fechaIngreso: '2024-01-20',
      procedencia: 'Cochabamba',
      avatar: '00'
    },
    {
      id: '3',
      codigo: '00995',
      sexo: 'M',
      lote: 'A',
      pesoCompra: 420,
      fechaIngreso: '2024-02-01',
      procedencia: 'La Paz',
      avatar: '00'
    }
  ];

  const departamentos = [
    'La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 
    'Chuquisaca', 'Tarija', 'Beni', 'Pando'
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewAnimal(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAnimal = () => {
    // Here would be the logic to save the animal
    console.log('Creating animal:', newAnimal);
    setCurrentView('list');
    // Reset form
    setNewAnimal({
      codigo: '',
      sexo: 'M',
      lote: '',
      fechaIngreso: '',
      pesoCompra: '',
      fechaCompra: '',
      precioCompra: '',
      procedenciaDept: '',
      procedenciaProveedor: '',
      observaciones: '',
      pesoNacer: '',
      pesoDestete: '',
      peso12m: ''
    });
  };

  const handleAnimalClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setCurrentView('detail');
  };

  const filteredAnimals = animals.filter(animal =>
    animal.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animal List View
  if (currentView === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-[#3a210c]">
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold text-[#3a210c]">Trazabilidad</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(true)}
                className="text-[#3a210c]"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#ac815d] focus:ring-[#ac815d]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mb-6">
            <Button
              onClick={() => setCurrentView('create')}
              className="flex-1 bg-[#3a210c] hover:bg-[#2a1808] bovin-transition"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear animal
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentView('import')}
              className="border-[#ac815d] text-[#3a210c] hover:bg-[#f0cbad]"
            >
              <Upload className="h-4 w-4 mr-2" />
              Importar
            </Button>
          </div>

          {/* Animals List */}
          <div className="space-y-3">
            {filteredAnimals.map((animal) => (
              <Card 
                key={animal.id} 
                className="card-shadow border-0 hover:shadow-lg bovin-transition cursor-pointer"
                onClick={() => handleAnimalClick(animal)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#ac815d] rounded-full flex items-center justify-center text-white font-semibold">
                      {animal.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-[#3a210c]">{animal.codigo}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          animal.sexo === 'M' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-pink-100 text-pink-800'
                        }`}>
                          {animal.sexo === 'M' ? 'Macho' : 'Hembra'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Lote {animal.lote} • {animal.pesoCompra}kg</p>
                      <p className="text-xs text-gray-500">{animal.procedencia}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAB */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setCurrentView('create')}
            className="w-14 h-14 rounded-full bg-[#3a210c] hover:bg-[#2a1808] fab-shadow bovin-transition"
          >
            <Plus className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    );
  }

  // Create Animal View
  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('list')} className="text-[#3a210c]">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold text-[#3a210c]">Crear Animal</h1>
          </div>
        </header>

        <div className="p-4 pb-20">
          <div className="space-y-6">
            {/* Photo Section */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button variant="outline" className="border-[#ac815d] text-[#3a210c]">
                    <Camera className="h-4 w-4 mr-2" />
                    Tomar foto
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#3a210c]">Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Sexo</Label>
                  <RadioGroup 
                    value={newAnimal.sexo} 
                    onValueChange={(value) => handleInputChange('sexo', value)}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="M" id="macho" />
                      <Label htmlFor="macho">Macho</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="H" id="hembra" />
                      <Label htmlFor="hembra">Hembra</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="codigo">Código ID *</Label>
                    <Input
                      id="codigo"
                      value={newAnimal.codigo}
                      onChange={(e) => handleInputChange('codigo', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                      placeholder="00996"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lote">Lote</Label>
                    <Input
                      id="lote"
                      value={newAnimal.lote}
                      onChange={(e) => handleInputChange('lote', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                      placeholder="A"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fechaIngreso">Fecha de ingreso</Label>
                    <Input
                      id="fechaIngreso"
                      type="date"
                      value={newAnimal.fechaIngreso}
                      onChange={(e) => handleInputChange('fechaIngreso', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesoCompra">Peso al compra (kg)</Label>
                    <Input
                      id="pesoCompra"
                      type="number"
                      value={newAnimal.pesoCompra}
                      onChange={(e) => handleInputChange('pesoCompra', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                      placeholder="450"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#3a210c]">Información de Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fechaCompra">Fecha de compra</Label>
                    <Input
                      id="fechaCompra"
                      type="date"
                      value={newAnimal.fechaCompra}
                      onChange={(e) => handleInputChange('fechaCompra', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="precioCompra">Precio compra (Bs.)</Label>
                    <Input
                      id="precioCompra"
                      type="number"
                      value={newAnimal.precioCompra}
                      onChange={(e) => handleInputChange('precioCompra', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                      placeholder="3500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Departamento de procedencia</Label>
                  <Select onValueChange={(value) => handleInputChange('procedenciaDept', value)}>
                    <SelectTrigger className="border-[#ac815d]">
                      <SelectValue placeholder="Selecciona departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proveedor">Proveedor</Label>
                  <Input
                    id="proveedor"
                    value={newAnimal.procedenciaProveedor}
                    onChange={(e) => handleInputChange('procedenciaProveedor', e.target.value)}
                    className="border-[#ac815d] focus:ring-[#ac815d]"
                    placeholder="Nombre del proveedor"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Historical Weights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#3a210c]">Pesos Históricos (Opcional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pesoNacer">Al nacer (kg)</Label>
                    <Input
                      id="pesoNacer"
                      type="number"
                      value={newAnimal.pesoNacer}
                      onChange={(e) => handleInputChange('pesoNacer', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                      placeholder="35"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pesoDestete">Destete (kg)</Label>
                    <Input
                      id="pesoDestete"
                      type="number"
                      value={newAnimal.pesoDestete}
                      onChange={(e) => handleInputChange('pesoDestete', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                      placeholder="200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="peso12m">12 meses (kg)</Label>
                    <Input
                      id="peso12m"
                      type="number"
                      value={newAnimal.peso12m}
                      onChange={(e) => handleInputChange('peso12m', e.target.value)}
                      className="border-[#ac815d] focus:ring-[#ac815d]"
                      placeholder="350"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Observations */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <textarea
                    id="observaciones"
                    value={newAnimal.observaciones}
                    onChange={(e) => handleInputChange('observaciones', e.target.value)}
                    className="w-full p-3 border border-[#ac815d] rounded-md focus:ring-[#ac815d] focus:border-[#ac815d] resize-none"
                    rows={3}
                    placeholder="Notas adicionales sobre el animal..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sticky Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <Button
            onClick={handleCreateAnimal}
            className="w-full bg-[#3a210c] hover:bg-[#2a1808] bovin-transition"
          >
            Crear animal
          </Button>
        </div>
      </div>
    );
  }

  // Animal Detail View
  if (currentView === 'detail' && selectedAnimal) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentView('list')} className="text-[#3a210c]">
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold text-[#3a210c]">{selectedAnimal.codigo}</h1>
            </div>
            <Button variant="ghost" size="icon" className="text-[#3a210c]">
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full my-1"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </Button>
          </div>
        </header>

        <div className="p-4">
          {/* Animal Header */}
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-[#ac815d] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                {selectedAnimal.avatar}
              </div>
              <h2 className="text-2xl font-bold text-[#3a210c] mb-2">{selectedAnimal.codigo}</h2>
              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <span>Lote {selectedAnimal.lote}</span>
                <span>•</span>
                <span>{selectedAnimal.sexo === 'M' ? 'Macho' : 'Hembra'}</span>
                <span>•</span>
                <span>{selectedAnimal.pesoCompra}kg</span>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="sanidad">Sanidad</TabsTrigger>
              <TabsTrigger value="peso">Peso</TabsTrigger>
              <TabsTrigger value="finanzas">Finanzas</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#3a210c]">Datos Básicos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Código:</span>
                      <p className="font-medium text-[#3a210c]">{selectedAnimal.codigo}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Sexo:</span>
                      <p className="font-medium text-[#3a210c]">{selectedAnimal.sexo === 'M' ? 'Macho' : 'Hembra'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Lote:</span>
                      <p className="font-medium text-[#3a210c]">{selectedAnimal.lote}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Fecha ingreso:</span>
                      <p className="font-medium text-[#3a210c]">{selectedAnimal.fechaIngreso}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#3a210c]">Información de Compra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Peso compra:</span>
                      <p className="font-medium text-[#3a210c]">{selectedAnimal.pesoCompra} kg</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Procedencia:</span>
                      <p className="font-medium text-[#3a210c]">{selectedAnimal.procedencia}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sanidad">
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  <p>Datos de sanidad aparecerán aquí</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="peso">
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  <p>Gráfica de peso aparecerá aquí</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finanzas">
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  <p>Datos financieros aparecerán aquí</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Import View
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setCurrentView('list')} className="text-[#3a210c]">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-[#3a210c]">Importar Excel</h1>
        </div>
      </header>

      <div className="p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <Upload className="h-12 w-12 text-[#ac815d] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#3a210c] mb-2">Arrastra tu archivo aquí</h3>
            <p className="text-gray-600 mb-4">o selecciona un archivo .xlsx o .csv</p>
            <Button className="bg-[#3a210c] hover:bg-[#2a1808]">
              Seleccionar archivo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrazabilidadModule;
