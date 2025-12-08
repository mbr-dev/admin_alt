import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
flex-col
bg-gradient-to-b
from-mbr-blue-30
to-mbr-blue-40
p-4
pb-10
relative

md:pb-15
md:items-center
md:justify-center

landscape:lg:pb-15
`;

export const Main = tw.div`
w-full
flex
flex-col
items-center
gap-8

landscape:gap-4

md:gap-12

landscape:lg:gap-12
`;

export const Titles = tw.div`
text-white
text-center

[&>h2]:text-xl
[&>h2]:font-bold

[&>p]:text-base

md:[&>h2]:text-4xl
md:[&>p]:text-2xl

landscape:lg:[&>h2]:text-4xl
landscape:lg:[&>p]:text-2xl
`;

export const ButtonBox = tw.div`
flex
flex-col
items-center
justify-center
gap-8
z-50

landscape:flex-row

md:flex-row
md:gap-6

landscape:lg:gap-8

landscape:xl:gap-12
`;

export const Buttons = tw.div`
w-[250px]
h-[380px]
text-white
border-2
border-white
flex
flex-col
items-center
justify-center
gap-2
rounded-xl
shadow-xl
bg-gradient-to-b
cursor-pointer
z-10

[&>img]:w-[64px]
[&>img]:object-contain

[&>p]:text-lg
[&>p]:text-center
[&>p]:font-bold

hover:scale-105
hover:transition-all ease-in-out duration-700;

landscape:w-[120px]
landscape:h-[180px]
landscape:[&>img]:w-[32px]
landscape:[&>p]:text-[10px]

md:w-[224px]
md:h-[364px]
md:gap-4
md:[&>img]:w-[64px]
md:[&>p]:text-xl

landscape:lg:w-[224px]
landscape:lg:h-[364px]
landscape:lg:gap-4
landscape:lg:[&>img]:w-[64px]
landscape:lg:[&>p]:text-xl

landscape:xl:w-[250px]
landscape:xl:h-[400px]
`;