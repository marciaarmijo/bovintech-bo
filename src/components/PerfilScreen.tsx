
import React, { useState } from "react";
import { ArrowLeft, Edit, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface PerfilScreenProps {
  onBack: () => void;
}

const initialProfile = {
  email: "juan.perez@email.com",
  phone: "71234567",
  name: "Juan Pérez"
};
const initialFinca = {
  nombre: "El Progreso",
  ubicacion: "Tarija – Tarija",
  proposito: "Producción carne",
  superficie: "30"
};

const propOptions = [
  "Producción carne",
  "Cría",
  "Engorde",
  "Doble propósito"
];

export default function PerfilScreen({ onBack }: PerfilScreenProps) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [profileErrors, setProfileErrors] = useState<{ [key: string]: string }>({});
  const [finca, setFinca] = useState(initialFinca);
  const [fincaErrors, setFincaErrors] = useState<{ [key: string]: string }>({});
  const [showLogout, setShowLogout] = useState(false);

  // quick toggles state
  const [quick, setQuick] = useState({
    offline: true,
    sync: false,
    bluetooth: false,
    notifications: true
  });

  // validation
  function validateProfile(p: typeof profile) {
    const e: { [key: string]: string } = {};
    if (!p.email) e.email = "Requerido";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(p.email)) e.email = "Correo inválido";
    if (!p.name) e.name = "Requerido";
    return e;
  }
  function validateFinca(f: typeof finca) {
    const e: { [key: string]: string } = {};
    if (!f.nombre) e.nombre = "Requerido";
    if (!f.ubicacion) e.ubicacion = "Requerido";
    if (!f.proposito) e.proposito = "Requerido";
    return e;
  }

  function handleEditSave() {
    if (!editing) {
      setEditing(true);
    } else {
      // Validate both sections
      const pErrors = validateProfile(profile);
      const fErrors = validateFinca(finca);
      setProfileErrors(pErrors);
      setFincaErrors(fErrors);
      if (Object.keys(pErrors).length === 0 && Object.keys(fErrors).length === 0) {
        setEditing(false);
        toast({ title: "Perfil actualizado", description: "Los datos fueron guardados correctamente." });
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (["email", "phone", "name"].includes(name)) {
      setProfile({ ...profile, [name]: value });
      setProfileErrors({ ...profileErrors, [name]: "" });
    } else {
      setFinca({ ...finca, [name]: value });
      setFincaErrors({ ...fincaErrors, [name]: "" });
    }
  }

  return (
    <div className="min-h-screen bg-[#faf4ef] flex flex-col justify-between relative">
      {/* HEADER */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft color="#3a210c" size={22} />
        </Button>
        <h2 className="text-[18px] font-semibold text-[#3a210c] select-none">Perfil</h2>
        <Button variant="ghost" size="icon" onClick={handleEditSave}>
          <Edit color="#3a210c" size={22} />
        </Button>
      </div>

      {/* AVATAR */}
      <div className="flex flex-col items-center mt-6 -mb-2">
        <div className="w-20 h-20 rounded-full bg-[#e7cdb9] flex items-center justify-center ring-2 ring-[#ac815d]">
          <span className="text-3xl text-[#3a210c] font-semibold">JP</span>
        </div>
      </div>

      {/* DATOS PERSONALES */}
      <div className="max-w-xl mx-auto w-full px-4 space-y-4">
        <Card className="p-0 border-[#ac815d]">
          <CardContent className="p-0">
            <form className="grid grid-cols-2 gap-4 p-4">
              <div className="col-span-2 text-[#3a210c] font-semibold pb-2">Información personal</div>
              
              <div>
                <label className="block text-xs font-medium text-[#3a210c] mb-1">
                  Correo electrónico*
                </label>
                <Input
                  type="email"
                  name="email"
                  disabled={!editing}
                  value={profile.email}
                  onChange={handleInputChange}
                  inputMode="email"
                  className={`bg-white ${profileErrors.email ? "border-red-400" : "border-[#d0ab8d]"} text-[#3a210c]`}
                  autoComplete="email"
                  aria-label="Correo electrónico"
                />
                {profileErrors.email && <span className="text-xs text-red-500">{profileErrors.email}</span>}
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3a210c] mb-1">
                  Teléfono
                </label>
                <Input
                  type="tel"
                  name="phone"
                  disabled={!editing}
                  value={profile.phone}
                  onChange={handleInputChange}
                  inputMode="numeric"
                  className="bg-white border-[#d0ab8d] text-[#3a210c]"
                  autoComplete="tel"
                  aria-label="Teléfono"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-[#3a210c] mb-1">
                  Nombre completo*
                </label>
                <Input
                  type="text"
                  name="name"
                  disabled={!editing}
                  value={profile.name}
                  onChange={handleInputChange}
                  className={`bg-white ${profileErrors.name ? "border-red-400" : "border-[#d0ab8d]"} text-[#3a210c]`}
                  aria-label="Nombre completo"
                />
                {profileErrors.name && <span className="text-xs text-red-500">{profileErrors.name}</span>}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* INFO FINCA */}
        <Card className="p-0 border-[#ac815d]">
          <CardContent className="p-0">
            <div className="px-4 pt-4 pb-2 text-[#3a210c] font-semibold text-[18px]">Mi finca</div>
            <form className="grid grid-cols-2 gap-4 p-4 pt-0">
              <div>
                <label className="block text-xs font-medium text-[#3a210c] mb-1">
                  Nombre de la finca*
                </label>
                <Input
                  type="text"
                  name="nombre"
                  disabled={!editing}
                  value={finca.nombre}
                  onChange={handleInputChange}
                  className={`bg-white ${fincaErrors.nombre ? "border-red-400" : "border-[#d0ab8d]"} text-[#3a210c]`}
                  aria-label="Nombre de la finca"
                />
                {fincaErrors.nombre && <span className="text-xs text-red-500">{fincaErrors.nombre}</span>}
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3a210c] mb-1">
                  Ubicación (Ciudad – Departamento)*
                </label>
                <Input
                  type="text"
                  name="ubicacion"
                  disabled={!editing}
                  value={finca.ubicacion}
                  onChange={handleInputChange}
                  className={`bg-white ${fincaErrors.ubicacion ? "border-red-400" : "border-[#d0ab8d]"} text-[#3a210c]`}
                  aria-label="Ubicación"
                />
                {fincaErrors.ubicacion && <span className="text-xs text-red-500">{fincaErrors.ubicacion}</span>}
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3a210c] mb-1">
                  Propósito*
                </label>
                <select
                  name="proposito"
                  disabled={!editing}
                  value={finca.proposito}
                  onChange={handleInputChange}
                  aria-label="Propósito"
                  className={`w-full rounded-md border ${fincaErrors.proposito ? "border-red-400" : "border-[#d0ab8d]"} px-3 py-2 text-base bg-white text-[#3a210c] focus:outline-none focus:ring-2 focus:ring-[#ac815d]`}
                >
                  <option value="">Seleccionar</option>
                  {propOptions.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                {fincaErrors.proposito && <span className="text-xs text-red-500">{fincaErrors.proposito}</span>}
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3a210c] mb-1">
                  Superficie (ha)
                </label>
                <Input
                  type="number"
                  name="superficie"
                  disabled={!editing}
                  value={finca.superficie}
                  onChange={handleInputChange}
                  inputMode="numeric"
                  className="bg-white border-[#d0ab8d] text-[#3a210c]"
                  aria-label="Superficie"
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* CONTACTO y SOPORTE */}
        <Card className="p-0 border-[#ac815d]">
          <CardContent className="p-0">
            <div className="px-4 pt-4 pb-2 text-[#3a210c] font-semibold text-[18px]">Contacto BovinTech</div>
            <div className="px-4 pb-0 text-[#3a210c] text-[15px] grid gap-1">
              <div>Email: <span className="font-normal">soporte@bovintech.com</span></div>
              <div>Web: <a href="https://www.bovintech.com.bo" className="underline hover:text-[#ac815d]" target="_blank" rel="noopener">www.bovintech.com.bo</a></div>
              <div>Teléfono: <span className="font-normal">+591 700-12345</span></div>
            </div>
            <div className="px-4 py-2">
              <Button variant="outline" className="border-[#3a210c] text-[#3a210c] w-full mt-1">Enviar feedback</Button>
            </div>
          </CardContent>
        </Card>

        {/* ACCESOS RÁPIDOS */}
        <Card className="p-0 border-[#ac815d]">
          <CardContent className="p-0">
            <div className="px-4 pt-4 pb-2 text-[#3a210c] font-semibold text-[15px]">Accesos rápidos</div>
            <div className="px-4 pb-2 grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
              <div className="flex items-center gap-2">
                <Switch 
                  id="offline"
                  checked={quick.offline} 
                  onCheckedChange={v => setQuick(q => ({ ...q, offline: v }))}
                />
                <label htmlFor="offline" className="text-[#3a210c] text-sm select-none cursor-pointer">Modo offline</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  id="sync"
                  checked={quick.sync} 
                  onCheckedChange={v => setQuick(q => ({ ...q, sync: v }))}
                />
                <label htmlFor="sync" className="text-[#3a210c] text-sm select-none cursor-pointer">Sincronización automática</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  id="bluetooth"
                  checked={quick.bluetooth} 
                  onCheckedChange={v => setQuick(q => ({ ...q, bluetooth: v }))}
                />
                <label htmlFor="bluetooth" className="text-[#3a210c] text-sm select-none cursor-pointer">Conectividad Bluetooth</label>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  id="notificaciones"
                  checked={quick.notifications} 
                  onCheckedChange={v => setQuick(q => ({ ...q, notifications: v }))}
                />
                <label htmlFor="notificaciones" className="text-[#3a210c] text-sm select-none cursor-pointer">Notificaciones</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BOTÓN CERRAR SESIÓN */}
      <div className="w-full px-4 pb-7 mt-8">
        <Button
          variant="outline"
          className="w-full bg-white text-[#d9534f] text-base shadow-md h-12 border border-[#e0ae95] font-semibold"
          onClick={() => setShowLogout(true)}
        >
          <LogOut className="mr-2" size={20} color="#d9534f" />
          Cerrar sesión
        </Button>
      </div>

      {/* Dialogo cerrar sesión */}
      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent className="max-w-xs text-center">
          <DialogHeader>
            <DialogTitle>¿Estás seguro que deseas cerrar sesión?</DialogTitle>
            <DialogDescription>Esta acción cerrará tu sesión actual.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setShowLogout(false)}>Cancelar</Button>
            <Button className="bg-[#d9534f]" onClick={() => {
              setShowLogout(false);
              // Aquí colocar lógica real de logout
              toast({ title: "Sesión cerrada", description: "¡Vuelve pronto!" });
              // simulamos volver al inicio
              onBack();
            }}>
              Cerrar sesión
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
