import tw from "tailwind-styled-components";

export const Bolha = tw.div`
w-[44px]
h-[44px]
absolute
bottom-[100px]
left-2
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:left-[64px]
landscape:top-[224px]

md:w-[100px]
md:h-[100px]
md:bottom-[44px]
md:left-[32px]

landscape:lg:w-[100px]
landscape:lg:h-[100px]
landscape:lg:top-[380px]
landscape:lg:left-[32px]
`;

export const Bolha2 = tw.div`
w-[32px]
h-[32px]
absolute
top-[216px]
right-10
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:left-[250px]
landscape:top-[24px]

md:w-[36px]
md:h-[36px]
md:top-[28px]
md:left-[100px]

landscape:lg:w-[36px]
landscape:lg:h-[36px]
landscape:lg:top-[32px]
landscape:lg:left-[280px]

landscape:xl:left-[480px]
`;

export const Bolha3 = tw.div`
w-[32px]
h-[32px]
absolute
bottom-[16px]
right-2
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:right-[64px]
landscape:top-[208px]
landscape:z-10

md:w-[44px]
md:h-[44px]
md:bottom-[44px]
md:right-[32px]
md:z-20

landscape:lg:w-[44px]
landscape:lg:h-[44px]
landscape:lg:top-[380px]
landscape:lg:right-[32px]

landscape:xl:right-[120px]
`;

export const Nuvem1 = tw.div`
h-[54px]
absolute
-left-[100px]
bottom-3
animate-nuvem1

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:h-[100px]
md:bottom-[180px]

landscape:lg:h-[100px]
landscape:lg:bottom-[100px]
`;

export const Nuvem2 = tw.div`
h-[54px]
absolute
top-8
left-0
animate-nuvem2

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:h-[84px]

landscape:lg:h-[84px]
landscape:lg:top-2
`;

export const Pincel = tw.div`
h-[84px]
absolute
animate-bounce2
top-[194px]
left-[12px]
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[24px]
landscape:left-[24px]

md:h-[150px]
md:top-[150px]
md:left-10

landscape:lg:h-[150px]
landscape:lg:top-[84px]
landscape:lg:left-2

landscape:xl:left-[200px]
`;

export const Emoji = tw.div`
h-[54px]
absolute
animate-bounce
-bottom-[32px]
right-[100px]
z-10

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:right-1/2
landscape:-translate-x-1/2

md:h-[100px]
md:-bottom-[64px]
md:right-1/2
md:-translate-x-1/2

landscape:lg:h-[100px]
landscape:lg:-bottom-[64px]
landscape:lg:right-1/2
landscape:lg:-translate-x-1/2
`;

export const Numero1 = tw.div`
h-[72px]
absolute
animate-bounce2
top-[100px]
right-[8px]
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[64px]

md:h-[108px]
md:top-[84px]
md:right-[64px]

landscape:lg:h-[108px]
landscape:lg:top-[32px]
landscape:lg:right-[64px]

landscape:xl:right-[200px]
`;