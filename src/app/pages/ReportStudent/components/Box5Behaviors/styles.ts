import tw from "tailwind-styled-components";

export const Box5 = tw.div`
w-full
rounded-2xl
border
border-[#ec5691]/40
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
text-[#f21a6f]

sm:px-6
sm:text-base
`;

export const ChartsGrid = tw.div`
grid
grid-cols-1
gap-6
p-4

sm:p-6

lg:grid-cols-2
lg:gap-8
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
flex
w-full
shrink-0
flex-col
`;

export const ChartPlot = tw.div`
h-[240px]
w-full
shrink-0

sm:h-[260px]
`;

export const LegendRow = tw.div`
flex
flex-wrap
items-center
justify-center
gap-x-3
gap-y-2
px-1
pt-2
`;

export const LegendItem = tw.button<{ $dimmed: boolean }>`
inline-flex
max-w-full
items-center
gap-1.5
border-0
bg-transparent
p-0
text-left
text-[11px]
leading-snug
text-mbr-gray-30
cursor-pointer
transition-opacity

${({ $dimmed }) => ($dimmed ? "opacity-40" : "opacity-100")}
`;

export const LegendDot = tw.span`
inline-block
h-2
w-2
shrink-0
rounded-full
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

export const LegendHint = tw.p`
text-center
text-[11px]
text-mbr-gray-50

sm:text-xs
`;
