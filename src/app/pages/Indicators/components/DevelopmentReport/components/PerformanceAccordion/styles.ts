import tw from "tailwind-styled-components";
import { FaChevronDown } from "react-icons/fa6";

export const Card = tw.div`
w-full
flex
flex-col
items-center
gap-2
p-6
rounded-xl
shadow-xl
bg-white
border
border-mbr-gray-20
print:break-inside-avoid
print:shadow-none

md:p-8
`;

export const Title = tw.h3`
text-lg
font-bold
text-center
uppercase
text-mbr-blue-10

md:text-2xl
`;

export const Subtitle = tw.p`
w-full
text-sm
text-center
leading-relaxed
text-mbr-gray-30

md:text-base
`;

export const List = tw.div`
w-full
flex
flex-col
gap-3
mt-2
`;

export const Item = tw.div<{ $exporting?: boolean }>`
w-full
rounded-xl
border
border-mbr-gray-20
bg-white
shadow-sm
${(p) => (p.$exporting ? "overflow-visible" : "overflow-hidden")}
`;

export const Header = tw.button<{ $exporting?: boolean }>`
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

${(p) => (p.$exporting ? "items-start" : "")}
`;

export const HeaderLeft = tw.div<{ $exporting?: boolean }>`
flex
gap-3
min-w-0
${(p) =>
  p.$exporting
    ? `
flex-col
items-start
flex-1
`
    : `
items-center
`}
`;

export const Category = tw.h4<{ $exporting?: boolean }>`
font-bold
text-mbr-blue-10
text-base

md:text-lg

${(p) =>
  p.$exporting
    ? `
whitespace-normal
break-words
`
    : `
truncate
`}
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

export const Chevron = tw(FaChevronDown)<{ $open?: boolean; $exporting?: boolean }>`
text-mbr-gray-30
transition-transform
duration-300
print:hidden
${(p) => (p.$open ? "rotate-180" : "rotate-0")}
${(p) => (p.$exporting ? "hidden" : "")}
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

export const Row = tw.div<{ $exporting?: boolean }>`
gap-4
${(p) =>
  p.$exporting
    ? `
flex
flex-col
items-stretch
`
    : `
flex
items-center
`}
`;

export const Skill = tw.span<{ $exporting?: boolean }>`
text-sm
text-mbr-gray-30
lowercase
first-letter:uppercase
md:text-base

${(p) =>
  p.$exporting
    ? `
w-full
whitespace-normal
break-words
`
    : `
w-2/5
min-w-[110px]
shrink-0
`}
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

[&>p]:font-bold
[&>p]:text-mbr-blue-10
[&>p]:text-base

md:[&>p]:text-lg
`;
