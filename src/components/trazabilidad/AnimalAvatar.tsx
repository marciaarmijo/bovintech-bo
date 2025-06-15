
import React from "react";

interface AnimalAvatarProps {
  id: string;
  sexo?: "Macho" | "Hembra";
  className?: string;
}

const colors = {
  border: "#ac815d",
  bg: "#fff",
  label: "#3a210c",
};

function getInitials(id: string) {
  return id?.length > 2 ? id.slice(-2).toUpperCase() : id.toUpperCase();
}

export const AnimalAvatar: React.FC<AnimalAvatarProps> = ({ id, sexo, className }) => (
  <div
    className={`w-14 h-14 flex items-center justify-center rounded-full border-2 select-none text-lg font-bold`}
    style={{ borderColor: colors.border, background: colors.bg, color: colors.label }}
    aria-label={sexo ? `${sexo}: ${id}` : id}
    title={sexo ? `${sexo}: ${id}` : id}
    tabIndex={0}
    role="img"
    >
    {getInitials(id)}
  </div>
);
