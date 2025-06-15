
import React from "react";
import { Input } from "@/components/ui/input";

interface Props {
  finca: {
    nombre: string;
    ubicacion: string;
    proposito: string;
    superficie: string;
  };
  errors: { [key: string]: string };
  editing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  propOptions: string[];
}
const FincaInfoCard = ({ finca, errors, editing, onChange, propOptions }: Props) => (
  <>
    <div className="px-4 pt-4 pb-2 text-[#3a210c] font-semibold text-[18px]">Mi finca</div>
    <form className="grid grid-cols-2 gap-4 p-4 pt-0">
      <div>
        <label className="block text-xs font-medium text-[#3a210c] mb-1">
          Nombre de la finca*
        </label>
        <Input
          type="text"
          name="nombre"
          disabled={!editing}
          value={finca.nombre}
          onChange={onChange}
          className={`bg-white ${errors.nombre ? "border-red-400" : "border-[#d0ab8d]"} text-[#3a210c]`}
          aria-label="Nombre de la finca"
        />
        {errors.nombre && <span className="text-xs text-red-500">{errors.nombre}</span>}
      </div>
      <div>
        <label className="block text-xs font-medium text-[#3a210c] mb-1">
          Ubicación (Ciudad – Departamento)*
        </label>
        <Input
          type="text"
          name="ubicacion"
          disabled={!editing}
          value={finca.ubicacion}
          onChange={onChange}
          className={`bg-white ${errors.ubicacion ? "border-red-400" : "border-[#d0ab8d]"} text-[#3a210c]`}
          aria-label="Ubicación"
        />
        {errors.ubicacion && <span className="text-xs text-red-500">{errors.ubicacion}</span>}
      </div>
      <div>
        <label className="block text-xs font-medium text-[#3a210c] mb-1">
          Propósito*
        </label>
        <select
          name="proposito"
          disabled={!editing}
          value={finca.proposito}
          onChange={onChange}
          aria-label="Propósito"
          className={`w-full rounded-md border ${errors.proposito ? "border-red-400" : "border-[#d0ab8d]"} px-3 py-2 text-base bg-white text-[#3a210c] focus:outline-none focus:ring-2 focus:ring-[#ac815d]`}
        >
          <option value="">Seleccionar</option>
          {propOptions.map(op => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
        {errors.proposito && <span className="text-xs text-red-500">{errors.proposito}</span>}
      </div>
      <div>
        <label className="block text-xs font-medium text-[#3a210c] mb-1">
          Superficie (ha)
        </label>
        <Input
          type="number"
          name="superficie"
          disabled={!editing}
          value={finca.superficie}
          onChange={onChange}
          inputMode="numeric"
          className="bg-white border-[#d0ab8d] text-[#3a210c]"
          aria-label="Superficie"
        />
      </div>
    </form>
  </>
);

export default FincaInfoCard;
