
import React from "react";
import { Input } from "@/components/ui/input";

interface Props {
  value: {
    departamento: string;
    proveedor: string;
    pesoMin: number;
    pesoMax: number;
    fechaIngresoIni: string;
    fechaIngresoFin: string;
  };
  onChange: (f: Props["value"]) => void;
}

const departamentos = ["", "La Paz", "Cochabamba", "Santa Cruz", "Oruro", "Potosí", "Tarija", "Beni", "Pando", "Chuquisaca"];

const AnimalFilters: React.FC<Props> = ({ value, onChange }) => (
  <div className="bg-[#ffffff] rounded-lg shadow flex flex-wrap px-3 py-3 gap-4 border border-[#f0cbad] items-center">
    {/* Departamento */}
    <div>
      <label className="block text-[14px] text-[#3a210c] mb-1">Departamento</label>
      <select
        className="border border-[#ac815d] rounded px-2 py-1 text-[16px] text-[#3a210c] bg-[#f0cbad]"
        value={value.departamento}
        onChange={e => onChange({ ...value, departamento: e.target.value })}
      >
        {departamentos.map(dep => (
          <option key={dep} value={dep}>{dep || "Todos"}</option>
        ))}
      </select>
    </div>
    {/* Proveedor */}
    <div>
      <label className="block text-[14px] text-[#3a210c] mb-1">Proveedor</label>
      <Input
        className="border border-[#ac815d] rounded px-2 py-1 text-[16px] text-[#3a210c] bg-[#f0cbad] w-36"
        value={value.proveedor}
        onChange={e => onChange({ ...value, proveedor: e.target.value })}
        placeholder="Proveedor"
        style={{maxWidth: 150}}
      />
    </div>
    {/* Peso inicial range */}
    <div>
      <label className="block text-[14px] text-[#3a210c] mb-1">Peso inicial (kg)</label>
      <input
        type="range"
        min={200}
        max={750}
        step={10}
        value={value.pesoMin}
        onChange={e => onChange({ ...value, pesoMin: Number(e.target.value) })}
        className="accent-[#ac815d] w-28"
        style={{maxWidth: 130}}
      />
      <span className="text-xs ml-2">{value.pesoMin}</span>
      <input
        type="range"
        min={200}
        max={750}
        step={10}
        value={value.pesoMax}
        onChange={e => onChange({ ...value, pesoMax: Number(e.target.value) })}
        className="accent-[#ac815d] w-28"
        style={{maxWidth: 130}}
      />
      <span className="text-xs ml-2">{value.pesoMax}</span>
    </div>
    {/* Fecha ingreso/compra */}
    <div>
      <label className="block text-[14px] text-[#3a210c] mb-1">Fecha ingreso</label>
      <input
        type="date"
        className="border border-[#ac815d] rounded px-2 py-1 text-[16px] text-[#3a210c] bg-[#f0cbad]"
        value={value.fechaIngresoIni}
        onChange={e => onChange({ ...value, fechaIngresoIni: e.target.value })}
      />
      <span className="mx-1 text-[#3a210c]">-</span>
      <input
        type="date"
        className="border border-[#ac815d] rounded px-2 py-1 text-[16px] text-[#3a210c] bg-[#f0cbad]"
        value={value.fechaIngresoFin}
        onChange={e => onChange({ ...value, fechaIngresoFin: e.target.value })}
      />
    </div>
  </div>
);

export default AnimalFilters;
