import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, MapPin, Calendar, Truck, Import } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AnimalEditSheet from './AnimalEditSheet';
import AnimalImportSheet from './AnimalImportSheet';
import { AnimalCard } from "./trazabilidad/AnimalCard";
import { AnimalFilterBar } from "./trazabilidad/AnimalFilterBar";
import { AnimalCreateFAB } from "./trazabilidad/AnimalCreateFAB";
import { AnimalOverflowMenu } from "./trazabilidad/AnimalOverflowMenu";
import { toastES } from "./trazabilidad/ToastES";

interface Animal {
  id: string;
  lote: string;
  ubicacion: string;
  ultimoMovimiento: string;
  peso: string;
}
interface Movimiento {
  id: number;
  animal: string;
  origen: string;
  destino: string;
  fecha: string;
  motivo: string;
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

// Estado global de modal
const departamentosFicticios = ["Santa Cruz", "Beni", "Cochabamba", "Tarija"];
const proveedoresFicticios = ["Ganadero Norte", "Agropecuaria Sur", "Estancia Este", "AgroBeni Sur"];
const initPeso = [100, 700];

const TrazabilidadModule = ({ onBack }: TrazabilidadModuleProps) => {
  const [showMovementForm, setShowMovementForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnimalEdit, setShowAnimalEdit] = useState(false);
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);
  const [showImport, setShowImport] = useState(false);

  const [animals, setAnimals] = useState<Animal[]>([
    { id: '00993', lote: 'A-2024', ubicacion: 'Potrero Norte', ultimoMovimiento: '2024-06-15', peso: '450 kg' },
    { id: '00994', lote: 'A-2024', ubicacion: 'Potrero Sur', ultimoMovimiento: '2024-06-14', peso: '425 kg' },
    { id: '00995', lote: 'B-2024', ubicacion: 'Corral Central', ultimoMovimiento: '2024-06-13', peso: '380 kg' },
    { id: '00996', lote: 'B-2024', ubicacion: 'Potrero Este', ultimoMovimiento: '2024-06-12', peso: '465 kg' },
    { id: '00997', lote: 'C-2024', ubicacion: 'Potrero Norte', ultimoMovimiento: '2024-06-11', peso: '440 kg' }
  ]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    { id: 1, animal: '00993', origen: 'Potrero Sur', destino: 'Potrero Norte', fecha: '2024-06-15', motivo: 'Rotación de pastoreo' },
    { id: 2, animal: '00994', origen: 'Corral Central', destino: 'Potrero Sur', fecha: '2024-06-14', motivo: 'Finalización tratamiento' },
    { id: 3, animal: '00995', origen: 'Potrero Este', destino: 'Corral Central', fecha: '2024-06-13', motivo: 'Revisión veterinaria' }
  ]);

  // Movimiento form states
  const [movForm, setMovForm] = useState({
    idAnimal: '',
    origen: ubicaciones[0],
    destino: ubicaciones[1],
    motivo: motivos[0]
  });
  const [movError, setMovError] = useState<string|null>(null);

  // Añadir estados de filtro rápido:
  const [procedencia, setProcedencia] = useState("");
  const [pesoFiltro, setPesoFiltro] = useState<[number, number]>(initPeso);
  const [fechaFiltro, setFechaFiltro] = useState<[Date|undefined, Date|undefined]>([undefined, undefined]);
  const [modalImportOpen, setModalImportOpen] = useState(false);
  const [showAnimalCreate, setShowAnimalCreate] = useState(false);

  // Búsqueda/filtros combinados (simplificado para la demo)
  const filteredAnimals = animals.filter(animal => {
    const m1 = !searchTerm || animal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const m2 = !procedencia || animal.lote?.toLowerCase().includes(procedencia.toLowerCase());
    const m3 = Number(animal.peso) >= pesoFiltro[0] && Number(animal.peso) <= pesoFiltro[1];
    const m4 = !fechaFiltro[0] || !fechaFiltro[1] || (
      animal.ultimoMovimiento >= fechaFiltro[0].toISOString().slice(0,10) &&
      animal.ultimoMovimiento <= fechaFiltro[1].toISOString().slice(0,10)
    );
    return m1 && m2 && m3 && m4;
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

  // HANDLERS
  const handleAnimalCreate = (nuevoAnimal: Animal) => {
    setAnimals(animals => [...animals, nuevoAnimal]);
    toastES.animalCreado();
  }

  return (
    <div className="min-h-screen bg-[#FDF8F4] relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
          </Button>
          <img src="/icon_trazabilidad.png" alt="" className="w-10 h-10 hidden sm:block" />
          <h1 className="text-xl font-semibold text-[#3a210c]">Trazabilidad</h1>
        </div>
        <AnimalOverflowMenu onImport={() => setModalImportOpen(true)} />
      </header>

      {/* Filtros sticky */}
      <div className="px-4 pt-4 sticky top-[57px] z-10">
        <AnimalFilterBar
          search={searchTerm}
          onSearch={setSearchTerm}
          procedencia={procedencia}
          onProcedencia={setProcedencia}
          peso={pesoFiltro}
          onPeso={setPesoFiltro}
          fecha={fechaFiltro}
          onFecha={setFechaFiltro}
          departamentos={departamentosFicticios}
          proveedores={proveedoresFicticios}
        />
      </div>

      {/* Lista de animales */}
      <div className="px-4 pt-4 pb-24 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {filteredAnimals.map(animal =>
          <AnimalCard key={animal.id} id={animal.id} onClick={() => {/*abrir drawer perfil animal*/}} />
        )}
        {filteredAnimals.length === 0 && (
          <div className="col-span-2 text-[#3a210c] text-center py-5">Sin resultados.</div>
        )}
      </div>

      <AnimalCreateFAB onClick={() => setShowAnimalCreate(true)} />

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

// Archivo extenso. Tras verificar funcionamiento, considera refactorizar para que se mantenga mantenible y modular.
