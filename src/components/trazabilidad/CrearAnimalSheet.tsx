
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (animal: any) => void;
  lotes: string[];
}

const departamentos = ["La Paz", "Cochabamba", "Santa Cruz", "Oruro", "Potosí", "Tarija", "Beni", "Pando", "Chuquisaca"];

const CrearAnimalSheet: React.FC<Props> = ({ open, onClose, onCreate, lotes }) => {
  const [form, setForm] = useState({
    foto: "",
    sexo: "Macho",
    id: "",
    lote: lotes[0] || "",
    fechaIngreso: "",
    pesoCompra: "",
    fechaCompra: "",
    precioCompra: "",
    departamento: departamentos[0] || "",
    proveedor: "",
    observaciones: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSexo = (sexo: string) => setForm({ ...form, sexo });

  const handleSubmit = () => {
    if (!form.id || !form.lote || !form.fechaIngreso || !form.pesoCompra || !form.departamento) {
      setError("Completa los campos obligatorios.");
      return;
    }
    setError(null);
    onCreate(form);
    setForm({
      foto: "",
      sexo: "Macho",
      id: "",
      lote: lotes[0] || "",
      fechaIngreso: "",
      pesoCompra: "",
      fechaCompra: "",
      precioCompra: "",
      departamento: departamentos[0] || "",
      proveedor: "",
      observaciones: "",
    });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] max-w-full overflow-y-auto rounded-t-2xl" style={{background:'#fff'}}>
        <SheetHeader>
          <SheetTitle className="text-[#3a210c] flex items-center space-x-2"><span>Crear animal</span></SheetTitle>
        </SheetHeader>
        <form className="flex flex-col gap-4 mt-4 px-1">
          {/* Foto */}
          <div className="flex items-center justify-center">
            <button type="button" className="w-20 h-20 rounded-full border border-[#ac815d] flex items-center justify-center text-[#ac815d] bg-[#f0cbad]" tabIndex={-1}>
              <Camera className="w-8 h-8" />
            </button>
          </div>
          {/* Sexo */}
          <div className="flex gap-2 justify-center mb-2">
            <Button
              type="button"
              onClick={() => handleSexo("Macho")}
              className={`rounded-full px-4 py-1 font-bold text-base ${form.sexo === "Macho" ? "bg-[#ac815d] text-white" : "bg-[#f0cbad] text-[#3a210c]"}`}
            >
              Macho
            </Button>
            <Button
              type="button"
              onClick={() => handleSexo("Hembra")}
              className={`rounded-full px-4 py-1 font-bold text-base ${form.sexo === "Hembra" ? "bg-[#ac815d] text-white" : "bg-[#f0cbad] text-[#3a210c]"}`}
            >
              Hembra
            </Button>
          </div>
          {/* Campos */}
          <div className="bg-[#fff] rounded-xl border border-[#ac815d] shadow px-4 py-4 flex flex-col gap-4">
            <div>
              <Label className="text-[#3a210c]">Código ID*</Label>
              <Input name="id" value={form.id} onChange={handleChange} maxLength={12} />
            </div>
            <div>
              <Label className="text-[#3a210c]">Lote*</Label>
              <select name="lote" value={form.lote} onChange={handleChange} className="w-full px-2 py-2 rounded border border-[#ac815d] text-[#3a210c]">
                {lotes.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <Label className="text-[#3a210c]">Fecha de ingreso*</Label>
              <Input type="date" name="fechaIngreso" value={form.fechaIngreso} onChange={handleChange} />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="text-[#3a210c]">Peso compra*</Label>
                <Input name="pesoCompra" value={form.pesoCompra} onChange={handleChange} type="number" min={0} max={999} />
              </div>
              <div className="flex-1">
                <Label className="text-[#3a210c]">Fecha compra</Label>
                <Input type="date" name="fechaCompra" value={form.fechaCompra} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label className="text-[#3a210c]">Precio compra (Bs.)</Label>
              <Input name="precioCompra" value={form.precioCompra} onChange={handleChange} type="number" min={0} max={999999} />
            </div>
            <div>
              <Label className="text-[#3a210c]">Departamento*</Label>
              <select name="departamento" value={form.departamento} onChange={handleChange} className="w-full px-2 py-2 rounded border border-[#ac815d] text-[#3a210c]">
                {departamentos.map(dep => <option key={dep} value={dep}>{dep}</option>)}
              </select>
            </div>
            <div>
              <Label className="text-[#3a210c]">Proveedor</Label>
              <Input name="proveedor" value={form.proveedor} onChange={handleChange} />
            </div>
            <div>
              <Label className="text-[#3a210c]">Observaciones</Label>
              <textarea name="observaciones" value={form.observaciones} onChange={handleChange} rows={2} className="w-full px-2 py-2 rounded border border-[#ac815d] text-[#3a210c] bg-[#f0cbad]" />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm font-bold mt-2">{error}</div>}
          <Button type="button" className="fixed bottom-4 left-4 right-4 bg-[#ac815d] text-white text-lg font-bold py-3 rounded-xl" onClick={handleSubmit}>
            Crear animal
          </Button>
        </form>
        <div className="mb-24" />
      </SheetContent>
    </Sheet>
  );
};

export default CrearAnimalSheet;
