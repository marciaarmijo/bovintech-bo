
import React, { useState } from "react";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PersonalInfoCard from "./Perfil/PersonalInfoCard";
import FincaInfoCard from "./Perfil/FincaInfoCard";
import BovinTechCard from "./Perfil/BovinTechCard";
import QuickAccessCard from "./Perfil/QuickAccessCard";
import LogoutButton from "./Perfil/LogoutButton";
import UserAvatar from "@/components/ui/UserAvatar";
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

  const [quick, setQuick] = useState({
    offline: true,
    sync: false,
    bluetooth: false,
    notifications: true
  });

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

  function handleLogout() {
    onBack();
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
        <UserAvatar size={80} name={profile.name} showBorder />
      </div>
      
      {/* DATOS PERSONALES */}
      <div className="max-w-xl mx-auto w-full px-4 space-y-4">
        <Card className="p-0 border-[#ac815d]">
          <CardContent className="p-0">
            <PersonalInfoCard
              profile={profile}
              errors={profileErrors}
              editing={editing}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>
        
        {/* INFO FINCA */}
        <Card className="p-0 border-[#ac815d]">
          <CardContent className="p-0">
            <FincaInfoCard
              finca={finca}
              errors={fincaErrors}
              editing={editing}
              onChange={handleInputChange}
              propOptions={propOptions}
            />
          </CardContent>
        </Card>
        
        {/* CARD BOVINTECH */}
        <Card className="p-0 border-[#ac815d]">
          <CardContent className="p-0">
            <BovinTechCard />
          </CardContent>
        </Card>
        
        {/* ACCESOS RÁPIDOS */}
        <Card className="p-0 border-[#ac815d]">
          <CardContent className="p-0">
            <QuickAccessCard quick={quick} setQuick={setQuick} />
          </CardContent>
        </Card>
      </div>
      
      {/* USER AVATAR AT BOTTOM - with border and shadow */}
      <div className="w-full px-4 pb-4 mt-6 flex justify-center">
        <UserAvatar size={100} name={profile.name} showBorder />
      </div>
      
      {/* BOTÓN CERRAR SESIÓN */}
      <div className="w-full px-4 pb-7">
        <LogoutButton
          showLogout={showLogout}
          setShowLogout={setShowLogout}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}
