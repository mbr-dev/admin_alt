import tw from "tailwind-styled-components";

export const Row = tw.div`
flex
items-center
gap-3
w-full
`;

export const Track = tw.div`
relative
h-3
w-full
min-w-[120px]
rounded-full
overflow-hidden
bg-mbr-gray-10

md:h-3.5
`;

export const Fill = tw.div`
h-full
rounded-full
transition-all
duration-500
ease-out
`;

export const Value = tw.span`
w-10
shrink-0
text-right
text-sm
font-bold
text-mbr-gray-30

md:text-base
`;
