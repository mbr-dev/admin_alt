import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[32px]
h-[32px]
flex
items-center
justify-center
cursor-pointer
relative
z-50

md:w-[54px]
md:h-[54px]

landscape:lg:w-[54px]
landscape:lg:h-[54px]
`;

export const Flag = tw.button`
h-[32px]
cursor-pointer

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:h-[54px]

landscape:lg:h-[54px]
`;