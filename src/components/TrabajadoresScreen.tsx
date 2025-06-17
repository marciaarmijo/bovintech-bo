
import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface TrabajadoresScreenProps {
  onBack: () => void;
}

const TrabajadoresScreen = ({ onBack }: TrabajadoresScreenProps) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    enviarInvitacion: true
  });
  const { toast } = useToast();

  // Generate random avatar based on gender
  const getRandomAvatar = (gender: 'male' | 'female') => {
    const maleAvatars = [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    ];
    
    const femaleAvatars = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    ];
    
    const avatars = gender === 'male' ? maleAvatars : femaleAvatars;
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  const trabajadores = [
    { 
      id: 1, 
      nombre: 'Juan Pérez', 
      email: 'juan@finca.com', 
      iniciales: 'JP',
      gender: 'male' as const,
      avatar: getRandomAvatar('male')
    },
    { 
      id: 2, 
      nombre: 'María García', 
      email: 'maria@finca.com', 
      iniciales: 'MG',
      gender: 'female' as const,
      avatar: getRandomAvatar('female')
    },
    { 
      id: 3, 
      nombre: 'Carlos López', 
      email: 'carlos@finca.com', 
      iniciales: 'CL',
      gender: 'male' as const,
      avatar: getRandomAvatar('male')
    },
    { 
      id: 4, 
      nombre: 'Ana Martínez', 
      email: 'ana@finca.com', 
      iniciales: 'AM',
      gender: 'female' as const,
      avatar: getRandomAvatar('female')
    }
  ];

  const filteredTrabajadores = trabajadores.filter(t => 
    t.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = () => {
    if (!formData.nombre.trim() || !formData.email.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invitación enviada",
      description: `Invitación enviada a ${formData.email}`,
    });

    setFormData({ nombre: '', email: '', enviarInvitacion: true });
    setShowInviteForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-6 w-6 text-[#3a210c]" />
            </Button>
            <h1 className="text-xl font-semibold text-[#3a210c]">Trabajadores</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6 text-[#3a210c]" />
          </Button>
        </div>
      </header>

      {/* Search */}
      <div className="p-4">
        <Input
          placeholder="Buscar trabajadores..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Workers List */}
      <div className="px-4 space-y-3">
        {filteredTrabajadores.map(trabajador => (
          <Card key={trabajador.id} className="border-l-4 border-l-[#ac815d]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={trabajador.avatar} 
                      alt={trabajador.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className = 'w-12 h-12 bg-[#ac815d] rounded-full flex items-center justify-center';
                          parent.innerHTML = `<span class="text-white font-medium">${trabajador.iniciales}</span>`;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#3a210c]">{trabajador.nombre}</h4>
                    <p className="text-sm text-gray-600">{trabajador.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6">
        <Sheet open={showInviteForm} onOpenChange={setShowInviteForm}>
          <SheetTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full bg-[#ac815d] hover:bg-[#3a210c] text-white fab-shadow"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh]">
            <SheetHeader>
              <SheetTitle className="text-[#3a210c]">Invitar trabajador</SheetTitle>
            </SheetHeader>
            
            <div className="p-4 space-y-4">
              <div>
                <Label className="text-[#3a210c]">Nombre *</Label>
                <Input 
                  placeholder="Nombre completo"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="mt-1" 
                />
              </div>

              <div>
                <Label className="text-[#3a210c]">Email *</Label>
                <Input 
                  type="email"
                  placeholder="email@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1" 
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="enviar"
                  checked={formData.enviarInvitacion}
                  onCheckedChange={(checked) => setFormData({...formData, enviarInvitacion: checked === true})}
                />
                <Label htmlFor="enviar" className="text-[#3a210c]">Enviar invitación</Label>
              </div>

              <Button 
                onClick={handleInvite}
                className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white"
              >
                Invitar
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TrabajadoresScreen;
