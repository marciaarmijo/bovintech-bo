import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MapPin, Calendar, Truck, Import } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AnimalEditSheet from './AnimalEditSheet';
import AnimalImportSheet from './AnimalImportSheet';
import AnimalFilters from './trazabilidad/AnimalFilters';
import AnimalCard from './trazabilidad/AnimalCard';
import AnimalProfileSheet from './trazabilidad/AnimalProfileSheet';
import CrearAnimalSheet from './trazabilidad/CrearAnimalSheet';

interface Animal {
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
}
interface Movimiento {
  id: number;
  animal: string;
  origen: string;
  destino: string;
  fecha: string;
  motivo: string;
  tipo?: string;
  detalles?: string;
}

interface TrazabilidadModuleProps {
  onBack: () => void;
}

const ubicaciones = ["Potrero Norte", "Potrero Sur", "Potrero Este", "Corral Central"];
const motivos = [
  "Rotación de pastoreo",
  "Tratamiento médico",
  "Revisión veterinaria",
  "Separación por edad",
  "Otro"
];

const TrazabilidadModule = ({ onBack }: TrazabilidadModuleProps) => {
  const [tab, setTab] = useState<'registro' | 'movimientos'>('registro');
  const [showMovementForm, setShowMovementForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnimalEdit, setShowAnimalEdit] = useState(false);
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [showCrear, setShowCrear] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const [filters, setFilters] = useState({
    departamento: '',
    proveedor: '',
    pesoMin: 0,
    pesoMax: 600,
    fechaIngresoIni: '',
    fechaIngresoFin: ''
  });

  const [animals, setAnimals] = useState<Animal[]>([
    { id: '00993', lote: 'A-2024', ubicacion: 'Potrero Norte', ultimoMovimiento: '2024-06-15', peso: '450 kg', departamento: 'La Paz', proveedor: 'Proveedor Uno', fechaIngreso: '2024-06-12', pesoInicial: 400, sexo: 'Macho' },
    { id: '00994', lote: 'A-2024', ubicacion: 'Potrero Sur', ultimoMovimiento: '2024-06-14', peso: '425 kg', departamento: 'Cochabamba', proveedor: 'Proveedor Dos', fechaIngreso: '2024-06-13', pesoInicial: 390, sexo: 'Hembra' },
    { id: '00995', lote: 'B-2024', ubicacion: 'Corral Central', ultimoMovimiento: '2024-06-13', peso: '380 kg', departamento: 'Santa Cruz', proveedor: 'Proveedor Tercero', fechaIngreso: '2024-06-14', pesoInicial: 420, sexo: 'Macho' },
    { id: '00996', lote: 'B-2024', ubicacion: 'Potrero Este', ultimoMovimiento: '2024-06-12', peso: '465 kg' },
    { id: '00997', lote: 'C-2024', ubicacion: 'Potrero Norte', ultimoMovimiento: '2024-06-11', peso: '440 kg' }
  ]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    { id: 1, animal: '00993', origen: 'Potrero Sur', destino: 'Potrero Norte', fecha: '2024-06-15', motivo: 'Rotación de pastoreo', tipo: 'Compra', detalles: 'Compra inicial' },
    { id: 2, animal: '00994', origen: 'Corral Central', destino: 'Potrero Sur', fecha: '2024-06-14', motivo: 'Finalización tratamiento', tipo: 'Traslado', detalles: 'Traslado a potrero norte' },
    { id: 3, animal: '00995', origen: 'Potrero Este', destino: 'Corral Central', fecha: '2024-06-13', motivo: 'Revisión veterinaria', tipo: 'Incidencia', detalles: 'Tratamiento veterinario' }
  ]);

  // Movimiento form states
  const [movForm, setMovForm] = useState({
    idAnimal: '',
    origen: ubicaciones[0],
    destino: ubicaciones[1],
    motivo: motivos[0]
  });
  const [movError, setMovError] = useState<string|null>(null);

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.lote.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      (!filters.departamento || animal.departamento === filters.departamento) &&
      (!filters.proveedor || animal.proveedor === filters.proveedor) &&
      (!animal.pesoInicial || animal.pesoInicial >= filters.pesoMin) &&
      (!animal.pesoInicial || animal.pesoInicial <= filters.pesoMax) &&
      (!filters.fechaIngresoIni || (animal.fechaIngreso && animal.fechaIngreso >= filters.fechaIngresoIni)) &&
      (!filters.fechaIngresoFin || (animal.fechaIngreso && animal.fechaIngreso <= filters.fechaIngresoFin));
    
    return matchesSearch && matchesFilters;
  });

  // Handler: Guardar edición de animal
  const handleEditAnimal = (animalEdit: Animal) => {
    setAnimals(animals => animals.map(a => a.id === animalEdit.id ? { ...a, ...animalEdit } : a));
  };

  // Handler: Importación masiva
  const handleImport = (bulk: Animal[]) => {
    // Evitar duplicados
    const ids = new Set(animals.map(a => a.id));
    const nuevos = bulk.filter(a => !ids.has(a.id));
    setAnimals(animals => [...animals, ...nuevos]);
  };

  // Handler: Registrar movimiento
  const handleRegistroMovimiento = () => {
    // Validaciones
    const { idAnimal, origen, destino, motivo } = movForm;
    if (!idAnimal || !origen || !destino || !motivo) {
      setMovError("Completa todos los campos");
      return;
    }
    if (origen === destino) {
      setMovError("El destino debe ser diferente a la ubicación actual");
      return;
    }
    // Buscar animal
    const idx = animals.findIndex(a => a.id === idAnimal);
    if (idx === -1) {
      setMovError("Animal no encontrado");
      return;
    }
    // Guardar movimiento y actualizar animal
    const fechaHoy = new Date().toISOString().slice(0,10);
    setMovimientos(movs => [
      {
        id: Math.max(0, ...movs.map(m => m.id)) + 1,
        animal: idAnimal,
        origen, destino, motivo,
        fecha: fechaHoy
      },
      ...movs
    ]);
    setAnimals(animals => animals.map((a,i) => i === idx ? {
      ...a,
      ubicacion: destino,
      ultimoMovimiento: fechaHoy
    } : a));
    setShowMovementForm(false);
    setMovForm({
      idAnimal: '',
      origen: ubicaciones[0],
      destino: ubicaciones[1],
      motivo: motivos[0]
    });
    setMovError(null);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      <Tabs value={tab} onValueChange={v => setTab(v as any)} className="w-full max-w-xl mx-auto">
        <TabsList className="flex justify-between items-center rounded-lg mt-0 bg-[#f0cbad] border-b border-[#ac815d] mb-2">
          <TabsTrigger value="registro" className="flex-1 text-[18px] px-2 py-3 text-[#3a210c] data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#ac815d] rounded-lg font-semibold">
            Registro
          </TabsTrigger>
          <TabsTrigger value="movimientos" className="flex-1 text-[18px] px-2 py-3 text-[#3a210c] data-[state=active]:bg-[#ffffff] data-[state=active]:text-[#ac815d] rounded-lg font-semibold">
            Movimientos
          </TabsTrigger>
        </TabsList>

        {/* REGISTRO TAB */}
        <TabsContent value="registro">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
                </Button>
                <h1 className="text-xl font-semibold text-[#3a210c]">Trazabilidad</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setShowImport(true)}>
                  <Import className="h-6 w-6 text-[#3a210c]" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Filter className="h-6 w-6 text-[#3a210c]" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Search className="h-6 w-6 text-[#3a210c]" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-4 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por ID o lote..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>

            {/* Filters (sticky row) */}
            <div className="sticky top-[62px] z-10">
              <AnimalFilters value={filters} onChange={setFilters} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="card-shadow bg-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#3a210c]">{animals.length}</div>
                  <div className="text-sm text-gray-600">Total Animales</div>
                </CardContent>
              </Card>
              <Card className="card-shadow bg-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#3a210c]">{[...new Set(animals.map(a=>a.ubicacion))].length}</div>
                  <div className="text-sm text-gray-600">Ubicaciones</div>
                </CardContent>
              </Card>
              <Card className="card-shadow bg-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#3a210c]">{movimientos.filter(m => m.fecha === new Date().toISOString().slice(0,10)).length}</div>
                  <div className="text-sm text-gray-600">Movimientos Hoy</div>
                </CardContent>
              </Card>
            </div>

            {/* Animals List */}
            <div>
              <h2 className="text-lg font-semibold text-[#3a210c] mb-4">Animales</h2>
              <div className="space-y-3">
                {filteredAnimals.map(animal => (
                  <Card key={animal.id} className="border border-[#ac815d] bg-white group">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-[#3a210c]">ID: {animal.id}</h3>
                            <span className="px-2 py-1 bg-[#f0cbad] text-[#3a210c] text-xs rounded-full">
                              {animal.lote}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {animal.ubicacion}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              Último mov: {animal.ultimoMovimiento}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="font-semibold text-[#3a210c]">{animal.peso}</div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 border-[#ac815d] text-[#ac815d] px-2 py-1 h-7 text-xs"
                            onClick={() => { setAnimalToEdit(animal); setShowAnimalEdit(true); }}
                          >
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* FAB Crear */}
          <Button
            size="lg"
            className="fixed bottom-7 right-7 z-40 rounded-full bg-[#ac815d] hover:bg-[#3a210c] text-white shadow-lg w-16 h-16 flex items-center justify-center text-3xl"
            onClick={() => setShowCrear(true)}
            aria-label="Crear animal"
            style={{ fontSize: 32, minWidth: 56, minHeight: 56 }}
          >
            <Plus className="w-8 h-8" />
          </Button>
          {/* Crear Animal Sheet (stub) */}
          <CrearAnimalSheet open={showCrear} onClose={() => setShowCrear(false)} />

          {/* Perfil de animal (sheet) (stub) */}
          <AnimalProfileSheet open={!!selectedAnimal} animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />
        </TabsContent>

        {/* MOVIMIENTOS TAB */}
        <TabsContent value="movimientos">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
                </Button>
                <h1 className="text-xl font-semibold text-[#3a210c]">Movimientos</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setShowImport(true)}>
                  <Import className="h-6 w-6 text-[#3a210c]" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Filter className="h-6 w-6 text-[#3a210c]" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Search className="h-6 w-6 text-[#3a210c]" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-4 space-y-6">
            {/* Recent Movements */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#3a210c]">Movimientos Recientes</h2>
                <button className="text-sm text-[#ac815d] hover:underline">Ver todos</button>
              </div>
              <div className="space-y-3">
                {movimientos.slice(0, 5).map(movimiento => (
                  <Card key={movimiento.id} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Truck className="h-4 w-4 text-[#ac815d]" />
                            <h4 className="font-medium text-[#3a210c]">Animal {movimiento.animal}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {movimiento.origen} → {movimiento.destino}
                          </p>
                          <p className="text-xs text-gray-400">{movimiento.motivo}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{movimiento.fecha}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* FAB */}
          <div className="fixed bottom-6 right-6">
            <Sheet open={showMovementForm} onOpenChange={setShowMovementForm}>
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
                  <SheetTitle className="text-[#3a210c]">Registrar Movimiento</SheetTitle>
                </SheetHeader>
                
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-[#3a210c]">ID Animal</Label>
                    <Input
                      placeholder="Escanear o escribir ID"
                      className="mt-1"
                      value={movForm.idAnimal}
                      onChange={e => setMovForm(f => ({ ...f, idAnimal: e.target.value }))}
                      maxLength={12}
                      autoFocus
                    />
                  </div>
                  <div>
                    <Label className="text-[#3a210c]">Ubicación actual</Label>
                    <select
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={movForm.origen}
                      onChange={e => setMovForm(f => ({ ...f, origen: e.target.value }))}
                    >
                      {ubicaciones.map(u => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-[#3a210c]">Nueva ubicación</Label>
                    <select
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={movForm.destino}
                      onChange={e => setMovForm(f => ({ ...f, destino: e.target.value }))}
                    >
                      {ubicaciones.map(u => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-[#3a210c]">Motivo</Label>
                    <select
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={movForm.motivo}
                      onChange={e => setMovForm(f => ({ ...f, motivo: e.target.value }))}
                    >
                      {motivos.map(m => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  {movError && <div className="text-red-500 text-sm">{movError}</div>}

                  <Button
                    className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white"
                    onClick={handleRegistroMovimiento}
                  >
                    Registrar Movimiento
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edición animal */}
      <AnimalEditSheet
        open={showAnimalEdit}
        animal={animalToEdit}
        onClose={() => setShowAnimalEdit(false)}
        onSave={handleEditAnimal}
      />

      {/* Importación */}
      <AnimalImportSheet
        open={showImport}
        onClose={() => setShowImport(false)}
        onImport={handleImport}
      />
    </div>
  );
};

export default TrazabilidadModule;
