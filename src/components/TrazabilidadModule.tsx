import React, { useState } from 'react';
import { ArrowLeft, Plus, Import, Search, Filter, MapPin, Calendar, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TabsGS from '@/components/ui/TabsGS';
import AnimalFilters from './trazabilidad/AnimalFilters';
import AnimalCard from './trazabilidad/AnimalCard';
import AnimalProfileScreen from './trazabilidad/AnimalProfileScreen';
import CrearAnimalSheet from './trazabilidad/CrearAnimalSheet';
import AnimalImportSheet from './trazabilidad/AnimalImportSheet';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

const TabsConfig = [
  { key: "registro", label: "Registro" },
  { key: "movimientos", label: "Movimientos" },
];

const TrazabilidadModule = ({ onBack }: TrazabilidadModuleProps) => {
  const [tab, setTab] = useState('registro');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    departamento: '',
    proveedor: '',
    pesoMin: 0,
    pesoMax: 600,
    fechaIngresoIni: '',
    fechaIngresoFin: ''
  });

  // Ahora sí serán estados mutables
  const [animals, setAnimals] = useState<Animal[]>([
    { id: '00993', lote: 'A-2024', ubicacion: 'Potrero Norte', ultimoMovimiento: '2024-06-15', peso: '450 kg', departamento: 'La Paz', proveedor: 'Proveedor Uno', fechaIngreso: '2024-06-12', pesoInicial: 400, sexo: 'Macho' },
    { id: '00994', lote: 'A-2024', ubicacion: 'Potrero Sur', ultimoMovimiento: '2024-06-14', peso: '425 kg', departamento: 'Cochabamba', proveedor: 'Proveedor Dos', fechaIngreso: '2024-06-13', pesoInicial: 390, sexo: 'Hembra' },
    { id: '00995', lote: 'B-2024', ubicacion: 'Corral Central', ultimoMovimiento: '2024-06-13', peso: '380 kg', departamento: 'Santa Cruz', proveedor: 'Proveedor Tercero', fechaIngreso: '2024-06-14', pesoInicial: 420, sexo: 'Macho' },
    { id: '00996', lote: 'B-2024', ubicacion: 'Potrero Este', ultimoMovimiento: '2024-06-12', peso: '465 kg', departamento: 'Oruro', proveedor: 'Proveedor Cuatro', fechaIngreso: '2024-06-12', pesoInicial: 410, sexo: 'Hembra' },
    { id: '00997', lote: 'C-2024', ubicacion: 'Potrero Norte', ultimoMovimiento: '2024-06-11', peso: '440 kg', departamento: 'La Paz', proveedor: 'Proveedor Uno', fechaIngreso: '2024-06-11', pesoInicial: 420, sexo: 'Macho' }
  ]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    { id: 1, animal: '00993', origen: 'Potrero Sur', destino: 'Potrero Norte', fecha: '2024-06-15', motivo: 'Rotación de pastoreo', tipo: 'Compra', detalles: 'Compra inicial' },
    { id: 2, animal: '00994', origen: 'Corral Central', destino: 'Potrero Sur', fecha: '2024-06-14', motivo: 'Finalización tratamiento', tipo: 'Traslado', detalles: 'Traslado a potrero norte' },
    { id: 3, animal: '00995', origen: 'Potrero Este', destino: 'Corral Central', fecha: '2024-06-13', motivo: 'Revisión veterinaria', tipo: 'Incidencia', detalles: 'Tratamiento veterinario' }
  ]);
  const [showCrear, setShowCrear] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAnimalProfile, setShowAnimalProfile] = useState(false);

  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showMovementForm, setShowMovementForm] = useState(false);
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

  // ---- Handlers ----
  // Crear animal
  const handleCrearAnimal = (animal: any) => {
    setAnimals(prev => [
      { ...animal, peso: animal.pesoCompra+" kg", sexo: animal.sexo },
      ...prev
    ]);
  };

  // Importar animales desde Excel/CSV
  const handleImport = (animales: any[]) => {
    setAnimals(prev => [
      ...animales.map(a => ({ ...a, peso: a.peso+" kg", departamento: "", proveedor: "", sexo:"Macho" })),
      ...prev
    ]);
  };

  // Registrar movimiento (igual que antes)
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

  // ----------- UI ----------- //
  if (showAnimalProfile && selectedAnimal) {
    return (
      <AnimalProfileScreen 
        animal={selectedAnimal} 
        onBack={() => {
          setShowAnimalProfile(false);
          setSelectedAnimal(null);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#faf4ef]">
      {/* Header sticky */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
            </Button>
            <h1 className="text-xl font-semibold text-[#3a210c]">
              {tab === "registro" ? "Trazabilidad" : "Movimientos"}
            </h1>
          </div>
          {/* Overflow menu Excel Import */}
          <Button variant="ghost" size="icon" aria-label="Importar Excel" className="text-[#3a210c]" onClick={() => setShowImport(true)}>
            <Import className="h-6 w-6" />
          </Button>
        </div>
      </header>
      {/* Tabs */}
      <TabsGS
        value={tab}
        onChange={setTab}
        tabs={[
          { key: "registro", label: "Registro" },
          { key: "movimientos", label: "Movimientos" },
        ]}
      />

      {/* Sheets */}
      <CrearAnimalSheet open={showCrear} onClose={() => setShowCrear(false)} onCreate={handleCrearAnimal} lotes={[...new Set(animals.map(a=>a.lote))]} />
      <AnimalImportSheet open={showImport} onClose={() => setShowImport(false)} onImport={handleImport} />

      {/* Tab content */}
      {tab === "registro" ? (
        <div>
          {/* Search bar */}
          <div className="px-4 mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar ID o lote…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#ac815d] text-[#3a210c] bg-white placeholder:text-gray-400 font-medium text-[16px] shadow"
                style={{ borderRadius: 8 }}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ac815d] pointer-events-none text-lg">🔍</span>
            </div>
          </div>

          {/* Static Filters */}
          <div className="px-4 pt-4">
            <AnimalFilters value={filters} onChange={setFilters} />
          </div>

          {/* Listado de animales */}
          <div className="px-4 pt-4 pb-28">
            <h2 className="mt-2 mb-3 text-lg font-semibold text-[#3a210c]">Animales</h2>
            <div className="flex flex-col gap-4">
              {filteredAnimals.map(animal => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onClick={() => {
                    setSelectedAnimal(animal);
                    setShowAnimalProfile(true);
                  }}
                />
              ))}
              {filteredAnimals.length === 0 && (
                <div className="text-center text-[#ac815d] text-[16px] p-8 bg-white rounded-lg shadow">
                  No se encontraron animales.
                </div>
              )}
            </div>
          </div>

          {/* FAB CREAR ANIMAL */}
          <Button
            size="lg"
            className="fixed bottom-7 right-7 z-40 rounded-full bg-[#ac815d] hover:bg-[#3a210c] text-white shadow-lg w-16 h-16 flex items-center justify-center text-3xl"
            onClick={() => setShowCrear(true)}
            aria-label="Crear animal"
            style={{ fontSize: 32, minWidth: 56, minHeight: 56 }}
          >
            <Plus className="w-8 h-8" />
          </Button>
        </div>
      ) : (
        // Tab Movimientos: Remove duplicate header
        <div>
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
        </div>
      )}
    </div>
  );
};

export default TrazabilidadModule;
