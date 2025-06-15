
import { toast } from "@/hooks/use-toast";

export const toastES = {
  animalCreado: () =>
    toast({ title: "Animal creado", description: "El animal fue registrado correctamente." }),
  importacionCompletada: (n: number) =>
    toast({ title: "Importación completada", description: `Se importaron ${n} animales correctamente.` }),
};
