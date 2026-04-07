import tw from "tailwind-styled-components";

export const Aside = tw.aside`
shrink-0
flex
max-h-full
flex-col
gap-4
overflow-y-auto
rounded-2xl
border
border-mbr-blue-80/40
bg-white
p-4
shadow-sm

lg:w-[272px]
`;

export const IdentityBlock = tw.div`
flex
flex-col
items-center
gap-2
text-center
`;

export const FirstName = tw.p`
text-sm
font-semibold
text-mbr-gray-30
leading-tight
break-words
max-w-full

md:text-base
`;

export const Nav = tw.nav`
flex
flex-col
gap-1
`;

export const NavButton = tw.button<{ $active?: boolean }>`
flex
w-full
items-center
gap-2.5
rounded-xl
px-3
py-2.5
text-left
text-xs
font-medium
transition-colors

md:text-sm

${(p) =>
  p.$active
    ? "bg-mbr-blue-10/10 text-mbr-blue-10 ring-1 ring-mbr-blue-10/30"
    : "text-mbr-gray-30 hover:bg-mbr-gray-20/80"}
`;

export const NavIcon = tw.span`
inline-flex
shrink-0
text-base
text-mbr-blue-10

[&>svg]:block
`;
