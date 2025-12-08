import tw from "tailwind-styled-components";

export const Carro = tw.div`
w-[64px]
h-[64px]
absolute
animate-bounce2
-bottom-[24px]
left-[64px]
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:-bottom-[16px]
landscape:left-[200px]

md:h-[108px]
md:w-[108px]
md:-bottom-[16px]
md:left-[300px]

landscape:lg:h-[108px]
landscape:lg:w-[108px]
landscape:lg:-bootom-[32px]
landscape:lg:left-[364px]

landscape:xl:right-[200px]
`;

export const Lapis = tw.div`
h-[100px]
absolute
animate-bounce3
top-[100px]
right-[4px]
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[44px]

md:h-[150px]
md:top-[84px]
md:right-[54px]

landscape:lg:h-[150px]
landscape:lg:top-[32px]
landscape:lg:right-[8px]

landscape:xl:right-[100px]
`;

export const Nuvem1 = tw.div`
h-[54px]
absolute
bottom-8
left-0
animate-nuvem3

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:-bottom-10

md:h-[100px]
md:-bottom-3

landscape:lg:h-[100px]
landscape:lg:-bottom-2

landscape:xl:-bottom-8
`;

export const Nuvem2 = tw.div`
h-[94px]
absolute
top-[400px]
left-0
animate-nuvem1

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[250px]

md:h-[200px]

landscape:lg:h-[200px]
landscape:lg:top-[200px]

landscape:xl:top-[250px]
`;

export const Nuvem3 = tw.div`
h-[24px]
absolute
top-4
left-0
animate-nuvem2

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-5

md:h-[64px]

landscape:lg:h-[64px]
landscape:lg:top-2
`;

export const Bolha1 = tw.div`
w-[64px]
h-[64px]
absolute
bottom-[2px]
right-6
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:-bottom-4
landscape:right-20

md:h-[84px]
md:right-[48px]

landscape:lg:right-[32px]
landscape:lg:h-[100px]
landscape:lg:z-50

landscape:xl:bottom-0
landscape:xl:right-[132px]
`;

export const Bolha2 = tw.div`
w-[28px]
h-[28px]
absolute
top-[44px]
left-2
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[10px]
landscape:left-[450px]

md:h-[58px]
md:w-[58px]
md:right-[48px]

landscape:lg:top-[250px]
landscape:lg:left-[10px]
landscape:lg:h-[58px]
landscape:lg:w-[58px]
landscape:lg:z-50

landscape:xl:right-[10px]
landscape:xl:translate-x-0
`;

export const Bolha3 = tw.div`
w-[20px]
h-[20px]
absolute
top-[450px]
right-[180px]
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:left-2
md:w-[84px]
md:h-[84px]
md:left-[24px]

landscape:lg:w-[100px]
landscape:lg:h-[100px]
landscape:lg:right-[32px]
landscape:lg:top-[600px]
landscape:lg:z-50

landscape:xl:top-[350px]
landscape:xl:left-[80px]
`;