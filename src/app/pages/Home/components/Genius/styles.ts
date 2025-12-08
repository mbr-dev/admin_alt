import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
items-center
justify-center
px-4
py-[44px]
relative

md:py-[64px]

landscape:lg:py-[100px]
`;

export const Main = tw.div`
w-[280px]
h-[144px]
flex
items-center
justify-center
gap-[32px]
relative
rounded-xl
shadow-lg
z-10
bg-mbr-blue-50

[&>img]:w-[250px]
[&>img]:h-full
[&>img]:object-contain

md:w-[500px]
md:h-[250px]

landscape:lg:w-[800px]
landscape:lg:h-[350px]
landscape:lg:rounded-2xl
landscape:lg:gap-[100px]

landscape:xl:w-[1000px]
landscape:xl:h-[380px]
`;

export const Genio = tw.div`
w-[64px]
animate-bounce3

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[132px]

landscape:lg:w-[180px]

landscape:xl:w-[200px]
`;

export const Div = tw.div`
flex
flex-col
items-center
justify-center
gap-2

md:gap-4

landscape:xl:gap-8
`;

export const Genio2 = tw.div`
w-[132px]
h-[74px]

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[250px]
md:h-[150px]

landscape:lg:w-[350px]
landscape:lg:h-[200px]

landscape:xl:w-[400px]
landscape:xl:h-[232px]
`;

export const ButtonPlay = tw.button`
w-[84px]
h-[32px]
text-white
text-base
font-semibold
rounded-lg

bg-gradient-to-b
from-mbr-blue-60
to-mbr-blue-70

hover:from-mbr-blue-70
hover:to-mbr-blue-60

md:w-[150px]
md:h-[44px]
md:rounded-xl
md:text-lg

landscape:lg:w-[224px]
landscape:lg:h-[64px]
landscape:lg:text-3xl
`;