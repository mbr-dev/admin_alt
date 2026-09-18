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

export const Content = tw.div`
w-full
flex
flex-col
gap-4
`;

export const FilterBox = tw.div`
w-full
max-w-[420px]
z-30
`;

export const CardsGrid = tw.div`
w-full
grid
grid-cols-1
gap-4

md:grid-cols-2

lg:grid-cols-4
`;

export const SkeletonCard = tw.div`
w-full
min-h-[220px]
rounded-2xl
border-2
border-mbr-gray-30
bg-white
animate-pulse

md:min-h-[240px]
`;

export const EmptyMessage = tw.p`
w-full
text-center
text-mbr-gray-80
text-sm
py-10
z-30

md:text-base
`;
