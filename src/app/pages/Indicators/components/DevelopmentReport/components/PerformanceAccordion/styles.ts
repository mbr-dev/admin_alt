import tw from "tailwind-styled-components";
import { FaChevronDown } from "react-icons/fa6";

export const List = tw.div`
w-full
flex
flex-col
gap-3
`;

export const Item = tw.div`
w-full
rounded-xl
border
border-mbr-gray-20
bg-white
shadow-sm
overflow-hidden
`;

export const Header = tw.button`
w-full
flex
items-center
justify-between
gap-4
px-4
py-3
text-left
transition-colors
hover:bg-mbr-gray-10

md:px-6
md:py-4
`;

export const HeaderLeft = tw.div`
flex
items-center
gap-3
min-w-0
`;

export const Category = tw.h4`
font-bold
text-mbr-blue-10
text-base
truncate

md:text-lg
`;

export const Count = tw.span`
shrink-0
text-xs
text-mbr-gray-50

md:text-sm
`;

export const HeaderRight = tw.div`
flex
items-center
gap-3
shrink-0
`;

export const Average = tw.span`
rounded-full
px-3
py-1
text-xs
font-bold
text-white

md:text-sm
`;

export const Chevron = tw(FaChevronDown)<{ $open?: boolean }>`
text-mbr-gray-30
transition-transform
duration-300
${(p) => (p.$open ? "rotate-180" : "rotate-0")}
`;

export const Body = tw.div`
flex
flex-col
gap-3
px-4
pt-3
pb-4
border-t
border-mbr-gray-10
animate-opacity-0-100

md:px-6
md:pb-5
md:gap-4
`;

export const Row = tw.div`
flex
items-center
gap-4
`;

export const Skill = tw.span`
w-2/5
min-w-[110px]
shrink-0
text-sm
text-mbr-gray-30

md:text-base
`;

export const BarBox = tw.div`
flex-1
min-w-0
`;

export const Empty = tw.div`
w-full
flex
items-center
justify-center
py-10
rounded-xl
border
border-mbr-gray-20
bg-white

[&>p]:font-bold
[&>p]:text-mbr-blue-10
[&>p]:text-base

md:[&>p]:text-lg
`;
