import tw from "tailwind-styled-components";

export const Box7 = tw.div`
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

export const Body = tw.div`
flex
flex-col
gap-4
p-4

sm:p-6
`;

export const SessionsList = tw.div`
flex
flex-col
gap-4
`;

export const SessionCard = tw.article<{ $statusNorm: string }>`
w-full
rounded-xl
border
p-4

${({ $statusNorm }) => {
  if ($statusNorm === "aberta") return "border-blue-200 bg-blue-50/80";
  if ($statusNorm === "em andamento") return "border-amber-200 bg-amber-50/80";
  if ($statusNorm === "finalizada") return "border-emerald-200 bg-emerald-50/80";
  if ($statusNorm === "cancelada") return "border-red-200 bg-red-50/80";
  return "border-mbr-gray-40 bg-mbr-gray-10";
}}
`;

export const SessionHeader = tw.div`
mb-3
flex
flex-wrap
items-start
justify-between
gap-2
`;

export const SessionType = tw.h3`
text-sm
font-semibold
text-mbr-gray-30

sm:text-base
`;

export const StatusBadge = tw.span<{ $statusNorm: string }>`
inline-flex
rounded-full
px-2.5
py-0.5
text-xs
font-medium

${({ $statusNorm }) => {
  if ($statusNorm === "aberta") return "bg-blue-100 text-blue-800";
  if ($statusNorm === "em andamento") return "bg-amber-100 text-amber-900";
  if ($statusNorm === "finalizada") return "bg-emerald-100 text-emerald-800";
  if ($statusNorm === "cancelada") return "bg-red-100 text-red-800";
  return "bg-mbr-gray-20 text-mbr-gray-30";
}}
`;

export const SessionGrid = tw.div`
grid
grid-cols-1
gap-3

sm:grid-cols-2
lg:grid-cols-3
`;

export const Field = tw.div`
flex
flex-col
gap-0.5
`;

export const FieldLabel = tw.span`
text-xs
font-semibold
uppercase
tracking-wide
text-mbr-gray-50
`;

export const FieldValue = tw.span`
text-sm
font-medium
text-mbr-gray-30
break-words
`;

export const EmptyHint = tw.p`
rounded-xl
border
border-mbr-gray-40
bg-mbr-gray-10
py-10
text-center
text-sm
text-mbr-gray-50
`;

export const LoadingHint = tw.p`
py-10
text-center
text-sm
text-mbr-gray-50
`;

export const MetaHint = tw.p`
text-center
text-xs
text-mbr-gray-50
`;
