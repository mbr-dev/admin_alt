import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
w-full
min-h-full
flex
flex-col
bg-mbr-gray-20
p-4
pb-10
gap-4

md:p-8
md:pb-12
md:gap-6

landscape:lg:p-8
landscape:lg:pb-12
landscape:lg:gap-6
`;

export const Main = tw.div`
w-full
max-w-[1200px]
mx-auto
flex
flex-col
gap-4

md:gap-6
`;
