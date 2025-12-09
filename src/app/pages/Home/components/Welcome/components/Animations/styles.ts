import tw from "tailwind-styled-components";

export const Banana = tw.div`
h-[54px]
absolute
top-[64px]
left-[8px]
animate-bounce
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:left-[100px]

md:h-[72px]
md:top-[150px]
md:left-[84px]

landscape:lg:h-[100px]
landscape:lg:top-[284px]
landscape:lg:left-[32px]

landscape:xl:left-[180px]
`;

export const Coracao = tw.div`
w-[54px]
h-[54px]
absolute
top-[16px]
left-1/2
-translate-x-1/2
animate-bounce2
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:lg:w-[84px]
landscape:lg:h-[84px]
landscape:lg:top-[44px]
`;

export const Bolha = tw.div`
w-[32px]
h-[32px]
absolute
top-[24px]
right-2
animate-bolha2

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:right-20

md:right-4
`;

export const Bolha2 = tw.div`
w-[44px]
h-[44px]
absolute
top-[180px]
left-2
animate-bolha1
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:left-8

md:left-3
md:top-[55px]

landscape:lg:w-[64px]
landscape:lg:h-[64px]
landscape:lg:top-[132px]

landscape:xl:left-[100px]
`;

export const Bolha3 = tw.div`
w-[64px]
h-[64px]
absolute
top-[200px]
right-2
animate-bolha3
z-20

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

landscape:right-10

md:w-[84px]
md:h-[84px]
md:right-[48px]

landscape:lg:w-[100px]
landscape:lg:h-[100px]
landscape:lg:right-[32px]
landscape:lg:z-50

landscape:xl:right-[132px]
`;

export const Nuvem1 = tw.div`
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

export const LetraA = tw.div`
h-[54px]
absolute
animate-bounce2
top-[194px]
right-[180px]
z-10

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:h-[72px]
md:top-[344px]
md:right-[320px]

landscape:lg:h-[84px]
landscape:lg:top-[500px]
landscape:lg:right-[400px]

landscape:xl:top-[524px]
`;