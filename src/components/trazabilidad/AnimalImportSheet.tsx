
import React, { useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Import } from "lucide-react";

// Parse CSV simple
function parseCSV(text: string) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  return lines.map(line => {
    const [id, lote, ubicacion, peso] = line.split(",");
    return { id: id?.trim()||"", lote: lote?.trim()||"", ubicacion: ubicacion?.trim()||"", peso: peso?.trim()||"" };
  }).filter(a => a.id && a.lote && a.ubicacion && a.peso);
}

interface Props {
  open: boolean;
  onClose: () => void;
  onImport: (animales: any[]) => void;
}

const AnimalImportSheet = ({ open, onClose, onImport }: Props) => {
  const [animals, setAnimals] = useState<Array<{id:string, lote:string, ubicacion:string, peso:string}>>([]);
  const [error, setError] = useState<string|null>(null);
  const [step, setStep] = useState<"idle"|"preview">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target?.result as string;
        const parsed = parseCSV(content);
        if (parsed.length===0) {
          setError("No se encontraron datos válidos (CSV: id,lote,ubicacion,peso)");
          return;
        }
        setAnimals(parsed);
        setError(null);
        setStep("preview");
      };
      reader.readAsText(file);
    }
  };

  const handleImport = () => {
    if (animals.length === 0) return;
    onImport(animals);
    setAnimals([]);
    setStep("idle");
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[70vh]">
        <SheetHeader>
          <SheetTitle className="text-[#3a210c] flex items-center gap-2">
            <Import className="inline mr-2" /> Importar animales desde Excel/CSV
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          {step === "idle" && (
            <>
              <Label className="block mb-2">Selecciona un archivo (CSV: <code>id,lote,ubicacion,peso</code> por línea):</Label>
              <Input type="file" accept=".csv,text/csv,text/plain" ref={fileRef} onChange={handleFile} />
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </>
          )}
          {step === "preview" && (
            <>
              <div className="mb-2 text-sm text-gray-500">Animales a importar: <b>{animals.length}</b></div>
              <div className="max-h-56 overflow-auto border rounded shadow">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="border-b p-1">ID</th>
                      <th className="border-b p-1">Lote</th>
                      <th className="border-b p-1">Ubicación</th>
                      <th className="border-b p-1">Peso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {animals.map(a => (
                      <tr key={a.id} className="even:bg-gray-100">
                        <td className="p-1">{a.id}</td>
                        <td className="p-1">{a.lote}</td>
                        <td className="p-1">{a.ubicacion}</td>
                        <td className="p-1">{a.peso}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button className="w-full bg-[#ac815d] hover:bg-[#3a210c] text-white mt-2" onClick={handleImport}>
                Importar animales
              </Button>
              <Button variant="outline" className="w-full mt-1" onClick={() => { setStep("idle"); setAnimals([]); }}>
                Cancelar
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AnimalImportSheet;
