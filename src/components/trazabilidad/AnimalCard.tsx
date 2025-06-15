
import React from "react";

interface Animal {
  id: string;
  lote: string;
  ubicacion: string;
  peso: string;
  departamento?: string;
  proveedor?: string;
  fechaIngreso?: string;
  pesoInicial?: number;
  sexo?: "Macho" | "Hembra";
}

const AnimalCard: React.FC<{ animal: Animal; onClick: () => void }> = ({ animal, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-white rounded-xl border border-[#ac815d] shadow flex items-center px-4 py-3 gap-4 hover:ring-2 hover:ring-[#ac815d] focus:outline-none transition"
    style={{ minHeight: 64 }}
  >
    {/* Avatar */}
    <div
      className="rounded-full border border-[#ac815d] w-12 h-12 flex items-center justify-center bg-[#f0cbad] text-[#ac815d] font-semibold text-xl"
      style={{ fontSize: 24 }}
    >
      {animal.id.slice(-2)}
    </div>
    {/* Datos */}
    <div className="flex-1 flex flex-col items-center">
      <div className="text-[18px] font-bold text-[#3a210c]">{animal.id}</div>
      <div className="text-xs text-[#ac815d]">{animal.lote}</div>
      <div className="text-xs text-[#3a210c]">{animal.ubicacion}</div>
    </div>
    {/* Peso */}
    <div className="text-xs text-[#3a210c] font-bold">{animal.peso}</div>
    <span className="ml-auto text-[#ac815d] text-xl">&gt;</span>
  </button>
);

export default AnimalCard;
