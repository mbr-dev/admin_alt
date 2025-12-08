import tw from "tailwind-styled-components";

export const Main = tw.div`
overflow-hidden
flex
flex-col
justify-center
items-center
gap-4

md:gap-8
md:py-4

landscape:lg:gap-8
landscape:lg:py-4
`;

export const Button = tw.button`
w-[150px]
h-[44px]
border-2
border-mbr-blue-10
rounded-xl
text-white
text-2xl
font-bold
bg-mbr-blue-20
cursor-pointer
shadow-lg

disabled:cursor-not-allowed
`;

export const AvatarIMG = tw.div`
w-[84px]
h-[84px]
border-2
rounded-full

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[120px]
md:h-[120px]

landscape:lg:w-[120px]
landscape:lg:h-[120px]
`;