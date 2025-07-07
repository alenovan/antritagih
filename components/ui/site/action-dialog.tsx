import { JSX, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { cn } from "@/lib/utils";

export default function ActionDialog({
  isOpen,
  form,
  title,
  description,
  className,
  setIsOpen,
  clearFn,
}: {
  isOpen: boolean;
  form: JSX.Element;
  title?: string;
  description?: string;
  className?: string;
  setIsOpen: (isOpen: boolean) => void;
  clearFn?: () => void;
}) {
  useEffect(() => {
    if (isOpen === false && clearFn) clearFn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn(
            "max-w-[460px] overflow-y-auto max-h-[90vh]",
            className
          )}
        >
          <DialogHeader
            className={cn("hidden", (title || description) && "block")}
          >
            <DialogTitle className={cn(title && "block", !title && "hidden")}>
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {form}
        </DialogContent>
      </Dialog>
    </>
  );
}
