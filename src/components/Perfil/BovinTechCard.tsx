
import React from "react";
import { Button } from "@/components/ui/button";

const BovinTechCard = () => (
  <>
    <div className="px-4 pt-4 pb-2 text-[#3a210c] font-semibold text-[18px]">BovinTech</div>
    <div className="px-4 pb-0 text-[#3a210c] text-[15px] grid gap-1">
      <div>Email: <span className="font-normal">soporte@bovintech.com</span></div>
      <div>Web: <a href="https://www.bovintech.com.bo" className="underline hover:text-[#ac815d]" target="_blank" rel="noopener">www.bovintech.com.bo</a></div>
      <div>Teléfono: <span className="font-normal">+591 700-12345</span></div>
    </div>
    <div className="px-4 py-2">
      <Button variant="outline" className="border-[#3a210c] text-[#3a210c] w-full mt-1">Enviar feedback</Button>
    </div>
  </>
);

export default BovinTechCard;
