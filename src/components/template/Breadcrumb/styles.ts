import tw from "tailwind-styled-components";

export const Nav = tw.nav`
hidden
min-w-0
flex-1

landscape:flex
md:flex
`;

export const List = tw.ol`
flex
flex-wrap
items-center
gap-1
min-w-0
list-none
m-0
p-0

md:gap-2
`;

export const Item = tw.li`
flex
items-center
gap-1
min-w-0

md:gap-2
`;

export const Link = tw.button`
text-white
text-sm
font-medium
truncate
cursor-pointer
transition-opacity

hover:opacity-80

md:text-xl
landscape:lg:text-2xl
`;

export const Current = tw.span`
text-white
text-sm
font-bold
truncate

md:text-xl
landscape:lg:text-2xl
`;

export const Parent = tw.span`
text-white
text-sm
font-medium
truncate
opacity-90

md:text-xl
landscape:lg:text-2xl
`;

export const Separator = tw.span`
text-white
text-sm
font-medium
opacity-80
shrink-0

md:text-xl
landscape:lg:text-2xl
`;
