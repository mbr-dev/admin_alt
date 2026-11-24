import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
items-center
justify-center
px-4
py-[44px]
relative

md:py-[64px]

landscape:lg:py-[100px]
`;

export const Main = tw.div`
w-full
max-w-[1200px]
flex
flex-col
items-stretch
justify-center
gap-8
z-10

md:gap-10

landscape:lg:gap-10
`;

export const Section = tw.section`
w-full
flex
flex-col
gap-3
`;

export const SectionTitle = tw.h2`
text-white
text-xl
pl-1
font-bold

md:text-3xl

landscape:lg:text-3xl
`;

export const StatsGrid = tw.div`
w-full
grid
grid-cols-1
gap-3

sm:grid-cols-2

xl:grid-cols-4
`;

export const StatCard = tw.article`
w-full
flex
flex-col
gap-2
rounded-2xl
border
border-white/40
bg-white
p-4
shadow-sm
`;

export const StatLabel = tw.span`
text-xs
font-semibold
uppercase
tracking-wide
text-mbr-gray-50
`;

export const StatValue = tw.strong`
text-3xl
font-bold
text-mbr-blue-10
leading-tight
`;

export const SkeletonStatsGrid = tw.div`
w-full
grid
grid-cols-1
gap-3

sm:grid-cols-2

xl:grid-cols-4
`;

export const SkeletonCard = tw.div`
w-full
h-[108px]
rounded-2xl
bg-white/80
animate-pulse
`;

export const ListBox = tw.div`
w-full
flex
flex-col
gap-3
`;

export const EmptyBox = tw.div`
w-full
rounded-2xl
border
border-mbr-gray-30
bg-white
p-6
text-sm
text-mbr-gray-80
`;

export const SessionCard = tw.article`
w-full
rounded-2xl
border
border-white/40
bg-white
p-4
`;

export const SessionRow = tw.div`
w-full
grid
grid-cols-1
gap-3

md:grid-cols-2
xl:grid-cols-3
`;

export const SessionItem = tw.div`
flex
flex-col
`;

export const ItemLabel = tw.span`
text-xs
font-semibold
text-mbr-gray-50
`;

export const ItemValue = tw.span`
text-sm
font-medium
text-mbr-gray-80
break-words
`;

export const ActivityCard = tw.article`
w-full
flex
flex-col
gap-2
rounded-2xl
border
border-white/40
bg-white
p-4
`;

export const ActivityHeader = tw.div`
w-full
flex
flex-col
gap-1

md:flex-row
md:items-center
md:justify-between
`;

export const ActivityAction = tw.h3`
text-sm
font-bold
text-mbr-blue-10
`;

export const ActivityDate = tw.time`
text-xs
font-semibold
text-mbr-gray-50
`;

export const ActivityDescription = tw.p`
text-sm
text-mbr-gray-80
break-words
`;

export const Actions = tw.div`
w-full
flex
justify-end
`;

export const ViewMoreButton = tw.button`
h-10
px-4
rounded-xl
bg-mbr-blue-10
text-white
font-semibold
text-sm
cursor-pointer

hover:opacity-90
`;
