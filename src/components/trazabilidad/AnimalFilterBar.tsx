
import React from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface AnimalFilterBarProps {
  search: string;
  onSearch: (t: string) => void;
  procedencia: string;
  onProcedencia: (v: string) => void;
  peso: [number, number];
  onPeso: (v: [number, number]) => void;
  fecha: [Date | undefined, Date | undefined];
  onFecha: (d: [Date | undefined, Date | undefined]) => void;
  departamentos: string[];
  proveedores: string[];
}

export const AnimalFilterBar: React.FC<AnimalFilterBarProps> = ({
  search, onSearch, procedencia, onProcedencia, peso, onPeso, fecha, onFecha, departamentos, proveedores,
}) => {
  return (
    <div className="sticky top-14 z-20 w-full p-2 pb-1 bg-[#f0cbad] rounded-lg shadow-sm flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          placeholder="Buscar ID o lote…"
          aria-label="Buscar por ID o lote"
          className="flex-1 text-[#3a210c] placeholder:text-[#ac815d]"
          value={search}
          onChange={e => onSearch(e.target.value)}
          style={{ fontSize: 16 }}
        />
        <Button variant="ghost" size="sm" className="bg-white font-normal border border-[#ac815d]" style={{ color: "#ac815d" }}>
          Filtrar
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-[#3a210c] text-sm font-semibold">Procedencia</label>
        <select className="rounded border border-[#ac815d] text-[#3a210c] px-2 py-1" value={procedencia}
          onChange={e => onProcedencia(e.target.value)} aria-label="Procedencia">
          <option value="">Todos</option>
          {departamentos.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <label className="text-[#3a210c] text-sm font-semibold">Peso inicial</label>
        <Slider className="flex-1" min={100} max={700} step={10} value={peso as number[]} onValueChange={v => onPeso([v[0], v[1]])} />
        <span className="ml-2 text-[#3a210c] text-xs">{peso[0]} kg – {peso[1]} kg</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-[#3a210c] text-sm font-semibold">Fecha ingreso/compra</label>
        {/* mini rango, usa solo dos date inputs */}
        <input type="date" value={fecha[0]?.toISOString().slice(0,10) || ""} onChange={e => onFecha([e.target.value ? new Date(e.target.value) : undefined, fecha[1]])} className="rounded border border-[#ac815d] px-2 py-1 text-sm" />
        <span className="mx-1">–</span>
        <input type="date" value={fecha[1]?.toISOString().slice(0,10) || ""} onChange={e => onFecha([fecha[0], e.target.value ? new Date(e.target.value) : undefined])} className="rounded border border-[#ac815d] px-2 py-1 text-sm" />
      </div>
    </div>
  );
}
