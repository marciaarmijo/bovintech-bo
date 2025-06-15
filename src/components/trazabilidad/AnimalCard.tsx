
import React from "react";

interface Animal {
  id: string;
  lote: string;
  departamento: string;
  proveedor: string;
  fechaIngreso: string;
  pesoInicial: number;
  sexo: 'Macho' | 'Hembra';
}

const AnimalCard: React.FC<{ animal: Animal; onClick: () => void }> = ({ animal, onClick }) => (
  <button
    className="w-full bg-white rounded-lg border border-[#ac815d] shadow flex items-center px-4 py-3 gap-4 hover:ring-2 hover:ring-[#ac815d] focus:outline-none transition"
    style={{ minHeight: 64 }}
    onClick={onClick}
  >
    {/* Avatar círculo */}
    <div
      className="rounded-full border border-[#ac815d] w-12 h-12 flex items-center justify-center bg-[#f0cbad] text-[#ac815d] font-semibold text-xl"
      style={{ fontSize: 24 }}
    >
      {animal.id.slice(-2)}
    </div>
    {/* Código / ID */}
    <div className="flex-1 flex flex-col items-center">
      <div className="text-[18px] font-bold text-[#3a210c]">{animal.id}</div>
      <div className="text-xs text-[#ac815d]">{animal.lote}</div>
    </div>
    {/* Arrow */}
    <span className="ml-auto text-[#ac815d]">&gt;</span>
  </button>
);

export default AnimalCard;
