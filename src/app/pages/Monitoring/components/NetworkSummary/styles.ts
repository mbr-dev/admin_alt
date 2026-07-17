import tw from "tailwind-styled-components";

export const Container = tw.section`
w-full
flex
flex-col
gap-3
bg-white
border
border-mbr-gray-40
rounded-xl
p-4
z-50
shadow-sm
`;

export const Title = tw.h3`
text-sm
font-semibold
text-mbr-gray-50
`;

export const Items = tw.div`
w-full
flex
flex-col
gap-4

sm:flex-row
sm:flex-wrap
sm:items-stretch
sm:justify-between
sm:gap-0
`;

export const Item = tw.div`
flex
items-center
gap-3
flex-1
min-w-0

sm:justify-center
sm:px-3
sm:border-r
sm:border-mbr-gray-40
sm:last:border-r-0
`;

export const IconWrap = tw.span`
flex
items-center
justify-center
text-2xl
text-mbr-gray-50
shrink-0
`;

export const Content = tw.div`
flex
flex-col
min-w-0
`;

export const Value = tw.p`
text-xl
font-bold
text-mbr-blue-10
leading-tight
tabular-nums

md:text-2xl
`;

export const Label = tw.p`
text-sm
text-mbr-gray-50
`;

export const Skeleton = tw.div`
w-full
h-[96px]
rounded-xl
bg-mbr-gray-40
animate-pulse
`;
