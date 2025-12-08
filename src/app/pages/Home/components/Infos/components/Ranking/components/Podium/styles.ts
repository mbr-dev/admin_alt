import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
flex-col
items-center
h-[250px]

md:h-[324px]

landscape:lg:h-[320px]

landscape:xl:h-[324px]
`;

export const Trophies = tw.div`
w-full
h-full
flex
items-end
justify-center
`;

export const Avatars = tw.div`
flex
flex-col
items-center

[&>p]:w-[86px]
[&>p]:text-sm
[&>p]:text-center
[&>p]:font-semibold
[&>p]:truncate

md:[&>p]:w-[136px]
`;

export const Avatar = tw.div`
-mt-2
w-[44px]
h-[44px]
rounded-full
border-2
border-mbr-blue-10
animate-bounce3

md:w-[64px]
md:h-[64px]

landscape:lg:w-[64px]
landscape:lg:h-[64px]
`;

export const TrophyInfo = tw.div`
flex
flex-col
items-center
gap-1
`;

export const Trophy = tw.div`
w-[88px]

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[150px]

landscape:lg:w-[136px]

landscape:xl:w-[150px]
`;

export const XPInfo = tw.div`
w-[72px]
flex
gap-1
items-center
justify-center
rounded-lg
border-2
border-mbr-orange-40
py-[2px]
px-[4px]

[&>img]:w-[18px]

[&>p]:text-[12px]
[&>p]:font-semibold
[&>p]:text-mbr-orange-40

md:w-[100px]
md:[&>p]:text-[16px]
md:[&>img]:w-[20px]

landscape:lg:w-[100px]
landscape:lg:[&>p]:text-[16px]
landscape:lg:[&>img]:w-[20px]

landscape:xl:w-[100px]
landscape:xl:[&>p]:text-[16px]
landscape:xl:[&>img]:w-[20px]
`;