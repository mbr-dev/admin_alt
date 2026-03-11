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

export const FilterBox = tw.div`
w-full
rounded-2xl
border
border-mbr-gray-30
bg-white
p-3
flex
items-center
gap-2
`;

export const FilterInput = tw.input`
flex-1
h-10
rounded-xl
border
border-mbr-gray-30
px-3
text-sm
outline-none

focus:border-mbr-blue-10
`;

export const SearchButton = tw.button`
w-10
h-10
rounded-xl
flex
items-center
justify-center
bg-mbr-blue-10
cursor-pointer

hover:opacity-90

[&>svg]:text-white
[&>svg]:text-base
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

export const EditButton = tw.button`
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

export const EditCell = tw.div`
w-full
flex
items-center
justify-center
`;

export const StatusTag = tw.span<{ $active: boolean }>`
px-3
py-1
rounded-full
text-xs
font-medium

${({ $active }) => ($active ? "bg-green-100 text-green-700" : "bg-mbr-gray-20 text-mbr-gray-80")}
`;
