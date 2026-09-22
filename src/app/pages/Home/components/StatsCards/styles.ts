import tw from "tailwind-styled-components";

export type TStatTone = "students" | "professionals" | "sessions" | "frequency";

export const Grid = tw.section`
w-full
grid
grid-cols-1
gap-3

sm:grid-cols-2

xl:grid-cols-4

md:gap-4
`;

export const Card = tw.article<{ $tone: TStatTone }>`
w-full
flex
items-center
gap-4
rounded-2xl
p-4
shadow-sm

md:p-5

${({ $tone }) => {
  if ($tone === "students") return "bg-[#FDF2F5]";
  if ($tone === "professionals") return "bg-[#F2F6FC]";
  if ($tone === "sessions") return "bg-[#F9FBF2]";
  return "bg-[#F6F4FA]";
}}
`;

export const IconCircle = tw.span<{ $tone: TStatTone }>`
flex
items-center
justify-center
w-12
h-12
rounded-full
shrink-0
text-xl

md:w-14
md:h-14
md:text-2xl

${({ $tone }) => {
  if ($tone === "students") return "bg-[#FBDBE3] text-[#E72766]";
  if ($tone === "professionals") return "bg-[#D7E7F8] text-[#3470B7]";
  if ($tone === "sessions") return "bg-[#DCECD9] text-[#27AA5A]";
  return "bg-[#DFC9E3] text-[#654695]";
}}
`;

export const Content = tw.div`
flex
flex-col
min-w-0
`;

export const Value = tw.strong<{ $tone: TStatTone }>`
text-2xl
font-bold
leading-tight

md:text-3xl

${({ $tone }) => {
  if ($tone === "students") return "text-[#E72766]";
  if ($tone === "professionals") return "text-[#3470B7]";
  if ($tone === "sessions") return "text-[#27AA5A]";
  return "text-[#654695]";
}}
`;

export const Label = tw.span`
text-sm
font-medium
text-[#3A393A]

md:text-base
`;

export const SkeletonCard = tw.div`
w-full
h-[88px]
rounded-2xl
bg-mbr-gray-40
animate-pulse

md:h-[104px]
`;
