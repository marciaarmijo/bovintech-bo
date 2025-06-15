
import React from "react";
import { Plus } from "lucide-react";

export const AnimalCreateFAB = ({ onClick }: { onClick: () => void }) => (
  <button
    className="fixed bottom-6 right-6 z-50 rounded-full shadow fab-shadow bg-[#ac815d] p-5 flex items-center justify-center"
    style={{ borderRadius: 24 }}
    onClick={onClick}
    aria-label="Crear animal"
  >
    <Plus className="text-white" size={32} />
  </button>
);
