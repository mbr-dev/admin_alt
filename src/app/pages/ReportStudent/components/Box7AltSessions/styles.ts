import tw from "tailwind-styled-components";

export const Box7 = tw.div`
w-full
max-h-[80dvh]
rounded-2xl
border
border-[#ec5691]/40
bg-white
shadow-sm
overflow-y-auto
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

export const Body = tw.div`
flex
flex-col
gap-4
p-4

sm:p-6
`;

export const ChartBlock = tw.div`
flex
flex-col
gap-2
`;

export const ChartMeta = tw.p`
text-center
text-xs
text-mbr-gray-50

sm:text-sm
`;

export const ChartWrap = tw.div`
h-[280px]
w-full
shrink-0

sm:h-[320px]
`;

export const CurtainBar = tw.div`
flex
flex-col
gap-2
`;

export const ExpandToggle = tw.button`
flex
w-full
items-center
justify-center
gap-2
rounded-xl
border
border-[#ec5691]/30
bg-mbr-gray-10
px-4
py-3
text-sm
font-semibold
text-[#f21a6f]
transition-colors
hover:bg-[#ec5691]/10

sm:py-3.5
`;

export const CurtainHint = tw.p`
text-center
text-xs
text-mbr-gray-50
`;

export const SessionsList = tw.div`
grid
grid-cols-1
gap-4

xl:grid-cols-2
`;

export const SessionCard = tw.article<{ $statusNorm: string; $alertVariant: "danger" | "warning" | "attention" | null }>`
w-full
rounded-xl
border
p-4

${({ $statusNorm, $alertVariant }) => {
  if ($alertVariant === "danger") return "border-red-300 bg-red-100";
  if ($alertVariant === "warning") return "border-yellow-300 bg-yellow-100";
  if ($alertVariant === "attention") return "border-orange-300 bg-orange-100";
  if ($statusNorm === "aberta") return "border-[#ec5691]/30 bg-[#ec5691]/10";
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
  if ($statusNorm === "aberta") return "bg-[#ec5691]/15 text-[#f21a6f]";
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

export const AlertLegend = tw.div`
mt-2
grid
grid-cols-1
gap-2

sm:grid-cols-3
`;

export const AlertLegendItem = tw.div`
flex
items-center
gap-2
text-xs
text-mbr-gray-50
`;

export const AlertLegendColor = tw.span<{ $variant: "red" | "yellow" | "orange" }>`
w-4
h-4
rounded-md
border
border-mbr-gray-40

${({ $variant }) => {
  if ($variant === "red") return "bg-red-100";
  if ($variant === "yellow") return "bg-yellow-100";
  return "bg-orange-100";
}}
`;
