import React, { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Calendar, Scale, Heart, DollarSign, Truck, Edit, Check, X, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface AnimalData {
  id: string;
  lote: string;
  ubicacion: string;
  ultimoMovimiento: string;
  peso: string;
  departamento?: string;
  proveedor?: string;
  fechaIngreso?: string;
  pesoInicial?: number;
  sexo?: 'Macho' | 'Hembra';
  raza?: string;
  fechaNacimiento?: string;
  pesoActual?: number;
  ultimaVacuna?: string;
  proximaVacuna?: string;
  estadoSalud?: string;
  veterinario?: string;
  costoCompra?: number;
  valorActual?: number;
  gastosMedicos?: number;
  alimentacion?: number;
}

interface Props {
  animal: AnimalData;
  onBack: () => void;
}

// Array of cow placeholder images from Unsplash
const cowImages = [
  'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=400&fit=crop&crop=face'
];

// Function to get consistent image for each animal based on ID
const getCowImageForAnimal = (animalId: string): string => {
  const hash = animalId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return cowImages[hash % cowImages.length];
};

const AnimalProfileScreen: React.FC<Props> = ({ animal, onBack }) => {
  const [activeTab, setActiveTab] = useState('registro');
  const [editing, setEditing] = useState(false);
  const [editedAnimal, setEditedAnimal] = useState(animal);
  const { toast } = useToast();

  if (!animal) return null;

  // Mock additional data for demonstration
  const extendedAnimal = {
    ...animal,
    raza: 'Brahman',
    fechaNacimiento: '2023-01-15',
    pesoActual: parseInt(animal.peso) || 450,
    ultimaVacuna: '2024-05-20',
    proximaVacuna: '2024-08-20',
    estadoSalud: 'Saludable',
    veterinario: 'Dr. Carlos Mendoza',
    costoCompra: 2800,
    valorActual: 3200,
    gastosMedicos: 150,
    alimentacion: 320
  };

  const cowImageUrl = getCowImageForAnimal(animal.id);

  const departamentos = ['La Paz', 'Cochabamba', 'Santa Cruz', 'Tarija', 'Oruro', 'Potosí', 'Beni', 'Pando', 'Chuquisaca'];
  const razas = ['Brahman', 'Nelore', 'Angus', 'Hereford', 'Charolais', 'Limousin'];

  const handleEdit = () => {
    setEditing(true);
    setEditedAnimal(extendedAnimal);
  };

  const handleSave = () => {
    setEditing(false);
    toast({
      title: "Animal actualizado",
      description: "Los datos del animal se han guardado correctamente",
    });
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedAnimal(animal);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditedAnimal(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const movimientos = [
    { fecha: '2024-06-15', origen: 'Potrero Sur', destino: 'Potrero Norte', motivo: 'Rotación de pastoreo' },
    { fecha: '2024-06-10', origen: 'Corral Central', destino: 'Potrero Sur', motivo: 'Finalización tratamiento' },
    { fecha: '2024-06-05', origen: 'Potrero Este', destino: 'Corral Central', motivo: 'Revisión veterinaria' }
  ];

  const registrosPeso = [
    { fecha: '2024-06-15', peso: 450, ganancia: '+5kg' },
    { fecha: '2024-06-08', peso: 445, ganancia: '+3kg' },
    { fecha: '2024-06-01', peso: 442, ganancia: '+7kg' },
    { fecha: '2024-05-25', peso: 435, ganancia: '+4kg' }
  ];

  const vacunas = [
    { fecha: '2024-05-20', tipo: 'Aftosa', veterinario: 'Dr. Carlos Mendoza', proxima: '2024-08-20' },
    { fecha: '2024-04-15', tipo: 'Carbón', veterinario: 'Dr. Ana López', proxima: '2024-10-15' },
    { fecha: '2024-03-10', tipo: 'Brucelosis', veterinario: 'Dr. Carlos Mendoza', proxima: '2024-09-10' }
  ];

  return (
    <div className="min-h-screen bg-[#faf4ef]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
            </Button>
            <h1 className="text-xl font-semibold text-[#3a210c]">Animal {animal.id}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-[#ac815d]">
              <Camera className="h-6 w-6" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#3a210c]">
                  <MoreVertical className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Animal Info Card */}
      <div className="p-4">
        <Card className="bg-white border border-[#ac815d] mb-4">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#ac815d] overflow-hidden bg-gray-100">
                <img 
                  src={cowImageUrl}
                  alt={`Vaca ${animal.id}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-[#f0cbad] border-2 border-[#ac815d] rounded-full hidden items-center justify-center text-[#ac815d] font-bold text-xl">
                  {animal.id.slice(-2)}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#3a210c]">ID {animal.id}</h2>
                <p className="text-[#ac815d] font-medium">{editing ? editedAnimal.lote : animal.lote}</p>
                <p className="text-sm text-gray-600">{editing ? editedAnimal.raza : extendedAnimal.raza} • {animal.sexo}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#3a210c]">{editing ? `${editedAnimal.pesoActual} kg` : animal.peso}</p>
                <p className="text-sm text-gray-600">{editing ? editedAnimal.ubicacion : animal.ubicacion}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="registro" className="text-xs">Registro</TabsTrigger>
            <TabsTrigger value="sanitaria" className="text-xs">Sanitaria</TabsTrigger>
            <TabsTrigger value="peso" className="text-xs">Peso</TabsTrigger>
            <TabsTrigger value="financiera" className="text-xs">Financiera</TabsTrigger>
          </TabsList>

          {/* Registro Tab */}
          <TabsContent value="registro" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c] flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Información General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {editing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#3a210c]">Departamento</Label>
                      <Select 
                        value={editedAnimal.departamento || ''} 
                        onValueChange={(value) => handleInputChange('departamento', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {departamentos.map(dep => (
                            <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[#3a210c]">Proveedor</Label>
                      <Input 
                        value={editedAnimal.proveedor || ''}
                        onChange={(e) => handleInputChange('proveedor', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-[#3a210c]">Fecha Ingreso</Label>
                      <Input 
                        type="date"
                        value={editedAnimal.fechaIngreso || ''}
                        onChange={(e) => handleInputChange('fechaIngreso', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-[#3a210c]">Fecha Nacimiento</Label>
                      <Input 
                        type="date"
                        value={editedAnimal.fechaNacimiento || ''}
                        onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-[#3a210c]">Peso Inicial (kg)</Label>
                      <Input 
                        type="number"
                        value={editedAnimal.pesoInicial || ''}
                        onChange={(e) => handleInputChange('pesoInicial', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label className="text-[#3a210c]">Raza</Label>
                      <Select 
                        value={editedAnimal.raza || ''} 
                        onValueChange={(value) => handleInputChange('raza', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {razas.map(raza => (
                            <SelectItem key={raza} value={raza}>{raza}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Departamento</label>
                      <p className="text-[#3a210c]">{animal.departamento}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Proveedor</label>
                      <p className="text-[#3a210c]">{animal.proveedor}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Fecha Ingreso</label>
                      <p className="text-[#3a210c]">{animal.fechaIngreso}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Fecha Nacimiento</label>
                      <p className="text-[#3a210c]">{extendedAnimal.fechaNacimiento}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Peso Inicial</label>
                      <p className="text-[#3a210c]">{animal.pesoInicial} kg</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Raza</label>
                      <p className="text-[#3a210c]">{extendedAnimal.raza}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Datos de Compra Card */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c] flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Datos de Compra
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {editing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#3a210c]">Costo Compra (Bs.)</Label>
                      <Input 
                        type="number"
                        value={editedAnimal.costoCompra || ''}
                        onChange={(e) => handleInputChange('costoCompra', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label className="text-[#3a210c]">Valor Actual (Bs.)</Label>
                      <Input 
                        type="number"
                        value={editedAnimal.valorActual || ''}
                        onChange={(e) => handleInputChange('valorActual', Number(e.target.value))}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Costo de Compra</label>
                      <p className="text-[#3a210c]">Bs. {extendedAnimal.costoCompra}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Valor Actual</label>
                      <p className="text-[#3a210c]">Bs. {extendedAnimal.valorActual}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c] flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Historial de Movimientos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {movimientos.map((mov, index) => (
                    <div key={index} className="border-l-2 border-[#ac815d] pl-3 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-[#3a210c]">{mov.origen} → {mov.destino}</p>
                          <p className="text-sm text-gray-600">{mov.motivo}</p>
                        </div>
                        <span className="text-xs text-gray-500">{mov.fecha}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sanitaria Tab */}
          <TabsContent value="sanitaria" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c] flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Estado de Salud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estado Actual</label>
                    <p className="text-green-600 font-medium">{extendedAnimal.estadoSalud}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Veterinario</label>
                    <p className="text-[#3a210c]">{extendedAnimal.veterinario}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Última Vacuna</label>
                    <p className="text-[#3a210c]">{extendedAnimal.ultimaVacuna}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Próxima Vacuna</label>
                    <p className="text-[#ac815d]">{extendedAnimal.proximaVacuna}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c]">Historial de Vacunas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vacunas.map((vacuna, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-[#3a210c]">{vacuna.tipo}</h4>
                        <span className="text-xs text-gray-500">{vacuna.fecha}</span>
                      </div>
                      <p className="text-sm text-gray-600">Veterinario: {vacuna.veterinario}</p>
                      <p className="text-sm text-[#ac815d]">Próxima dosis: {vacuna.proxima}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Peso Tab */}
          <TabsContent value="peso" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c] flex items-center">
                  <Scale className="h-5 w-5 mr-2" />
                  Monitoreo de Peso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Peso Actual</p>
                    <p className="text-xl font-bold text-[#3a210c]">{extendedAnimal.pesoActual} kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Peso Inicial</p>
                    <p className="text-lg font-medium text-gray-600">{animal.pesoInicial} kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Ganancia Total</p>
                    <p className="text-lg font-bold text-green-600">+{extendedAnimal.pesoActual - (animal.pesoInicial || 0)} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c]">Historial de Peso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {registrosPeso.map((registro, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-[#3a210c]">{registro.peso} kg</p>
                        <p className="text-sm text-gray-600">{registro.fecha}</p>
                      </div>
                      <span className={`font-medium ${
                        registro.ganancia.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {registro.ganancia}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financiera Tab */}
          <TabsContent value="financiera" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c] flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Resumen Financiero
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Costo de Compra</label>
                    <p className="text-xl font-bold text-[#3a210c]">Bs. {extendedAnimal.costoCompra}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Valor Actual</label>
                    <p className="text-xl font-bold text-green-600">Bs. {extendedAnimal.valorActual}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Gastos Médicos</label>
                    <p className="text-lg font-medium text-red-600">Bs. {extendedAnimal.gastosMedicos}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Alimentación</label>
                    <p className="text-lg font-medium text-[#ac815d]">Bs. {extendedAnimal.alimentacion}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600">Ganancia Estimada:</span>
                    <span className="text-xl font-bold text-green-600">
                      Bs. {extendedAnimal.valorActual - extendedAnimal.costoCompra - extendedAnimal.gastosMedicos - extendedAnimal.alimentacion}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#3a210c]">Desglose de Costos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-[#3a210c]">Compra inicial</span>
                    <span className="font-medium text-[#3a210c]">Bs. {extendedAnimal.costoCompra}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-[#3a210c]">Gastos veterinarios</span>
                    <span className="font-medium text-red-600">-Bs. {extendedAnimal.gastosMedicos}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-[#3a210c]">Alimentación</span>
                    <span className="font-medium text-[#ac815d]">-Bs. {extendedAnimal.alimentacion}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Buttons */}
      {editing ? (
        <div className="fixed bottom-6 left-4 right-4 z-40 flex space-x-3">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-[#d9534f] text-[#d9534f] bg-white"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#ac815d] hover:bg-[#3a210c] text-white"
          >
            <Check className="w-4 h-4 mr-2" />
            Guardar cambios
          </Button>
        </div>
      ) : (
        <Button
          size="lg"
          className="fixed bottom-7 right-7 z-40 rounded-full bg-[#ac815d] hover:bg-[#3a210c] text-white shadow-lg w-16 h-16 flex items-center justify-center"
          onClick={handleEdit}
        >
          <Edit className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default AnimalProfileScreen;
