import tw from "tailwind-styled-components";

export const Card = tw.article`
w-full
min-h-[220px]
p-4
flex
flex-col
justify-between
gap-4
rounded-2xl
border-2
border-mbr-blue-150
bg-white
z-30

md:min-h-[240px]
md:p-5
`;

export const Header = tw.div`
w-full
flex
items-start
justify-between
gap-2
`;

export const Title = tw.h3`
flex-1
text-mbr-blue-10
text-lg
font-bold
line-clamp-2

md:text-xl
`;

export const Status = tw.span<{ $active: boolean }>`
shrink-0
px-3
py-1
rounded-full
text-xs
font-medium

${({ $active }) => ($active ? "bg-green-100 text-green-700" : "bg-mbr-gray-20 text-mbr-gray-80")}
`;

export const Infos = tw.div`
w-full
grid
grid-cols-2
gap-3
`;

export const Info = tw.div`
flex
flex-col
gap-1
`;

export const InfoLabel = tw.span`
text-mbr-gray-80
text-xs
font-medium

md:text-sm
`;

export const InfoValue = tw.span`
text-black
text-sm
font-semibold
truncate

md:text-base
`;

export const Actions = tw.div`
w-full
flex
items-center
justify-end
gap-2
`;

export const ActionButton = tw.button<{ $variant: "students" | "teachers" | "edit" | "delete" }>`
w-9
h-9
rounded-lg
flex
items-center
justify-center
cursor-pointer

hover:opacity-90

[&>svg]:text-base

${({ $variant }) => {
  if ($variant === "students") return "bg-mbr-blue-10 text-white";
  if ($variant === "teachers") return "bg-mbr-green-30 text-white";
  if ($variant === "edit") return "bg-mbr-gray-20 text-mbr-blue-10";
  return "bg-mbr-red-10 text-white";
}}
`;
