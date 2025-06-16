
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

// Array of cow placeholder images from Unsplash
const cowImages = [
  'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=400&fit=crop&crop=face'
];

// Function to get consistent image for each animal based on ID
const getCowImageForAnimal = (animalId: string): string => {
  const hash = animalId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return cowImages[hash % cowImages.length];
};

const AnimalCard: React.FC<{ animal: Animal; onClick: () => void }> = ({ animal, onClick }) => {
  const cowImageUrl = getCowImageForAnimal(animal.id);

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl border border-[#ac815d] shadow flex items-center px-4 py-3 gap-4 hover:ring-2 hover:ring-[#ac815d] focus:outline-none transition"
      style={{ minHeight: 64 }}
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full border border-[#ac815d] overflow-hidden bg-gray-100">
        <img 
          src={cowImageUrl}
          alt={`Vaca ${animal.id}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div className="w-full h-full bg-[#f0cbad] border border-[#ac815d] rounded-full hidden items-center justify-center text-[#ac815d] font-semibold text-xl">
          {animal.id.slice(-2)}
        </div>
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
};

export default AnimalCard;
