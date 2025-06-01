import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog/Dialog";
import { ReactNode, useState } from "react";

import { Button } from "@/components/Button/Button";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ConfirmationDialogProps {
  isOpen?: boolean;
  title?: string;
  description: string;
  confirmationComponent: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  cancelButtonTitle?: string;
  setIsOpen: (value: boolean) => void;
}

const ConfirmationDialog = ({
  isOpen,
  setIsOpen,
  description,
  confirmationComponent,
  title = "",
  cancelButtonTitle = "users.pages.goals.cancel",
  disabled,
  children,
}: ConfirmationDialogProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="!rounded-[12px] font-mont sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <div className="flex flex-row justify-between border-b border-muted pb-4">
            <DialogTitle className="text-sm font-bold">{title}</DialogTitle>
            <DialogClose asChild>
              <X className="h-4 w-4" />
            </DialogClose>
          </div>

          <DialogDescription className="!mt-4 text-xs font-semibold text-primary">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children && <>{children}</>}
        <DialogFooter className="sm:justify-between">
          <div className="flex w-full flex-row gap-2">
            <DialogClose asChild>
              <Button variant="muted" className="text-accent">
                {t(cancelButtonTitle)}
              </Button>
            </DialogClose>
            <DialogClose
              onClick={handleConfirm}
              disabled={disabled || isLoading}
              asChild
            >
              {confirmationComponent}
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
