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

export const Toolbar = tw.div`
w-full
mt-2
flex
justify-end
print:hidden
`;

export const ExpandButton = tw.button`
text-sm
font-semibold
text-mbr-blue-10
underline-offset-2
transition-colors
hover:underline

md:text-base
`;

export const TagList = tw.div`
w-full
mt-2
flex
flex-col
gap-4
`;

export const TagCard = tw.div`
w-full
rounded-xl
border
border-mbr-gray-20
bg-white
shadow-sm
overflow-hidden
`;

export const AreaHeader = tw.button`
w-full
flex
items-center
gap-3
px-4
py-4
text-left
transition-colors
hover:bg-mbr-gray-10

md:gap-4
md:px-6
md:py-5
`;

export const TagIconBox = tw.div<{ $accent: string }>`
flex
h-11
w-11
shrink-0
items-center
justify-center
rounded-xl
bg-[#207FE6]

[&>img]:h-6
[&>img]:w-6
[&>img]:object-contain

md:h-12
md:w-12
md:[&>img]:h-7
md:[&>img]:w-7
`;

export const AreaInfo = tw.div`
flex
min-w-0
flex-1
flex-col
gap-0.5
`;

export const AreaLabel = tw.span`
text-xs
font-semibold
uppercase
text-mbr-gray-50

md:text-sm
`;

export const AreaTitle = tw.span`
text-base
font-bold
text-mbr-blue-10
truncate

md:text-lg
`;

export const AreaPercent = tw.span<{ $color: string }>`
shrink-0
text-xl
font-bold
${(p) => `color: ${p.$color};`}

md:text-2xl
`;

export const Chevron = tw(FaChevronDown)<{ $open?: boolean }>`
shrink-0
text-mbr-gray-30
transition-transform
duration-300
print:hidden
${(p) => (p.$open ? "rotate-180" : "rotate-0")}
`;

export const AreaBody = tw.div`
flex
flex-col
gap-5
px-4
pb-5
pt-2
border-t
border-mbr-gray-10
animate-opacity-0-100

md:gap-6
md:px-6
md:pb-6
`;

export const CompetencyBlock = tw.div`
flex
flex-col
gap-2
`;

export const CompetencyHeader = tw.div`
flex
items-center
justify-between
gap-3
`;

export const CompetencyName = tw.span`
text-sm
font-bold
text-mbr-gray-30

md:text-base
`;

export const CompetencyPercent = tw.span`
shrink-0
text-sm
font-bold
text-mbr-gray-30

md:text-base
`;

export const BarTrack = tw.div`
h-2
w-full
rounded-full
overflow-hidden
bg-mbr-gray-10

md:h-3
`;

export const BarFill = tw.div`
h-full
rounded-full
transition-all
duration-500
ease-out
`;

export const SkillsList = tw.ul`
mt-1
flex
flex-col
pl-1
divide-y
divide-mbr-gray-10
`;

export const SkillRow = tw.li`
flex
items-center
gap-3
py-2

first:pt-0
last:pb-0
`;

export const SkillDot = tw.span<{ $color: string }>`
h-2.5
w-2.5
shrink-0
rounded-full
${(p) => `background-color: ${p.$color};`}
`;

export const SkillName = tw.span`
min-w-0
flex-1
text-sm
text-mbr-gray-30

md:text-base
`;

export const SkillPercent = tw.span`
shrink-0
text-sm
font-semibold
text-mbr-gray-30

md:text-base
`;

export const Empty = tw.div`
w-full
mt-2
flex
items-center
justify-center
py-10
rounded-xl
border
border-mbr-gray-20
bg-mbr-gray-10

[&>p]:font-bold
[&>p]:text-mbr-blue-10
[&>p]:text-base

md:[&>p]:text-lg
`;
