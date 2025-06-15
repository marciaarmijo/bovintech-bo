
import React from 'react';

/**
 * Stub for modal/sheet to crear animal.
 * Will be implemented as full form later.
 */
const CrearAnimalSheet: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-end">
      <div className="w-full bg-white rounded-t-xl shadow-lg p-6 max-h-[90vh] animate-fade-in overflow-y-auto">
        <div className="flex items-center gap-3 mb-2">
          <button className="text-[#3a210c] text-lg px-2" onClick={onClose}>←</button>
          <span className="text-[18px] font-semibold text-[#3a210c]">Crear animal</span>
        </div>
        <div className="mb-6 text-center text-[#3a210c]">Formulario para crear animal – pendiente de implementación.</div>
        <button className="mt-12 block mx-auto px-4 py-2 rounded bg-[#ac815d] text-white text-lg font-bold" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CrearAnimalSheet;
