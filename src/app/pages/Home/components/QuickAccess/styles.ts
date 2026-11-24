import tw from "tailwind-styled-components";

export type TQuickAccessTone = "unit" | "student" | "professionals" | "agenda" | "reports";

export const Section = tw.section`
w-full
flex
flex-col
gap-3

md:gap-4
`;

export const Title = tw.h2`
text-lg
font-bold
text-[#3A393A]

md:text-xl
`;

export const Grid = tw.div`
w-full
grid
grid-cols-1
gap-3

sm:grid-cols-2

lg:grid-cols-3

xl:grid-cols-5

md:gap-4
`;

export const Card = tw.button<{ $tone: TQuickAccessTone }>`
w-full
h-full
flex
flex-col
items-center
gap-3
rounded-2xl
p-5
text-center
cursor-pointer
shadow-sm

hover:opacity-90

${({ $tone }) => {
  if ($tone === "unit") return "bg-[#F9FBF2]";
  if ($tone === "student") return "bg-[#FFFAEF]";
  if ($tone === "professionals") return "bg-[#F2F6FC]";
  if ($tone === "agenda") return "bg-[#F6F4FA]";
  return "bg-[#FDF2F5]";
}}
`;

export const Icon = tw.img`
w-[64px]
h-[64px]
object-contain
mx-auto
`;

export const CardTitle = tw.span`
w-full
text-base
font-bold
text-[#3A393A]
text-center

md:text-lg
`;

export const CardSubtitle = tw.span`
w-full
text-sm
font-medium
leading-snug
text-[#3A393A]/80
text-center
flex-1
`;

export const Arrow = tw.img`
w-[30px]
h-[30px]
mt-auto
mx-auto
`;

export const SkeletonCard = tw.div`
w-full
h-[220px]
rounded-2xl
bg-mbr-gray-40
animate-pulse
`;
