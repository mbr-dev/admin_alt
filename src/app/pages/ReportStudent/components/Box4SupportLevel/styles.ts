import tw from "tailwind-styled-components";

export const Box4 = tw.div`
w-full
rounded-2xl
border
border-mbr-blue-80/40
bg-white
shadow-sm
overflow-hidden
`;

export const BoxTitle = tw.h2`
border-b
border-mbr-gray-40
px-4
py-4
text-sm
font-semibold
uppercase
tracking-wide
text-mbr-blue-10

sm:px-6
sm:text-base
`;

export const ChartBody = tw.div`
p-4

sm:p-6
`;

export const ChartCard = tw.div`
flex
min-h-[280px]
flex-col
gap-3
rounded-xl
border
border-mbr-gray-40
bg-mbr-gray-10
p-4

sm:min-h-[300px]
`;

export const ChartCardTitle = tw.h3`
text-sm
font-semibold
text-mbr-gray-30

sm:text-base
`;

export const ChartCardSubtitle = tw.p`
mt-1
text-xs
leading-relaxed
text-mbr-gray-50

sm:text-sm
`;

export const ChartWrap = tw.div`
h-[280px]
w-full
shrink-0

sm:h-[300px]
`;

export const EmptyHint = tw.p`
py-10
text-center
text-sm
text-mbr-gray-50
`;

export const TooltipBox = tw.div`
max-w-xs
rounded-lg
border
border-mbr-gray-40
bg-white
px-3
py-2
text-left
text-xs
shadow-md

sm:text-sm
`;
