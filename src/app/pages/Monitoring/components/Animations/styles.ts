import tw from "tailwind-styled-components";

export const Bolha = tw.div`
w-[32px]
h-[32px]
absolute
top-[24px]
right-2
z-20
animate-bolha2

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:right-10

md:w-[44px]
md:h-[44px]
md:right-20
md:top-[84px]

landscape:xl:right-[200px]
`;

export const Bolha2 = tw.div`
w-[44px]
h-[44px]
absolute
top-[255px]
left-2
animate-bolha1
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[44px]
landscape:left-1

md:w-[64px]
md:h-[64px]
md:left-14
md:top-[455px]

landscape:lg:w-[64px]
landscape:lg:h-[64px]
landscape:lg:top-[132px]
landscape:lg:left-8

landscape:xl:left-[100px]
`;

export const Bolha3 = tw.div`
w-[64px]
h-[64px]
absolute
bottom-4
right-2
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:bottom-[64px]
landscape:right-1

md:w-[100px]
md:h-[100px]
md:right-[48px]
md:bottom-[100px]

landscape:lg:w-[100px]
landscape:lg:h-[100px]
landscape:lg:right-[32px]
landscape:lg:z-50

landscape:xl:right-[132px]
`;

export const Bolha4 = tw.div`
w-[64px]
h-[64px]
absolute
bottom-[16px]
left-2
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:left-10
landscape:bottom-14

md:w-[84px]
md:h-[84px]
md:left-[64px]
md:bottom-[100px]

landscape:lg:w-[100px]
landscape:lg:h-[100px]
landscape:lg:left-[32px]

landscape:xl:left-[132px]
`;

export const Nuvem1 = tw.div`
h-[54px]
absolute
-left-[100px]
bottom-6
animate-nuvem3

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:bottom-10

md:h-[64px]
md:bottom-[100px]

landscape:lg:bottom-[50px]
`;

export const Nuvem2 = tw.div`
h-[54px]
absolute
-left-[100px]
z-0
animate-nuvem1

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:h-[64px]
md:top-[124px]

landscape:lg:top-[250px]
`;

export const Nuvem3 = tw.div`
h-[54px]
absolute
top-3
left-0
animate-nuvem2

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:h-[84px]

landscape:lg:top-5
`;

export const Nuvem4 = tw.div`
h-[32px]
absolute
top-[180px]
-left-[150px]
animate-nuvem2

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:h-[44px]
md:top-[320px]
md:-left-[132px]

landscape:lg:top-[450px]
`;

export const Pincel = tw.div`
h-[84px]
absolute
animate-bounce2
top-[364px]
left-[8px]
z-[60]

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[200px]
landscape:left-[16px]

md:h-[150px]
md:top-[650px]
md:left-4

landscape:lg:h-[150px]
landscape:lg:top-[484px]
landscape:lg:left-2

landscape:xl:left-[200px]
`;

export const Banana = tw.div`
h-[54px]
absolute
top-[12px]
left-[2px]
animate-bounce
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:left-[54px]

md:h-[72px]
md:top-[32px]
md:left-[32px]

landscape:lg:h-[100px]
landscape:lg:top-[24px]
landscape:lg:left-[32px]

landscape:xl:left-[200px]
`;

export const LetraA = tw.div`
h-[54px]
absolute
animate-bounce2
top-[994px]
right-[10px]
z-10

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[700px]

md:h-[72px]
md:top-[1384px]
md:right-[32px]

landscape:lg:h-[84px]
landscape:lg:top-[1200px]
landscape:lg:right-[40px]

landscape:xl:top-[1150px]
landscape:xl:right-[64px]
`;

export const Numero1 = tw.div`
h-[72px]
absolute
animate-bounce2
top-[284px]
right-[8px]
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:top-[64px]

md:h-[108px]
md:top-[384px]
md:right-[64px]

landscape:lg:h-[108px]
landscape:lg:top-[332px]
landscape:lg:right-[32px]

landscape:xl:top-[232px]
landscape:xl:right-[200px]
`;