import { FC } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import RotateLoader from "react-spinners/RotateLoader";

interface LoaderProps {
  type?: "rotate" | "pulse";
  color?: string;
  size?: number;
  variant?: "full-page" | "normal";
  className?: string;
}

const loaderMap: Record<string, FC<{ color?: string; size?: number }>> = {
  rotate: RotateLoader,
  pulse: PulseLoader,
};

const Loader: FC<LoaderProps> = ({
  type = "rotate",
  color = "#161525",
  size = 20,
  variant = "normal",
  className,
}) => {
  const SelectedLoader = loaderMap[type];
  if (variant === "full-page")
    return (
      <div
        className={`w-full h-[90vh] flex justify-center items-center ${className}`}
      >
        <SelectedLoader color={color} size={size} />
      </div>
    );
  return <SelectedLoader color={color} size={size} />;
};

export default Loader;
