import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
w-full
h-full
flex
flex-col
bg-mbr-gray-20
px-4
pt-4
gap-4
relative

md:px-8
md:pt-8
md:gap-8

landscape:lg:px-8
landscape:lg:pt-8
landscape:lg:gap-8
`;

export const Main = tw.div`
w-full
flex
flex-col
items-center

landscape:lg:flex-row
landscape:lg:justify-center
landscape:lg:items-start
landscape:lg:gap-4

landscape:xl:gap-10
`;