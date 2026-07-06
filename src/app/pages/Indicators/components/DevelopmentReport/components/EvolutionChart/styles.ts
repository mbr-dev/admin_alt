import tw from "tailwind-styled-components";

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

export const ChartWrapper = tw.div`
w-full
h-[340px]
mt-2

md:h-[420px]
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
