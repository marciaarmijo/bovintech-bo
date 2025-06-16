
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

interface RegistroWizardProps {
  onBack: () => void;
  onSuccess: () => void;
}

const RegistroWizard: React.FC<RegistroWizardProps> = ({ onBack, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellidos: '',
    nombreFinca: '',
    departamento: '',
    ciudad: '',
    proposito: '',
    superficie: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Campo requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Campo requerido';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Campo requerido';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (!formData.nombre) {
      newErrors.nombre = 'Campo requerido';
    }
    
    if (!formData.apellidos) {
      newErrors.apellidos = 'Campo requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.nombreFinca) {
      newErrors.nombreFinca = 'Campo requerido';
    }
    
    if (!formData.departamento) {
      newErrors.departamento = 'Campo requerido';
    }
    
    if (!formData.proposito) {
      newErrors.proposito = 'Campo requerido';
    }
    
    if (!formData.superficie) {
      newErrors.superficie = 'Campo requerido';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debe aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep(1);
    }
  };

  const handleCreateAccount = () => {
    if (validateStep2()) {
      toast({
        title: "Cuenta creada con éxito",
        description: "Bienvenido a BovinTech",
      });
      onSuccess();
    }
  };

  const isStep1Valid = formData.email && formData.password && formData.confirmPassword && 
                      formData.nombre && formData.apellidos && 
                      validateEmail(formData.email) && formData.password === formData.confirmPassword;

  const isStep2Valid = formData.nombreFinca && formData.departamento && formData.proposito && 
                       formData.superficie && formData.acceptTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0cbad] to-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-[#ac815d]">
        <Button variant="ghost" size="icon" onClick={handleBack} className="p-2">
          <ArrowLeft color="#3a210c" size={20} />
        </Button>
        <h1 className="text-lg font-semibold text-[#3a210c]">
          {currentStep === 1 ? 'Registro' : 'Datos de la finca'}
        </h1>
        <div className="w-10" />
      </div>

      {/* Progress Indicator */}
      <div className="p-4">
        <div className="text-center text-sm text-[#3a210c] mb-2">
          Paso {currentStep} de 2
        </div>
        <div className="flex justify-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-[#ac815d]' : 'bg-gray-300'}`} />
          <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-[#ac815d]' : 'bg-gray-300'}`} />
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-4 pb-4">
        <Card className="border-[#ac815d] shadow-sm">
          <CardContent className="p-4 space-y-4">
            {currentStep === 1 ? (
              <>
                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Correo electrónico *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-base text-[#3a210c] border-[#ac815d] focus:ring-[#ac815d]"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Contraseña *</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="text-base text-[#3a210c] border-[#ac815d] focus:ring-[#ac815d] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Confirmar contraseña *</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="text-base text-[#3a210c] border-[#ac815d] focus:ring-[#ac815d] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Nombre completo *</Label>
                  <Input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className="text-base text-[#3a210c] border-[#ac815d] focus:ring-[#ac815d]"
                  />
                  {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Apellidos *</Label>
                  <Input
                    type="text"
                    value={formData.apellidos}
                    onChange={(e) => handleInputChange('apellidos', e.target.value)}
                    className="text-base text-[#3a210c] border-[#ac815d] focus:ring-[#ac815d]"
                  />
                  {errors.apellidos && <p className="text-red-500 text-xs">{errors.apellidos}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Nombre de la finca *</Label>
                  <Input
                    type="text"
                    value={formData.nombreFinca}
                    onChange={(e) => handleInputChange('nombreFinca', e.target.value)}
                    className="text-base text-[#3a210c] border-[#ac815d] focus:ring-[#ac815d]"
                  />
                  {errors.nombreFinca && <p className="text-red-500 text-xs">{errors.nombreFinca}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Departamento *</Label>
                  <Select onValueChange={(value) => handleInputChange('departamento', value)}>
                    <SelectTrigger className="border-[#ac815d] text-base">
                      <SelectValue placeholder="Selecciona tu departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Santa Cruz">Santa Cruz</SelectItem>
                      <SelectItem value="Beni">Beni</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.departamento && <p className="text-red-500 text-xs">{errors.departamento}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Propósito *</Label>
                  <Select onValueChange={(value) => handleInputChange('proposito', value)}>
                    <SelectTrigger className="border-[#ac815d] text-base">
                      <SelectValue placeholder="Selecciona el propósito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cría">Cría</SelectItem>
                      <SelectItem value="Engorde">Engorde</SelectItem>
                      <SelectItem value="Doble propósito">Doble propósito</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.proposito && <p className="text-red-500 text-xs">{errors.proposito}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#3a210c]">Superficie (ha) *</Label>
                  <Input
                    type="number"
                    value={formData.superficie}
                    onChange={(e) => handleInputChange('superficie', e.target.value)}
                    className="text-base text-[#3a210c] border-[#ac815d] focus:ring-[#ac815d]"
                  />
                  {errors.superficie && <p className="text-red-500 text-xs">{errors.superficie}</p>}
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-[#3a210c]">
                    Acepto Términos y condiciones *
                  </Label>
                </div>
                {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer Button */}
      <div className="p-4">
        <Button
          onClick={currentStep === 1 ? handleNext : handleCreateAccount}
          disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
          className="w-4/5 mx-auto block bg-[#ac815d] hover:bg-[#9a7354] text-white rounded-lg text-base py-3"
        >
          {currentStep === 1 ? 'Siguiente' : 'Crear cuenta'}
        </Button>
      </div>
    </div>
  );
};

export default RegistroWizard;
