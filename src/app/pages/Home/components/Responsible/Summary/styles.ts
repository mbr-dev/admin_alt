import tw from "tailwind-styled-components";

export type TSummaryTone = "children" | "sessions";

function cardSurface(tone: TSummaryTone) {
  if (tone === "children") return "bg-[#FDF2F5]";
  return "bg-[#F2F6FC]";
}

function accent(tone: TSummaryTone) {
  if (tone === "children") return "bg-[#FBDBE3] text-[#E72766]";
  return "bg-[#D7E7F8] text-[#3470B7]";
}

export const Grid = tw.section`
w-full
grid
grid-cols-1
gap-3

sm:grid-cols-2

md:gap-4
`;

export const Card = tw.article<{ $tone: TSummaryTone }>`
w-full
flex
items-center
gap-4
rounded-2xl
p-4
shadow-sm

md:p-5

${({ $tone }) => cardSurface($tone)}
`;

export const IconCircle = tw.span<{ $tone: TSummaryTone }>`
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

${({ $tone }) => accent($tone)}
`;

export const Content = tw.div`
flex
flex-col
min-w-0
gap-1
`;

export const Label = tw.span`
text-sm
font-medium
text-[#3A393A]

md:text-base
`;

export const Value = tw.strong<{ $tone: TSummaryTone }>`
text-2xl
font-bold
leading-tight

md:text-3xl

${({ $tone }) => ($tone === "children" ? "text-[#E72766]" : "text-[#3470B7]")}
`;

export const SkeletonCard = tw.div`
w-full
h-[88px]
rounded-2xl
bg-mbr-gray-40
animate-pulse

md:h-[104px]
`;
