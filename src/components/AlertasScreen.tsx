
import React, { useState } from 'react';
import { ArrowLeft, Plus, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface AlertasScreenProps {
  onBack: () => void;
}

const AlertasScreen = ({ onBack }: AlertasScreenProps) => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAlertName, setNewAlertName] = useState('');
  const [newAlertCondition, setNewAlertCondition] = useState('');
  const [newAlertUrgency, setNewAlertUrgency] = useState('');

  const alerts = [
    {
      id: 1,
      title: 'Animal 00993 sin pesaje',
      subtitle: 'Hace 2 días • Sin pesaje por 60 días',
      isRead: false,
      urgency: 'alto'
    },
    {
      id: 2,
      title: 'Vacunación pendiente',
      subtitle: 'Hace 5 horas • Lote A - 15 animales',
      isRead: false,
      urgency: 'medio'
    },
    {
      id: 3,
      title: 'Peso bajo promedio',
      subtitle: 'Hace 1 día • Animal 00875',
      isRead: true,
      urgency: 'bajo'
    },
    {
      id: 4,
      title: 'Revisión sanitaria vencida',
      subtitle: 'Hace 3 días • Lote B - 8 animales',
      isRead: false,
      urgency: 'alto'
    },
    {
      id: 5,
      title: 'Tratamiento completado',
      subtitle: 'Hace 1 semana • Animal 00654',
      isRead: true,
      urgency: 'bajo'
    }
  ];

  const urgencyColors = {
    alto: 'text-red-600 bg-red-50',
    medio: 'text-yellow-600 bg-yellow-50',
    bajo: 'text-green-600 bg-green-50'
  };

  const handleCreateAlert = () => {
    if (!newAlertName || !newAlertCondition || !newAlertUrgency) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Alerta creada",
      description: `La alerta "${newAlertName}" se ha configurado correctamente`,
    });

    setIsCreateDialogOpen(false);
    setNewAlertName('');
    setNewAlertCondition('');
    setNewAlertUrgency('');
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
            <h1 className="text-xl font-semibold text-[#3a210c]">Alertas inteligentes</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="notifications" className="text-sm text-[#3a210c]">
              Push
            </Label>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Lista de alertas */}
        <div className="space-y-3 mb-20">
          {alerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`border border-[#ac815d] ${alert.isRead ? 'opacity-60' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <img 
                    src="/lovable-uploads/b4215cfb-75b3-40f1-a0a9-986cd912f86d.png" 
                    alt="Alerta" 
                    className="w-8 h-8 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-medium ${alert.isRead ? 'text-gray-600' : 'text-[#3a210c]'}`}>
                          {alert.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{alert.subtitle}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[alert.urgency as keyof typeof urgencyColors]}`}>
                          {alert.urgency}
                        </span>
                        {alert.isRead && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAB - Crear alerta */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
            <DialogTitle className="text-[#3a210c]">Crear alerta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="alertName">Nombre de la alerta</Label>
              <Input
                id="alertName"
                placeholder="Ej: Sin pesaje prolongado"
                value={newAlertName}
                onChange={(e) => setNewAlertName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="alertCondition">Condición</Label>
              <Select value={newAlertCondition} onValueChange={setNewAlertCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una condición" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sin_pesaje_60">Sin pesaje por 60 días</SelectItem>
                  <SelectItem value="sin_pesaje_30">Sin pesaje por 30 días</SelectItem>
                  <SelectItem value="vacuna_vencida">Vacuna vencida</SelectItem>
                  <SelectItem value="peso_bajo">Peso por debajo del promedio</SelectItem>
                  <SelectItem value="tratamiento_pendiente">Tratamiento pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alertUrgency">Nivel de urgencia</Label>
              <Select value={newAlertUrgency} onValueChange={setNewAlertUrgency}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bajo">Bajo</SelectItem>
                  <SelectItem value="medio">Medio</SelectItem>
                  <SelectItem value="alto">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleCreateAlert}
              className="w-full bg-[#ac815d] hover:bg-[#8d6b47] text-white"
            >
              Guardar alerta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlertasScreen;
