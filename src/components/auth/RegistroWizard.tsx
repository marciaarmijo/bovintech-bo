
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import SuccessModal from '@/components/ui/SuccessModal';

interface RegistroWizardProps {
  onBack: () => void;
  onSuccess: () => void;
}

const RegistroWizard: React.FC<RegistroWizardProps> = ({ onBack, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { toast } = useToast();
  
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
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return { hasUpperCase, hasNumber };
  };

  const validateField = (field: string, value: string | boolean) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = 'El correo es obligatorio.';
        } else if (!validateEmail(value as string)) {
          newErrors.email = 'Introduce un correo electrónico válido.';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors.password = 'La contraseña es obligatoria.';
        } else if ((value as string).length < 8) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        } else {
          const { hasUpperCase, hasNumber } = validatePassword(value as string);
          if (!hasUpperCase || !hasNumber) {
            newErrors.password = 'Incluye al menos una letra mayúscula y un número.';
          } else {
            delete newErrors.password;
          }
        }
        break;
      
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Confirma tu contraseña.';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden.';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      
      case 'nombre':
        if (!value) {
          newErrors.nombre = 'Este campo es obligatorio.';
        } else {
          delete newErrors.nombre;
        }
        break;
      
      case 'apellidos':
        if (!value) {
          newErrors.apellidos = 'Este campo es obligatorio.';
        } else {
          delete newErrors.apellidos;
        }
        break;
      
      case 'nombreFinca':
        if (!value) {
          newErrors.nombreFinca = 'El nombre de la finca es obligatorio.';
        } else {
          delete newErrors.nombreFinca;
        }
        break;
      
      case 'departamento':
        if (!value) {
          newErrors.departamento = 'Selecciona un departamento.';
        } else {
          delete newErrors.departamento;
        }
        break;
      
      case 'proposito':
        if (!value) {
          newErrors.proposito = 'Selecciona un propósito.';
        } else {
          delete newErrors.proposito;
        }
        break;
      
      case 'superficie':
        if (!value) {
          newErrors.superficie = 'La superficie es obligatoria.';
        } else if (isNaN(Number(value))) {
          newErrors.superficie = 'Introduce un valor numérico.';
        } else {
          delete newErrors.superficie;
        }
        break;
      
      case 'acceptTerms':
        if (!value) {
          newErrors.acceptTerms = 'Debes aceptar los términos y condiciones.';
        } else {
          delete newErrors.acceptTerms;
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate if field has been touched
    if (touchedFields[field]) {
      validateField(field, value);
    }
    
    // Special case for confirm password - also validate when password changes
    if (field === 'password' && touchedFields.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateStep1 = () => {
    const fields = ['email', 'password', 'confirmPassword', 'nombre', 'apellidos'];
    let hasErrors = false;
    
    fields.forEach(field => {
      setTouchedFields(prev => ({ ...prev, [field]: true }));
      if (!validateField(field, formData[field as keyof typeof formData])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      toast({
        title: "Corrige los errores para continuar.",
        variant: "destructive",
      });
    }

    return !hasErrors;
  };

  const validateStep2 = () => {
    const fields = ['nombreFinca', 'departamento', 'proposito', 'superficie', 'acceptTerms'];
    let hasErrors = false;
    
    fields.forEach(field => {
      setTouchedFields(prev => ({ ...prev, [field]: true }));
      if (!validateField(field, formData[field as keyof typeof formData])) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      toast({
        title: "Corrige los errores para continuar.",
        variant: "destructive",
      });
    }

    return !hasErrors;
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
      setShowSuccessModal(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onSuccess();
  };

  const renderFieldError = (field: string) => {
    if (!errors[field]) return null;
    
    return (
      <p className="text-[#d9534f] text-xs mt-1 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        {errors[field]}
      </p>
    );
  };

  const getInputClassName = (field: string) => {
    return `text-base text-[#3a210c] border-[#ac815d] focus:ring-[#ac815d] ${
      errors[field] ? 'border-[#d9534f]' : ''
    }`;
  };

  return (
    <>
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
                    <div className="relative">
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={getInputClassName('email')}
                      />
                      {errors.email && (
                        <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
                      )}
                    </div>
                    {renderFieldError('email')}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#3a210c]">Contraseña *</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onBlur={() => handleBlur('password')}
                        className={`${getInputClassName('password')} pr-10`}
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
                      {errors.password && (
                        <AlertTriangle className="absolute right-10 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
                      )}
                    </div>
                    {renderFieldError('password')}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#3a210c]">Confirmar contraseña *</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        className={`${getInputClassName('confirmPassword')} pr-10`}
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
                      {errors.confirmPassword && (
                        <AlertTriangle className="absolute right-10 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
                      )}
                    </div>
                    {renderFieldError('confirmPassword')}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#3a210c]">Nombre completo *</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        onBlur={() => handleBlur('nombre')}
                        className={getInputClassName('nombre')}
                      />
                      {errors.nombre && (
                        <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
                      )}
                    </div>
                    {renderFieldError('nombre')}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#3a210c]">Apellidos *</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={formData.apellidos}
                        onChange={(e) => handleInputChange('apellidos', e.target.value)}
                        onBlur={() => handleBlur('apellidos')}
                        className={getInputClassName('apellidos')}
                      />
                      {errors.apellidos && (
                        <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
                      )}
                    </div>
                    {renderFieldError('apellidos')}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#3a210c]">Nombre de la finca *</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={formData.nombreFinca}
                        onChange={(e) => handleInputChange('nombreFinca', e.target.value)}
                        onBlur={() => handleBlur('nombreFinca')}
                        className={getInputClassName('nombreFinca')}
                      />
                      {errors.nombreFinca && (
                        <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
                      )}
                    </div>
                    {renderFieldError('nombreFinca')}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#3a210c]">Departamento *</Label>
                    <Select onValueChange={(value) => handleInputChange('departamento', value)}>
                      <SelectTrigger className={`border-[#ac815d] text-base ${errors.departamento ? 'border-[#d9534f]' : ''}`}>
                        <SelectValue placeholder="Selecciona tu departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Santa Cruz">Santa Cruz</SelectItem>
                        <SelectItem value="Beni">Beni</SelectItem>
                      </SelectContent>
                    </Select>
                    {renderFieldError('departamento')}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#3a210c]">Propósito *</Label>
                    <Select onValueChange={(value) => handleInputChange('proposito', value)}>
                      <SelectTrigger className={`border-[#ac815d] text-base ${errors.proposito ? 'border-[#d9534f]' : ''}`}>
                        <SelectValue placeholder="Selecciona el propósito" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cría">Cría</SelectItem>
                        <SelectItem value="Engorde">Engorde</SelectItem>
                        <SelectItem value="Doble propósito">Doble propósito</SelectItem>
                      </SelectContent>
                    </Select>
                    {renderFieldError('proposito')}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#3a210c]">Superficie (ha) *</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={formData.superficie}
                        onChange={(e) => handleInputChange('superficie', e.target.value)}
                        onBlur={() => handleBlur('superficie')}
                        className={getInputClassName('superficie')}
                      />
                      {errors.superficie && (
                        <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#d9534f]" />
                      )}
                    </div>
                    {renderFieldError('superficie')}
                  </div>

                  <div className="space-y-2">
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
                    {renderFieldError('acceptTerms')}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer Button */}
        <div className="p-4">
          <Button
            onClick={currentStep === 1 ? handleNext : handleCreateAccount}
            className="w-4/5 mx-auto block bg-[#ac815d] hover:bg-[#9a7354] text-white rounded-lg text-base py-3"
          >
            {currentStep === 1 ? 'Siguiente' : 'Crear cuenta'}
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="¡Éxito!"
        message="Cuenta creada con éxito."
        actionButtonText="Ir al inicio"
        onActionClick={handleSuccessModalClose}
      />
    </>
  );
};

export default RegistroWizard;
