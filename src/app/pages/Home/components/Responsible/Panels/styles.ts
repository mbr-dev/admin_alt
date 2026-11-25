import tw from "tailwind-styled-components";

export const Section = tw.section`
w-full
grid
grid-cols-1
gap-4

lg:grid-cols-2
`;

export const Card = tw.article`
w-full
h-full
flex
flex-col
gap-4
rounded-2xl
bg-white
p-5
shadow-sm
`;

export const CardHeader = tw.div`
flex
items-center
gap-2
`;

export const SessionsIcon = tw.span`
flex
items-center
justify-center
text-xl
text-[#E72766]
shrink-0
`;

export const NoticesIcon = tw.span`
flex
items-center
justify-center
text-xl
text-[#3470B7]
shrink-0
`;

export const CardTitle = tw.h2`
text-base
font-bold
text-[#3A393A]

md:text-lg
`;

export const List = tw.div`
w-full
flex
flex-col
flex-1
min-h-[180px]
max-h-[360px]
overflow-y-auto
divide-y
divide-[#F0EFF2]
`;

export const Empty = tw.p`
w-full
flex-1
flex
items-center
justify-center
text-sm
text-[#3A393A]/70
text-center
`;

export const SessionRow = tw.div`
w-full
flex
items-center
gap-3
py-3
`;

export const TimeBadge = tw.span`
shrink-0
rounded-lg
bg-[#FDEAF0]
px-2
py-1
text-xs
font-semibold
text-[#E72766]
text-center
`;

export const SessionInfo = tw.div`
flex
flex-col
min-w-0
flex-1
`;

export const SessionStudent = tw.span`
text-sm
font-semibold
text-[#3A393A]
truncate
`;

export const SessionType = tw.span`
text-xs
text-[#3A393A]/70
truncate
`;

export const StatusTag = tw.span<{ $status: string }>`
shrink-0
px-3
py-1
rounded-full
text-xs
font-medium

${({ $status }) => {
  if ($status === "aberta") return "bg-blue-100 text-blue-700";
  if ($status === "em andamento" || $status === "em_andamento") return "bg-yellow-100 text-yellow-700";
  if ($status === "finalizada") return "bg-green-100 text-green-700";
  if ($status === "cancelada") return "bg-red-100 text-red-700";
  return "bg-mbr-gray-20 text-mbr-gray-80";
}}
`;

export const NoticeRow = tw.div`
w-full
flex
flex-col
gap-1
py-3
`;

export const NoticeTop = tw.div`
flex
items-start
justify-between
gap-2
`;

export const NoticeTitle = tw.span`
text-sm
font-bold
text-[#3A393A]
break-words
`;

export const NoticeBadge = tw.span`
shrink-0
rounded-full
bg-[#FDEAF0]
px-2
py-1
text-xs
font-semibold
text-[#E72766]
`;

export const NoticeMessage = tw.p`
text-sm
text-[#3A393A]/80
break-words
`;

export const NoticeDate = tw.time`
text-xs
text-[#3A393A]/60
`;

export const SkeletonCard = tw.div`
w-full
h-[360px]
rounded-2xl
bg-mbr-gray-40
animate-pulse
`;
