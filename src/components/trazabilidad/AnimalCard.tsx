
import React from "react";
import { AnimalAvatar } from "./AnimalAvatar";

interface AnimalCardProps {
  id: string;
  onClick: () => void;
}
export const AnimalCard: React.FC<AnimalCardProps> = ({ id, onClick }) => (
  <div
    className="flex flex-col items-center justify-center bg-white rounded-lg shadow card-shadow border p-5 cursor-pointer hover:shadow-md transition"
    style={{ borderColor: "#ac815d", borderWidth: 1 }}
    tabIndex={0}
    aria-label={`Ver perfil animal ${id}`}
    onClick={onClick}
  >
    <AnimalAvatar id={id} />
    <div
      style={{ color: "#3a210c", fontSize: 18 }}
      className="font-semibold text-center mt-2" 
    >
      {id}
    </div>
  </div>
);
