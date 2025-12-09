import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
w-full
h-full
flex
flex-col
bg-mbr-gray-20
p-4
pb-10
relative

md:p-8
md:pb-15

landscape:lg:p-8
landscape:lg:pb-15
`;

export const Main = tw.div`
w-full
h-full
flex
flex-col
items-center
gap-8

landscape:lg:flex-row
landscape:lg:justify-center
landscape:lg:items-start
landscape:lg:gap-4

landscape:xl:gap-10
`;