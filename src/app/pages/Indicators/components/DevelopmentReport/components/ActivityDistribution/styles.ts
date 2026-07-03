import tw from "tailwind-styled-components";

export const Card = tw.div`
w-full
h-full
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

md:text-xl
`;

export const Subtitle = tw.p`
text-sm
text-center
leading-relaxed
text-mbr-gray-30

md:text-base
`;

export const ChartWrapper = tw.div`
w-full
h-[280px]
mt-2

md:h-[320px]
`;

export const Empty = tw.div`
w-full
flex
flex-1
items-center
justify-center
py-10

[&>p]:font-bold
[&>p]:text-mbr-blue-10
[&>p]:text-base
`;
