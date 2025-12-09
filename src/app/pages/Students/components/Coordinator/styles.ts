import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
w-full
h-full
flex
flex-col
items-center
gap-4
z-40
relative

landscape:gap-2

md:gap-8

landscape:lg:gap-8
`;

export const ListData = tw.div`
w-full
flex
flex-wrap
items-start
justify-start
gap-2

md:gap-4
md:justify-center

landscape:gap-4
landscape:justify-center
`;