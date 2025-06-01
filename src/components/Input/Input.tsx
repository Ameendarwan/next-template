import * as React from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "../Button/Button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "pre signin" | "post signin";
  appendIcon?: React.ReactNode; // Optional icon at the end of input
  prependIcon?: React.ReactNode; // Optional icon at the start of input
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, appendIcon, prependIcon, ...props }, ref) => {
    const { i18n } = useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const isPasswordType = type === "password";

    return (
      <div className="relative flex items-center w-full">
        {prependIcon && (
          <div className="absolute start-2 text-muted-foreground">
            {prependIcon}
          </div>
        )}
        <input
          type={isPasswordType && showPassword ? "text" : type}
          className={cn(
            `flex h-9 w-full ${prependIcon && "indent-2"} ${appendIcon && i18n.language === "ar" && "!pr-9"} rounded-md border border-input bg-transparent px-3 py-1 pe-10 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
            prependIcon ? "pl-9" : "", // extra padding if there's a prepend icon
            className
          )}
          ref={ref}
          {...props}
        />
        {isPasswordType ? (
          <Button
            type="button"
            className="absolute end-1 text-muted-foreground !bg-transparent hover:text-foreground focus:outline-none shadow-none"
            onClick={togglePasswordVisibility}
          >
            {!showPassword ? (
              <Eye className="text-gray-600" />
            ) : (
              <EyeOff className="text-gray-600" />
            )}
          </Button>
        ) : (
          appendIcon && <div className="absolute right-2">{appendIcon}</div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
