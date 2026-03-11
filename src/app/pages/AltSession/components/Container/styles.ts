import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
w-full
h-full
flex
flex-col
bg-mbr-gray-20
p-4
pb-24
relative
gap-4

md:p-8
md:pb-24
md:gap-6

landscape:lg:p-8
landscape:lg:pb-24
`;

export const Main = tw.div`
w-full
h-full
flex
flex-col
gap-4
z-30

md:gap-6
`;

export const TableArea = tw.div`
w-full
flex
flex-col
gap-4
`;

export const StatusTag = tw.span<{ $status: string }>`
px-3
py-1
rounded-full
text-xs
font-medium

${({ $status }) => {
  if ($status === "aberta") return "bg-green-100 text-blue-700";
  if ($status === "finalizada") return "bg-blue-100 text-green-700";
  if ($status === "cancelada") return "bg-red-100 text-red-700";
  return "bg-mbr-gray-20 text-mbr-gray-80";
}}
`;

export const ActionCell = tw.div`
w-full
flex
items-center
justify-center
gap-1
`;

export const ActionIcon = tw.button`
w-8
h-8
rounded-lg
flex
items-center
justify-center
cursor-pointer

hover:bg-mbr-gray-20

[&>svg]:text-mbr-blue-10
[&>svg]:text-lg
`;

export const ActionStatusIcon = tw.div<{ $variant: "check" | "warning" }>`
w-8
h-8
rounded-lg
flex
items-center
justify-center

${({ $variant }) => ($variant === "check" ? "[&>svg]:text-green-600" : "[&>svg]:text-amber-500")}
[&>svg]:text-lg
`;

export const TableSkeleton = tw.div`
w-full
rounded-2xl
border
border-mbr-gray-30
bg-white
p-4
animate-pulse
flex
flex-col
gap-3
`;

export const SkeletonHeader = tw.div`
w-full
h-6
rounded-md
bg-mbr-gray-30
`;

export const SkeletonRow = tw.div`
w-full
grid
grid-cols-2
gap-3

md:grid-cols-4
`;

export const SkeletonCell = tw.div`
h-10
rounded-md
bg-mbr-gray-20
`;
