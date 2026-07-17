import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
flex-col
gap-4
z-50

md:flex-row
md:items-stretch
md:gap-4
`;

export const Card = tw.section`
w-full
flex
flex-col
gap-3
bg-white
border
border-mbr-gray-40
rounded-xl
p-4
shadow-sm

md:flex-1
md:p-5
`;

export const CardHeader = tw.div`
flex
items-center
gap-2
`;

export const CardTitle = tw.h3`
text-base
font-bold
text-mbr-blue-10

md:text-lg
`;

export const ChartWrapper = tw.div`
w-full
h-[280px]

md:h-[320px]
`;

export const FunnelBody = tw.div`
w-full
flex
flex-col
gap-2
py-2
`;

export const FunnelRow = tw.div`
w-full
flex
items-center
gap-2
`;

export const FunnelSegmentWrap = tw.div`
flex-1
flex
items-center
justify-center
min-w-0
`;

export const FunnelSegment = tw.div`
relative
flex
items-center
justify-center
`;

export const FunnelImage = tw.img`
w-full
h-auto
select-none
pointer-events-none
`;

export const FunnelOverlay = tw.div`
absolute
inset-0
flex
flex-col
items-center
justify-center
text-center
text-white
px-2
pointer-events-none
`;

export const FunnelValue = tw.span`
text-lg
font-bold
leading-none

md:text-2xl
`;

export const FunnelLabel = tw.span`
text-[10px]
leading-tight
mt-0.5

md:text-xs
`;

export const DiffBlock = tw.div`
w-[88px]
shrink-0
flex
flex-col
items-start
justify-center
`;

export const DiffValue = tw.span`
flex
items-center
gap-1
text-sm
font-bold
`;

export const DiffLabel = tw.span`
text-[10px]
text-mbr-gray-50
leading-tight
`;

export const Skeleton = tw.div`
w-full
h-[360px]
rounded-xl
bg-mbr-gray-40
animate-pulse

md:flex-1
`;
