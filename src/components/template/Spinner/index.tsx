import { cn } from "@/lib/utils";

interface ISpinner {
  className?: string;
}

export const Spinner = ({ className }: ISpinner) => {
  return (
    <div
      className={cn("w-[32px] h-[32px] rounded-full border-4 border-mbr-blue-10 border-t-transparent animate-spin", className)}
    />
  );
};
