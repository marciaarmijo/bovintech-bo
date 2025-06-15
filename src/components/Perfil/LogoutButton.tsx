
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Props {
  showLogout: boolean;
  setShowLogout: (v: boolean) => void;
  onLogout: () => void;
}
const LogoutButton = ({ showLogout, setShowLogout, onLogout }: Props) => (
  <>
    <Button
      variant="outline"
      className="w-full bg-white text-[#d9534f] text-base shadow-md h-12 border border-[#e0ae95] font-semibold"
      onClick={() => setShowLogout(true)}
    >
      <LogOut className="mr-2" size={20} color="#d9534f" />
      Cerrar sesión
    </Button>
    <Dialog open={showLogout} onOpenChange={setShowLogout}>
      <DialogContent className="max-w-xs text-center">
        <DialogHeader>
          <DialogTitle>¿Estás seguro que deseas cerrar sesión?</DialogTitle>
          <DialogDescription>Esta acción cerrará tu sesión actual.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 mt-2">
          <Button variant="outline" onClick={() => setShowLogout(false)}>Cancelar</Button>
          <Button className="bg-[#d9534f]" onClick={() => {
            setShowLogout(false);
            toast({ title: "Sesión cerrada", description: "¡Vuelve pronto!" });
            onLogout();
          }}>
            Cerrar sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
);

export default LogoutButton;
