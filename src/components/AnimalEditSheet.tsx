
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Animal {
  id: string;
  lote: string;
  ubicacion: string;
  peso: string;
}

interface Props {
  open: boolean;
  animal: Animal | null;
  onSave: (animal: Animal) => void;
  onClose: () => void;
}

const ubicaciones = [
  "Potrero Norte",
  "Potrero Sur",
  "Potrero Este",
  "Corral Central",
];

const AnimalEditSheet = ({ open, animal, onSave, onClose }: Props) => {
  const [form, setForm] = useState<Animal>(
    animal || { id: "", lote: "", ubicacion: ubicaciones[0], peso: "" }
  );
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (animal) setForm(animal);
  }, [animal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!form.id || !form.lote || !form.ubicacion || !form.peso) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError(null);
    onSave(form);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[65vh]">
        <SheetHeader>
          <SheetTitle className="text-[#3a210c]">Editar Animal</SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-5">
          <div>
            <Label>ID Animal</Label>
            <Input name="id" value={form.id} onChange={handleChange} maxLength={12} disabled className="bg-gray-100"/>
          </div>
          <div>
            <Label>Lote</Label>
            <Input name="lote" value={form.lote} onChange={handleChange} maxLength={15} />
          </div>
          <div>
            <Label>Ubicación</Label>
            <select
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              {ubicaciones.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Peso</Label>
            <Input name="peso" value={form.peso} onChange={handleChange} maxLength={8} />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white" onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AnimalEditSheet;
