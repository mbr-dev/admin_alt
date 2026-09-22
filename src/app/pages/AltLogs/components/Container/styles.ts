import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
w-full
h-full
flex
flex-col
bg-mbr-gray-20
p-4
pb-24
gap-4

md:p-8
md:pb-24
md:gap-6

landscape:lg:p-8
landscape:lg:pb-24
`;

export const Title = tw.h1`
text-mbr-blue-10
text-2xl
font-bold

md:text-4xl
`;

export const EmptyCard = tw.div`
w-full
rounded-2xl
bg-white
p-6
shadow-sm
text-sm
text-[#3A393A]
`;
