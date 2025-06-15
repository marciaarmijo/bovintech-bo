
import React from "react";
import { Input } from "@/components/ui/input";

interface Props {
  profile: {
    email: string;
    phone: string;
    name: string;
  };
  errors: { [key: string]: string };
  editing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PersonalInfoCard = ({ profile, errors, editing, onChange }: Props) => (
  <form className="grid grid-cols-2 gap-4 p-4">
    <div className="col-span-2 text-[#3a210c] font-semibold pb-2">Información personal</div>
    <div>
      <label className="block text-xs font-medium text-[#3a210c] mb-1">
        Correo electrónico*
      </label>
      <Input
        type="email"
        name="email"
        disabled={!editing}
        value={profile.email}
        onChange={onChange}
        inputMode="email"
        className={`bg-white ${errors.email ? "border-red-400" : "border-[#d0ab8d]"} text-[#3a210c]`}
        autoComplete="email"
        aria-label="Correo electrónico"
      />
      {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
    </div>
    <div>
      <label className="block text-xs font-medium text-[#3a210c] mb-1">
        Teléfono
      </label>
      <Input
        type="tel"
        name="phone"
        disabled={!editing}
        value={profile.phone}
        onChange={onChange}
        inputMode="numeric"
        className="bg-white border-[#d0ab8d] text-[#3a210c]"
        autoComplete="tel"
        aria-label="Teléfono"
      />
    </div>
    <div className="col-span-2">
      <label className="block text-xs font-medium text-[#3a210c] mb-1">
        Nombre completo*
      </label>
      <Input
        type="text"
        name="name"
        disabled={!editing}
        value={profile.name}
        onChange={onChange}
        className={`bg-white ${errors.name ? "border-red-400" : "border-[#d0ab8d]"} text-[#3a210c]`}
        aria-label="Nombre completo"
      />
      {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
    </div>
  </form>
);

export default PersonalInfoCard;
