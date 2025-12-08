import tw from "tailwind-styled-components";

export const DidacticFrame = tw.iframe`
w-full
h-full
border-none
z-20
`;

export const ButtonClose = tw.div`
w-[36px]
h-[36px]
fixed
z-50
top-[2%]
right-[2%]

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[64px]
md:h-[64px]

landscape:l:w-[64px]
landscape:lg:h-[64px]
`;