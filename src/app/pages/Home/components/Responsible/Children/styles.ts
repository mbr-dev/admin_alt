import tw from "tailwind-styled-components";

export const Section = tw.section`
w-full
flex
flex-col
gap-3

md:gap-4
`;

export const Title = tw.h2`
text-base
font-bold
text-[#3A393A]

md:text-lg
`;

export const Grid = tw.div`
w-full
grid
grid-cols-1
gap-3

lg:grid-cols-2

md:gap-4
`;

export const Card = tw.article`
w-full
flex
flex-col
gap-4
rounded-2xl
bg-white
p-4
shadow-sm

md:p-5
`;

export const Header = tw.div`
flex
items-center
gap-3
min-w-0
`;

export const Initials = tw.span`
w-12
h-12
rounded-full
bg-[#FBDBE3]
text-[#E72766]
flex
items-center
justify-center
text-sm
font-bold
shrink-0
`;

export const Identity = tw.div`
flex
flex-col
min-w-0
gap-1
`;

export const Name = tw.h3`
text-base
font-bold
text-[#3A393A]
truncate

md:text-lg
`;

export const Meta = tw.p`
text-xs
text-[#3A393A]/70
break-words

md:text-sm
`;

export const ActivitiesTitle = tw.h4`
text-sm
font-semibold
text-[#3A393A]
`;

export const ActivityList = tw.ul`
w-full
flex
flex-col
divide-y
divide-[#F0EFF2]
`;

export const ActivityItem = tw.li`
flex
flex-col
gap-1
py-3
`;

export const ActivityTop = tw.div`
flex
items-start
justify-between
gap-2
`;

export const ActivityName = tw.span`
text-sm
font-semibold
text-[#3A393A]
break-words
`;

export const ActivityModule = tw.span`
text-xs
text-[#3A393A]/70
`;

export const Result = tw.span<{ $correct: boolean }>`
shrink-0
rounded-full
px-2
py-1
text-xs
font-semibold

${({ $correct }) => ($correct ? "bg-green-100 text-green-700" : "bg-[#FDEAF0] text-[#E72766]")}
`;

export const Alternatives = tw.p`
text-xs
text-[#3A393A]/80
break-words
`;

export const ActivityDate = tw.time`
text-xs
text-[#3A393A]/60
`;

export const ActivityEmpty = tw.p`
text-sm
text-[#3A393A]/70
`;

export const Empty = tw.p`
w-full
rounded-2xl
bg-white
px-4
py-8
text-center
text-sm
text-[#3A393A]/70
shadow-sm
`;

export const SkeletonCard = tw.div`
w-full
h-[220px]
rounded-2xl
bg-mbr-gray-40
animate-pulse
`;
