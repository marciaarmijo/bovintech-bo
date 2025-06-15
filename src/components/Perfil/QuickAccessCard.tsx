
import React from "react";
import { Switch } from "@/components/ui/switch";

interface Props {
  quick: {
    offline: boolean;
    sync: boolean;
    bluetooth: boolean;
    notifications: boolean;
  };
  setQuick: (updater: (q: Props["quick"]) => Props["quick"]) => void;
}
const QuickAccessCard = ({ quick, setQuick }: Props) => (
  <>
    <div className="px-4 pt-4 pb-2 text-[#3a210c] font-semibold text-[15px]">Accesos rápidos</div>
    <div className="px-4 pb-2 grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
      <div className="flex items-center gap-2">
        <Switch
          id="offline"
          checked={quick.offline}
          onCheckedChange={v => setQuick(q => ({ ...q, offline: v }))}
        />
        <label htmlFor="offline" className="text-[#3a210c] text-sm select-none cursor-pointer">Modo offline</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="sync"
          checked={quick.sync}
          onCheckedChange={v => setQuick(q => ({ ...q, sync: v }))}
        />
        <label htmlFor="sync" className="text-[#3a210c] text-sm select-none cursor-pointer">Sincronización automática</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="bluetooth"
          checked={quick.bluetooth}
          onCheckedChange={v => setQuick(q => ({ ...q, bluetooth: v }))}
        />
        <label htmlFor="bluetooth" className="text-[#3a210c] text-sm select-none cursor-pointer">Conectividad Bluetooth</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="notificaciones"
          checked={quick.notifications}
          onCheckedChange={v => setQuick(q => ({ ...q, notifications: v }))}
        />
        <label htmlFor="notificaciones" className="text-[#3a210c] text-sm select-none cursor-pointer">Notificaciones</label>
      </div>
    </div>
  </>
);

export default QuickAccessCard;
