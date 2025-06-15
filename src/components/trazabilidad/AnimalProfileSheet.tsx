
import React from 'react';

interface Props {
  open: boolean;
  animal: any;
  onClose: () => void;
}

const AnimalProfileSheet: React.FC<Props> = ({ open, animal, onClose }) => {
  if (!open || !animal) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-end">
      <div className="w-full bg-white rounded-t-xl shadow-lg p-6 max-h-[90vh] animate-fade-in overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button className="text-[#3a210c] text-lg px-2" onClick={onClose} aria-label="Volver">
            ←
          </button>
          <span className="text-[18px] font-semibold text-[#3a210c]">ID {animal.id}</span>
          <button className="text-[#ac815d] text-lg px-2" aria-label="Editar foto">📷</button>
        </div>
        {/* Segment control */}
        <div className="flex gap-2 justify-center my-4">
          <button className="px-3 py-1 rounded-full bg-[#ac815d] text-white font-semibold">Registro</button>
          <button className="px-3 py-1 rounded-full bg-[#f0cbad] text-[#ac815d] font-semibold">Movimientos</button>
        </div>
        <div className="mb-6 text-center text-[#3a210c]">Vista detallada próxima a implementar.</div>
        {/* To be implemented… */}
        <button className="mt-12 block mx-auto px-4 py-2 text-[#ac815d] underline" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default AnimalProfileSheet;
