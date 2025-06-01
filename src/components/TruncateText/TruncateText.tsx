import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Tooltip/Tooltip";

interface TruncatedTextProps {
  value: unknown;
  trimSize: number;
}

const TruncatedText = ({ value, trimSize }: TruncatedTextProps) => {
  if (value === null || value === undefined) {
    return <span className="text-gray-500">No data</span>;
  }

  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  const truncatedValue =
    stringValue.length > trimSize
      ? `${stringValue.slice(0, trimSize)}...`
      : stringValue;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="line-clamp-1 cursor-pointer truncate">
            {truncatedValue}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-72 break-words whitespace-pre-wrap">
          <p className="break-words whitespace-pre-wrap">{stringValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedText;
