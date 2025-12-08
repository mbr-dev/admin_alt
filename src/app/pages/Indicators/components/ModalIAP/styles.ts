import tw from "tailwind-styled-components";

export const Main = tw.div`
w-full
flex
flex-col
justify-center
items-center
gap-4

md:w-[532px]
md:gap-8
md:py-4

landscape:lg:w-[580px]
landscape:lg:gap-4
landscape:lg:py-4
`;

export const Text = tw.p`
text-mbr-gray-30
text-base
`;

export const Div = tw.div`
w-full
p-4
rounded-xl
bg-mbr-blue-90

md:p-8

landscape:lg:p-8
`;