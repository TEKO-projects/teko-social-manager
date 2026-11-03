"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Options = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  preview?: ReactNode;
};
type Confirm = (options: Options) => Promise<boolean>;

const ConfirmContext = createContext<Confirm>(async () => false);

/** `if (!(await confirm({ title: "…" }))) return;` — aviso previo para acciones que borran o cambian datos. */
export const useConfirm = () => useContext(ConfirmContext);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<(Options & { resolve: (ok: boolean) => void }) | null>(null);

  const confirm = useCallback<Confirm>(
    (options) =>
      new Promise<boolean>((resolve) => {
        setState({ ...options, resolve });
        setOpen(true);
      }),
    []
  );

  function close(ok: boolean) {
    state?.resolve(ok);
    setOpen(false); // el contenido se conserva mientras se cierra la animación
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Dialog open={open} onOpenChange={(o) => !o && close(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{state?.title}</DialogTitle>
            {state?.description && <DialogDescription>{state.description}</DialogDescription>}
          </DialogHeader>
          {state?.preview}
          <DialogFooter>
            <Button variant="outline" onClick={() => close(false)}>
              {state?.cancelLabel ?? "Cancelar"}
            </Button>
            <Button variant={state?.destructive ? "destructive" : "default"} onClick={() => close(true)}>
              {state?.confirmLabel ?? "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
}
