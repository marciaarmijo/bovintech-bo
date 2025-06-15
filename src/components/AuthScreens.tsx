
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AuthScreensProps {
  onLogin: () => void;
}

const AuthScreens: React.FC<AuthScreensProps> = ({ onLogin }) => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'register-farm'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellidos: '',
    nombreFinca: '',
    ciudad: '',
    departamento: '',
    proposito: '',
    superficie: ''
  });

  const departamentos = [
    'La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí', 
    'Chuquisaca', 'Tarija', 'Beni', 'Pando'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    // Simulate login validation
    if (formData.email && formData.password) {
      onLogin();
    }
  };

  const handleRegisterStep1 = () => {
    if (formData.email && formData.password && formData.confirmPassword && 
        formData.nombre && formData.apellidos && formData.password === formData.confirmPassword) {
      setCurrentView('register-farm');
    }
  };

  const handleRegisterComplete = () => {
    if (formData.nombreFinca && formData.departamento && formData.proposito) {
      onLogin();
    }
  };

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0cbad] to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-shadow">
          <CardHeader className="text-center pb-2">
            <img 
              src="/lovable-uploads/ecb70fe3-2f1a-475b-9191-ddaa4b955297.png" 
              alt="BovinTech" 
              className="w-20 h-20 mx-auto mb-4"
            />
            <CardTitle className="text-2xl text-[#3a210c]">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-[#ac815d] focus:ring-[#ac815d]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="border-[#ac815d] focus:ring-[#ac815d]"
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-[#3a210c] hover:bg-[#2a1808] bovin-transition"
            >
              Acceder
            </Button>
            <div className="text-center space-y-2">
              <button className="text-sm text-[#ac815d] hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
              <div>
                <button 
                  onClick={() => setCurrentView('register')}
                  className="text-sm text-[#3a210c] hover:underline font-medium"
                >
                  Crear cuenta nueva
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0cbad] to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-shadow">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-[#3a210c]">Crear Cuenta</CardTitle>
            <p className="text-sm text-[#ac815d]">Paso 1 de 2: Datos personales</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className="border-[#ac815d] focus:ring-[#ac815d]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  className="border-[#ac815d] focus:ring-[#ac815d]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-[#ac815d] focus:ring-[#ac815d]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="border-[#ac815d] focus:ring-[#ac815d]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="border-[#ac815d] focus:ring-[#ac815d]"
              />
            </div>
            <Button 
              onClick={handleRegisterStep1}
              className="w-full bg-[#3a210c] hover:bg-[#2a1808] bovin-transition"
            >
              Continuar
            </Button>
            <div className="text-center">
              <button 
                onClick={() => setCurrentView('login')}
                className="text-sm text-[#ac815d] hover:underline"
              >
                ¿Ya tienes cuenta? Iniciar sesión
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0cbad] to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-shadow">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl text-[#3a210c]">Datos de la Finca</CardTitle>
          <p className="text-sm text-[#ac815d]">Paso 2 de 2: Información de tu operación</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombreFinca">Nombre de la finca</Label>
            <Input
              id="nombreFinca"
              value={formData.nombreFinca}
              onChange={(e) => handleInputChange('nombreFinca', e.target.value)}
              className="border-[#ac815d] focus:ring-[#ac815d]"
            />
          </div>
          <div className="space-y-2">
            <Label>Departamento</Label>
            <Select onValueChange={(value) => handleInputChange('departamento', value)}>
              <SelectTrigger className="border-[#ac815d]">
                <SelectValue placeholder="Selecciona tu departamento" />
              </SelectTrigger>
              <SelectContent>
                {departamentos.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ciudad">Ciudad</Label>
            <Input
              id="ciudad"
              value={formData.ciudad}
              onChange={(e) => handleInputChange('ciudad', e.target.value)}
              className="border-[#ac815d] focus:ring-[#ac815d]"
            />
          </div>
          <div className="space-y-3">
            <Label>Propósito principal</Label>
            <RadioGroup 
              value={formData.proposito} 
              onValueChange={(value) => handleInputChange('proposito', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="carne" id="carne" />
                <Label htmlFor="carne">Producción de carne</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cria" id="cria" />
                <Label htmlFor="cria">Cría</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="engorde" id="engorde" />
                <Label htmlFor="engorde">Engorde</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doble" id="doble" />
                <Label htmlFor="doble">Doble propósito</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="superficie">Superficie (hectáreas)</Label>
            <Input
              id="superficie"
              type="number"
              value={formData.superficie}
              onChange={(e) => handleInputChange('superficie', e.target.value)}
              className="border-[#ac815d] focus:ring-[#ac815d]"
            />
          </div>
          <Button 
            onClick={handleRegisterComplete}
            className="w-full bg-[#3a210c] hover:bg-[#2a1808] bovin-transition"
          >
            Crear cuenta
          </Button>
          <div className="text-center">
            <button 
              onClick={() => setCurrentView('register')}
              className="text-sm text-[#ac815d] hover:underline"
            >
              Volver
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreens;
