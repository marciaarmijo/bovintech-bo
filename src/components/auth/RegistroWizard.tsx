
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface RegistroWizardProps {
  onBack: () => void;
  onComplete: (userData: any) => void;
}

const RegistroWizard: React.FC<RegistroWizardProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Paso 1 - Datos personales
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellidos: '',
    
    // Paso 2 - Datos de la finca
    nombreFinca: '',
    departamento: '',
    ciudadProvincia: '',
    proposito: 'Cría',
    superficie: '',
    
    // Términos
    acceptTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const departamentos = ['Santa Cruz', 'Beni'];
  const propositos = ['Cría', 'Engorde', 'Doble propósito'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) newErrors.email = 'Email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    
    if (!formData.password.trim()) newErrors.password = 'Contraseña es obligatoria';
    else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Confirmar contraseña es obligatorio';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre es obligatorio';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Apellidos es obligatorio';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombreFinca.trim()) newErrors.nombreFinca = 'Nombre de finca es obligatorio';
    if (!formData.departamento) newErrors.departamento = 'Departamento es obligatorio';
    if (!formData.superficie.trim()) newErrors.superficie = 'Superficie es obligatoria';
    else if (isNaN(Number(formData.superficie)) || Number(formData.superficie) <= 0) {
      newErrors.superficie = 'Superficie debe ser un número válido';
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Debe aceptar los términos y condiciones';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      onComplete(formData);
    }
  };

  const isStep1Valid = formData.email && formData.password && formData.confirmPassword && 
                      formData.nombre && formData.apellidos && 
                      formData.password === formData.confirmPassword &&
                      formData.password.length >= 6 &&
                      /\S+@\S+\.\S+/.test(formData.email);

  const isStep2Valid = formData.nombreFinca && formData.departamento && 
                       formData.superficie && Number(formData.superficie) > 0 && 
                       formData.acceptTerms;

  return (
    <div className="min-h-screen bg-[#3a210c] flex flex-col">
      {/* Header */}
      <header className="bg-[#3a210c] px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={step === 1 ? onBack : () => setStep(1)} className="text-white hover:bg-white/10">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Crear cuenta</h1>
          </div>
        </div>
      </header>

      {/* Progress indicator */}
      <div className="bg-white px-4 py-3">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#ac815d]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'border-[#ac815d] bg-[#ac815d] text-white' : 'border-gray-300'
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className="text-sm font-medium">Datos personales</span>
          </div>
          <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-[#ac815d]' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#ac815d]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'border-[#ac815d] bg-[#ac815d] text-white' : 'border-gray-300'
            }`}>
              2
            </div>
            <span className="text-sm font-medium">Datos de la finca</span>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 bg-gray-50 p-4">
        {step === 1 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#3a210c] mb-4">Datos personales</h2>
            
            <div>
              <Label className="text-[#3a210c]">Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div>
              <Label className="text-[#3a210c]">Contraseña *</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
                placeholder="Mínimo 6 caracteres"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            <div>
              <Label className="text-[#3a210c]">Confirmar contraseña *</Label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={errors.confirmPassword ? 'border-red-500' : ''}
                placeholder="Repite tu contraseña"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>

            <div>
              <Label className="text-[#3a210c]">Nombre *</Label>
              <Input
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className={errors.nombre ? 'border-red-500' : ''}
                placeholder="Tu nombre"
              />
              {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}
            </div>

            <div>
              <Label className="text-[#3a210c]">Apellidos *</Label>
              <Input
                value={formData.apellidos}
                onChange={(e) => handleInputChange('apellidos', e.target.value)}
                className={errors.apellidos ? 'border-red-500' : ''}
                placeholder="Tus apellidos"
              />
              {errors.apellidos && <span className="text-red-500 text-sm">{errors.apellidos}</span>}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white mt-6"
            >
              Siguiente
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#3a210c] mb-4">Datos de la finca</h2>
            
            <div>
              <Label className="text-[#3a210c]">Nombre de finca *</Label>
              <Input
                value={formData.nombreFinca}
                onChange={(e) => handleInputChange('nombreFinca', e.target.value)}
                className={errors.nombreFinca ? 'border-red-500' : ''}
                placeholder="Nombre de tu finca"
              />
              {errors.nombreFinca && <span className="text-red-500 text-sm">{errors.nombreFinca}</span>}
            </div>

            <div>
              <Label className="text-[#3a210c]">Departamento *</Label>
              <select
                value={formData.departamento}
                onChange={(e) => handleInputChange('departamento', e.target.value)}
                className={`w-full mt-1 p-2 border rounded-md ${errors.departamento ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Seleccionar departamento</option>
                {departamentos.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
              {errors.departamento && <span className="text-red-500 text-sm">{errors.departamento}</span>}
            </div>

            <div>
              <Label className="text-[#3a210c]">Ciudad o Provincia</Label>
              <Input
                value={formData.ciudadProvincia}
                onChange={(e) => handleInputChange('ciudadProvincia', e.target.value)}
                placeholder="Ciudad o provincia (opcional)"
              />
            </div>

            <div>
              <Label className="text-[#3a210c]">Propósito</Label>
              <select
                value={formData.proposito}
                onChange={(e) => handleInputChange('proposito', e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                {propositos.map(prop => (
                  <option key={prop} value={prop}>{prop}</option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-[#3a210c]">Superficie (ha) *</Label>
              <Input
                type="number"
                value={formData.superficie}
                onChange={(e) => handleInputChange('superficie', e.target.value)}
                className={errors.superficie ? 'border-red-500' : ''}
                placeholder="Hectáreas"
              />
              {errors.superficie && <span className="text-red-500 text-sm">{errors.superficie}</span>}
            </div>

            <div className="flex items-start space-x-2 mt-6">
              <Checkbox
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                className={errors.acceptTerms ? 'border-red-500' : ''}
              />
              <div className="flex-1">
                <label className="text-sm text-[#3a210c]">
                  Acepto los{' '}
                  <button className="text-[#ac815d] underline">Términos y condiciones</button>
                </label>
                {errors.acceptTerms && <div className="text-red-500 text-sm mt-1">{errors.acceptTerms}</div>}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isStep2Valid}
              className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white mt-6"
            >
              Crear cuenta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroWizard;
