
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import RegistroWizard from './auth/RegistroWizard';
import { useToast } from '@/hooks/use-toast';

interface AuthScreensProps {
  onLogin: () => void;
}

const AuthScreens: React.FC<AuthScreensProps> = ({ onLogin }) => {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = 'El correo es obligatorio.';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Introduce un correo electrónico válido.';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es obligatoria.';
        } else if (value.length < 8) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        } else {
          delete newErrors.password;
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate if field has been touched
    if (touchedFields[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const handleLogin = () => {
    // Validate all fields
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);

    // Mark all fields as touched
    setTouchedFields({ email: true, password: true });

    if (!emailValid || !passwordValid) {
      toast({
        title: "Corrige los errores para continuar.",
        variant: "destructive",
      });
      return;
    }

    onLogin();
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
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={`border-[#ac815d] focus:ring-[#ac815d] ${
                  errors.email ? 'border-[#d9534f]' : ''
                }`}
              />
              {errors.email && (
                <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
              )}
            </div>
            {errors.email && (
              <p className="text-[#d9534f] text-xs mt-1 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                className={`border-[#ac815d] focus:ring-[#ac815d] ${
                  errors.password ? 'border-[#d9534f]' : ''
                }`}
              />
              {errors.password && (
                <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
              )}
            </div>
            {errors.password && (
              <p className="text-[#d9534f] text-xs mt-1 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {errors.password}
              </p>
            )}
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
