"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useCallback, useContext, useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
} from "../alert-dialog";

interface ConfirmationDialogOptions {
  title: string;
  description: string;
  type?: "destructive" | "positive";
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmationDialogContextType {
  confirm: (options: ConfirmationDialogOptions) => Promise<boolean>;
}

const ConfirmationDialogContext = createContext<
  ConfirmationDialogContextType | undefined
>(undefined);

export const useConfirmationDialog = () => {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmationDialog must be used within a ConfirmationDialogProvider"
    );
  }
  return context;
};

export const ConfirmationDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [dialogState, setDialogState] =
    useState<ConfirmationDialogOptions | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null
  );

  const confirm = useCallback(
    (options: ConfirmationDialogOptions) => {
      setDialogState(options);
      setIsOpen(true);
      return new Promise<boolean>((res) => {
        setResolve(() => res);
      });
    },
    [setIsOpen]
  );

  const handleConfirm = useCallback(() => {
    resolve?.(true);
    setIsOpen(false);
  }, [resolve, setIsOpen]);

  return (
    <ConfirmationDialogContext.Provider value={{ confirm }}>
      {children}
      {dialogState && (
        <>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{dialogState.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {dialogState.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {dialogState.cancelText ?? "Cancel"}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirm}
                  className={cn(
                    dialogState.type === "destructive" && "bg-red-500"
                  )}
                >
                  {dialogState.confirmText ?? "Confirm"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </ConfirmationDialogContext.Provider>
  );
};
