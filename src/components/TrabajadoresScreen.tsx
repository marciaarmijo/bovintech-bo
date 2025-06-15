
import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, MoreVertical, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface TrabajadoresScreenProps {
  onBack: () => void;
}

const TrabajadoresScreen = ({ onBack }: TrabajadoresScreenProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerEmail, setNewWorkerEmail] = useState('');
  const [sendInvitation, setSendInvitation] = useState(true);

  const workers = [
    {
      id: 1,
      name: 'Carlos Rodríguez',
      email: 'carlos@finca.com',
      initials: 'CR',
      status: 'active'
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria@finca.com',
      initials: 'MG',
      status: 'pending'
    },
    {
      id: 3,
      name: 'José Martínez',
      email: 'jose@finca.com',
      initials: 'JM',
      status: 'active'
    },
    {
      id: 4,
      name: 'Ana López',
      email: 'ana@finca.com',
      initials: 'AL',
      status: 'active'
    },
    {
      id: 5,
      name: 'Pedro Sánchez',
      email: 'pedro@finca.com',
      initials: 'PS',
      status: 'pending'
    }
  ];

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteWorker = () => {
    if (!newWorkerName || !newWorkerEmail) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitación enviada",
      description: `Invitación enviada a ${newWorkerEmail}`,
    });

    setIsInviteDialogOpen(false);
    setNewWorkerName('');
    setNewWorkerEmail('');
    setSendInvitation(true);
  };

  const handleResendInvitation = (email: string) => {
    toast({
      title: "Invitación reenviada",
      description: `Invitación reenviada a ${email}`,
    });
  };

  const handleDeleteWorker = (name: string) => {
    toast({
      title: "Trabajador eliminado",
      description: `${name} ha sido eliminado de la finca`,
      variant: "destructive",
    });
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
          <Button variant="ghost" size="icon" className="text-[#3a210c]">
            <Search className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="p-4">
        {/* Search bar */}
        <div className="mb-6">
          <Input
            placeholder="Buscar trabajadores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Workers list */}
        <div className="space-y-3 mb-20">
          {filteredWorkers.map((worker) => (
            <Card key={worker.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#ac815d] text-white">
                        {worker.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-[#3a210c]">{worker.name}</h3>
                      <p className="text-sm text-gray-600">{worker.email}</p>
                      {worker.status === 'pending' && (
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {worker.status === 'pending' && (
                        <DropdownMenuItem onClick={() => handleResendInvitation(worker.email)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Reenviar invitación
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDeleteWorker(worker.name)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAB - Invitar trabajador */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#ac815d] hover:bg-[#8d6b47] text-white shadow-lg"
            size="icon"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#3a210c]">Invitar trabajador</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="workerName">Nombre *</Label>
              <Input
                id="workerName"
                placeholder="Nombre completo"
                value={newWorkerName}
                onChange={(e) => setNewWorkerName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="workerEmail">Email *</Label>
              <Input
                id="workerEmail"
                type="email"
                placeholder="correo@ejemplo.com"
                value={newWorkerEmail}
                onChange={(e) => setNewWorkerEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendInvitation"
                checked={sendInvitation}
                onCheckedChange={setSendInvitation}
              />
              <Label htmlFor="sendInvitation" className="text-sm">
                Enviar invitación por email
              </Label>
            </div>
            <Button 
              onClick={handleInviteWorker}
              className="w-full bg-[#ac815d] hover:bg-[#8d6b47] text-white"
            >
              Invitar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrabajadoresScreen;
