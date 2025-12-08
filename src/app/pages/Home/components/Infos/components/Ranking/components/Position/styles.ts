import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
h-[100px]
flex
p-3
flex-col
items-center
justify-between
rounded-xl
bg-mbr-blue-80

[&>h3]:text-white
[&>h3]:text-lg
[&>h3]:font-semibold

md:h-[118px]
md:[&>h3]:text-xl

landscape:lg:h-[118px]
landscape:lg:[&>h3]:text-xl
`;

export const Main = tw.div`
w-[240px]
h-[40px]
flex
items-center
justify-between
bg-white
relative

md:w-[400px]
md:h-[52px]

landscape:lg:w-[350px]
landscape:lg:h-[52px]

landscape:xl:w-[400px]
`;

export const Left = tw.div`
absolute
flex
items-center
gap-1
top-0
-left-[18px]

[&>p]:w-[108px]
[&>p]:truncate
[&>p]:text-sm
[&>p]:font-medium

md:-left-[24px]
md:[&>p]:w-[216px]
md:[&>p]:text-base

landscape:lg:-left-[24px]
landscape:lg:[&>p]:w-[164px]
landscape:lg:[&>p]:text-base

landscape:xl:[&>p]:w-[216px]
`;

export const Avatar = tw.div`
w-[40px]
h-[40px]
border-2
border-mbr-blue-10
rounded-full

md:w-[54px]
md:h-[54px]

landscape:lg:w-[54px]
landscape:lg:h-[54px]
`;

export const XPInfo = tw.div`
flex
gap-1
items-center
rounded-lg
justify-center
border
border-mbr-orange-40
py-[2px]
px-[4px]

[&>img]:w-[16px]

[&>p]:text-[12px]
[&>p]:font-semibold
[&>p]:text-mbr-orange-40

md:[&>img]:w-[24px]
md:border-2
md:gap-2
md:px-[6px]
md:[&>p]:text-[18px]

landscape:lg:[&>img]:w-[24px]
landscape:lg:border-2
landscape:lg:gap-2
landscape:lg:px-[6px]
landscape:lg:[&>p]:text-[18px]
`;

export const Right = tw.div`
absolute
flex
items-center
justify-center
gap-1
-top-[8px]
-right-[16px]

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:gap-0
md:-right-[32px]

landscape:lg:gap-0
landscape:lg:-right-[28px]

landscape:xl:-right-[32px]
`;

export const Medal = tw.div`
w-[58px]
h-[58px]
flex
items-center
justify-center

[&>p]:text-xl
[&>p]:font-bold
[&>p]:pb-[10px]
[&>p]:text-mbr-blue-10 

md:w-[72px]
md:h-[72px]
md:[&>p]:pb-[12px]
md:[&>p]:text-[26px]

landscape:lg:w-[72px]
landscape:lg:h-[72px]
landscape:lg:[&>p]:pb-[12px]
landscape:lg:[&>p]:text-[26px]
`;