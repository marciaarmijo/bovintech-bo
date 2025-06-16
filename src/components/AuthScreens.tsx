
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import RegistroWizard from './auth/RegistroWizard';

interface AuthScreensProps {
  screen: 'login' | 'register' | 'forgot';
  onScreenChange: (screen: 'login' | 'register' | 'forgot') => void;
  onLogin: () => void;
}

const AuthScreens = ({ screen, onScreenChange, onLogin }: AuthScreensProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    resetEmail: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegistrationComplete = (userData: any) => {
    console.log('Usuario registrado:', userData);
    // Here you would typically send data to your backend
    onLogin(); // For demo purposes, log in the user
  };

  if (screen === 'register') {
    return (
      <RegistroWizard
        onBack={() => onScreenChange('login')}
        onComplete={handleRegistrationComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#3a210c] flex flex-col">
      {/* Header */}
      <header className="bg-[#3a210c] px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {screen !== 'login' && (
              <Button variant="ghost" size="icon" onClick={() => onScreenChange('login')} className="text-white hover:bg-white/10">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">
              {screen === 'login' ? 'Iniciar sesión' : 
               screen === 'register' ? 'Crear cuenta' : 'Recuperar contraseña'}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 bg-gray-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white">
          <CardContent className="p-6">
            {screen === 'login' && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <img 
                    src="/lovable-uploads/bca22938-9c67-4898-ab34-55d85ff2873f.png"
                    alt="BovinTech Logo"
                    className="w-16 h-16 mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold text-[#3a210c]">Bienvenido</h2>
                  <p className="text-gray-600">Ingresa a tu cuenta</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3a210c] mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3a210c] mb-1">Contraseña</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Tu contraseña"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={() => onScreenChange('forgot')}
                    className="text-sm text-[#ac815d] hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button
                  onClick={onLogin}
                  className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white"
                >
                  Iniciar sesión
                </Button>

                <div className="text-center pt-4">
                  <span className="text-gray-600">¿No tienes cuenta? </span>
                  <button
                    onClick={() => onScreenChange('register')}
                    className="text-[#ac815d] hover:underline font-medium"
                  >
                    Crear cuenta
                  </button>
                </div>
              </div>
            )}

            {screen === 'forgot' && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-[#3a210c]">Recuperar contraseña</h2>
                  <p className="text-gray-600">Te enviaremos un enlace para restablecer tu contraseña</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3a210c] mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.resetEmail}
                    onChange={(e) => handleInputChange('resetEmail', e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>

                <Button
                  onClick={() => {
                    // Handle password reset
                    alert('Se ha enviado un enlace de recuperación a tu email');
                    onScreenChange('login');
                  }}
                  className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white"
                >
                  Enviar enlace
                </Button>

                <div className="text-center pt-4">
                  <button
                    onClick={() => onScreenChange('login')}
                    className="text-[#ac815d] hover:underline"
                  >
                    Volver al inicio de sesión
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreens;
