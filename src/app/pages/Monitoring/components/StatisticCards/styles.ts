import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
items-stretch
justify-center
flex-wrap
gap-3
z-50

md:gap-4

landscape:lg:gap-4
`;

export const Card = tw.div`
w-full
flex
flex-col
gap-2
bg-white
border
border-mbr-gray-40
rounded-xl
p-4
shadow-sm

sm:w-[calc(50%-0.375rem)]

landscape:lg:w-[calc(25%-0.75rem)]
landscape:lg:flex-1
`;

export const Header = tw.div`
flex
items-center
gap-2
`;

export const IconWrap = tw.span`
flex
items-center
justify-center
text-xl
shrink-0
`;

export const Title = tw.h3`
text-xs
font-semibold
uppercase
tracking-wide
text-mbr-gray-50
`;

export const Value = tw.p`
text-3xl
font-bold
text-mbr-blue-10
leading-tight
`;

export const Subtitle = tw.p`
text-sm
text-mbr-gray-50
`;

export const DiffRow = tw.div`
flex
items-center
flex-wrap
gap-1
mt-auto
pt-1
text-sm
`;

export const DiffValue = tw.span<{ $tone: "positive" | "negative" | "neutral" }>`
flex
items-center
gap-1
font-semibold
${(p) =>
  p.$tone === "positive"
    ? "text-green-600"
    : p.$tone === "negative"
      ? "text-red-500"
      : "text-mbr-gray-50"}
`;

export const DiffLabel = tw.span`
text-mbr-gray-50
`;

export const SkeletonCard = tw.div`
w-full
h-[140px]
rounded-xl
bg-mbr-gray-40
animate-pulse

sm:w-[calc(50%-0.375rem)]

landscape:lg:w-[calc(25%-0.75rem)]
landscape:lg:flex-1
`;
