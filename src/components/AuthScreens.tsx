
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RegistroWizard from './auth/RegistroWizard';

interface AuthScreensProps {
  onLogin: () => void;
}

const AuthScreens: React.FC<AuthScreensProps> = ({ onLogin }) => {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    // Simulate login validation
    if (formData.email && formData.password) {
      onLogin();
    }
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  if (currentView === 'register') {
    return (
      <RegistroWizard 
        onBack={handleBackToLogin}
        onSuccess={onLogin}
      />
    );
  }

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
};

export default AuthScreens;
