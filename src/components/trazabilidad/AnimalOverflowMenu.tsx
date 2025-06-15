
import React, { useState, useRef } from "react";
import { MoreVertical, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AnimalOverflowMenu = ({ onImport }: { onImport: () => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handler(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative inline-block" ref={ref}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(o => !o)}>
        <MoreVertical className="text-[#3a210c]" size={26} />
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-[#ac815d] rounded-lg shadow-lg z-50">
          <button
            className="flex gap-2 items-center w-full px-4 py-2 text-[#3a210c] hover:bg-[#f0cbad] rounded-t"
            onClick={() => { onImport(); setOpen(false); }}
          >
            <FileText /> Importar Excel
          </button>
        </div>
      )}
    </div>
  );
};
