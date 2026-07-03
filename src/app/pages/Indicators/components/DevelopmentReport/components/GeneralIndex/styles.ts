import tw from "tailwind-styled-components";

export const Card = tw.div`
w-full
flex
flex-col
items-center
gap-4
p-6
rounded-xl
shadow-xl
text-white
bg-gradient-to-br
from-mbr-blue-20
to-mbr-blue-10

md:p-8
md:gap-6
`;

export const Title = tw.h3`
text-lg
font-bold
text-center
uppercase

md:text-2xl
`;

export const ChartWrapper = tw.div`
relative
w-full
h-[220px]
flex
items-center
justify-center

md:h-[260px]
`;

export const CenterLabel = tw.div`
absolute
inset-0
flex
flex-col
items-center
justify-center
pointer-events-none
`;

export const Percent = tw.span`
text-4xl
font-bold
leading-none

md:text-5xl
`;

export const Level = tw.span`
mt-2
text-sm
font-semibold
text-center
text-mbr-blue-60

md:text-base
`;

export const Description = tw.p`
max-w-md
text-sm
text-center
leading-relaxed
text-white/90

md:text-base
`;
