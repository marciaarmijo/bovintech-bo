
import React from 'react';
import { ArrowLeft, Mail, Globe, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BovinTechScreenProps {
  onBack: () => void;
}

const BovinTechScreen = ({ onBack }: BovinTechScreenProps) => {
  const handleWhatsAppSupport = () => {
    window.open('https://wa.me/59170012345', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDF8F4]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#3a210c]">Acerca de BovinTech</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* BovinTech Logo Header - Centered with proper spacing */}
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/308ded64-f048-4a9c-bc82-a5c74db64321.png" 
            alt="BovinTech Logo" 
            className="w-20 h-auto"
          />
        </div>

        {/* Nuestra misión */}
        <Card className="bg-white border border-[#ac815d] rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#3a210c] text-lg">Nuestra misión</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-[#3a210c] text-sm leading-relaxed">
              Nuestra misión es empoderar a los ganaderos medianos de Bolivia con una tecnología digital accesible e intuitiva que integre el registro de peso, salud y alimentación, que funcione sin conexión y garantice trazabilidad. Buscamos cerrar la brecha digital del campo, acompañando al productor en la transición de métodos tradicionales a una gestión basada en datos, para elevar su productividad, competitividad y mejorar sus ingresos.
            </p>
          </CardContent>
        </Card>

        {/* Nuestra visión */}
        <Card className="bg-white border border-[#ac815d] rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#3a210c] text-lg">Nuestra visión</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-[#3a210c] text-sm leading-relaxed">
              Nuestra visión es liderar la transformación digital de la ganadería mediana en Bolivia, brindando soluciones tecnológicas que optimicen la gestión de hatos, aumenten la rentabilidad y faciliten el acceso a mercados de alto estándar.
            </p>
          </CardContent>
        </Card>

        {/* Contacto & Soporte */}
        <Card className="bg-white border border-[#ac815d] rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-[#3a210c] text-lg">Contacto & Soporte</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#ac815d]" />
                <div>
                  <p className="text-sm font-medium text-[#3a210c]">Email</p>
                  <p className="text-sm text-gray-600">soporte@bovintech.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-[#ac815d]" />
                <div>
                  <p className="text-sm font-medium text-[#3a210c]">Web</p>
                  <p className="text-sm text-gray-600">www.bovintech.com.bo</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#ac815d]" />
                <div>
                  <p className="text-sm font-medium text-[#3a210c]">Teléfono</p>
                  <p className="text-sm text-gray-600">+591 700-12345</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleWhatsAppSupport}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium"
            >
              Soporte WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BovinTechScreen;
