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

focus:border-[#ec5691]
`;

export const SearchButton = tw.button`
w-10
h-10
rounded-xl
flex
items-center
justify-center
bg-[#ec5691]
cursor-pointer

hover:opacity-90

[&>svg]:text-white
[&>svg]:text-base
`;

export const CardsGrid = tw.div`
w-full
grid
grid-cols-2
gap-4

sm:grid-cols-3
md:grid-cols-4
lg:grid-cols-5
`;

export const TableSkeleton = tw.div`
w-full
grid
grid-cols-2
gap-4
animate-pulse

sm:grid-cols-3
md:grid-cols-4
lg:grid-cols-5
`;

export const CardSkeleton = tw.div`
flex
flex-col
items-center
gap-3
rounded-2xl
border
border-mbr-gray-40
bg-white
p-4
`;

export const SkeletonAvatar = tw.div`
w-16
h-16
rounded-full
bg-mbr-gray-20
`;

export const SkeletonLine = tw.div`
mx-auto
h-3
w-4/5
max-w-[10rem]
rounded-md
bg-mbr-gray-20
`;

export const SkeletonLineShort = tw.div`
mx-auto
h-3
w-1/2
rounded-md
bg-mbr-gray-20
`;

export const StudentCard = tw.article`
flex
flex-col
items-center
text-center
gap-2
rounded-2xl
border
border-[#ec5691]/40
bg-white
p-4
shadow-sm
transition-transform
duration-200
ease-out

hover:scale-105
hover:shadow-md
`;

export const InitialsCircle = tw.div`
flex
h-16
w-16
shrink-0
items-center
justify-center
rounded-full
bg-[#ec5691]
text-lg
font-semibold
text-white
`;

export const CardName = tw.h3`
text-sm
font-medium
text-mbr-gray-30
line-clamp-2

md:text-base
`;

export const CardAge = tw.p`
text-sm
text-mbr-gray-50
`;

export const CardSessions = tw.p`
text-sm
font-medium
text-[#f21a6f]
`;

export const CardActions = tw.div`
mt-1
flex
w-full
max-w-[14rem]
flex-col
gap-2
`;

export const CardActionButton = tw.button`
flex
w-full
items-center
justify-center
gap-2
rounded-xl
border
border-[#ec5691]
bg-white
px-2
py-2
text-xs
font-medium
text-[#f21a6f]
transition-colors
outline-none

hover:bg-[#ec5691]/10
focus-visible:ring-2
focus-visible:ring-[#ec5691]
focus-visible:ring-offset-2

md:text-sm

[&>svg]:shrink-0
[&>svg]:text-sm

md:[&>svg]:text-base
`;

export const PaginationWrap = tw.div`
flex
w-full
justify-center
pt-2
`;

export const EmptyState = tw.p`
w-full
rounded-2xl
border
border-mbr-gray-30
bg-white
py-12
text-center
text-sm
text-mbr-gray-50
`;
