
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PersonalInfoCard from './Perfil/PersonalInfoCard';
import FincaInfoCard from './Perfil/FincaInfoCard';
import QuickAccessCard from './Perfil/QuickAccessCard';
import BovinTechCard from './Perfil/BovinTechCard';
import LogoutButton from './Perfil/LogoutButton';
import UserAvatar from './ui/UserAvatar';

interface PerfilScreenProps {
  onBack: () => void;
}

const PerfilScreen = ({ onBack }: PerfilScreenProps) => {
  const [user] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '+591 700-12345',
    finca: 'Finca El Progreso',
    ubicacion: 'Santa Cruz, Bolivia',
    foto: '/foto_perfil_usuario.png' // This will fallback to initials if not found
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#3a210c]">Perfil</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 text-center">
          <UserAvatar
            src={user.foto}
            name={user.nombre}
            size={80}
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-[#3a210c] mb-1">{user.nombre}</h2>
          <p className="text-gray-600">{user.finca}</p>
        </div>

        {/* Info Cards */}
        <PersonalInfoCard user={user} />
        <FincaInfoCard finca={user.finca} ubicacion={user.ubicacion} />
        <QuickAccessCard />
        <BovinTechCard />
        <LogoutButton />
      </div>
    </div>
  );
};

export default PerfilScreen;
