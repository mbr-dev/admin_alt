import { cn } from "@/lib/utils";

interface IBar {
  value: number;
}

export const Bar = ({ value }: IBar) => {
  return (
    <div className="w-[200px] h-[36px] bg-mbr-gray-20 relative border-2 border-mbr-gray-30 rounded-xl">
      <div
        className={cn("rounded-xl h-full",
          value <= 20 ? "bg-red-600" : 
          value <= 40 ? "bg-mbr-orange-10" : 
          value < 60 ? "bg-mbr-yellow-30" : 
          value <= 70 ? "bg-mbr-green-50" : "bg-mbr-green-40")}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      >
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">{value.toFixed(0)}%</p>
      </div>
    </div>
  );
}