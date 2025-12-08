import tw from "tailwind-styled-components";

export const Container = tw.div`
w-full
flex
flex-col
items-center
justify-center
gap-4
z-50

[&>h2]:text-xl
[&>h2]:font-bold

md:gap-8
md:[&>h2]:text-2xl

landscape:lg:gap-8
landscape:lg:[&>h2]:text-2xl
`;

export const Div = tw.div`
w-[300px]
p-4
bg-white
flex
gap-4
items-center
rounded-xl
shadow-xl

[&>img]:h-[64px]
[&>img]:object-contain

md:w-[292px]
md:[&>img]:h-[84px]

landscape:lg:w-[258px]
landscape:lg:[&>img]:h-[64px]

landscape:xl:w-[304px]
landscape:xl:[&>img]:h-[84px]
`;

export const DivBox = tw.div`
flex
flex-col

[&>h3]:w-[200px]
[&>h3]:flex-1
[&>h3]:font-lg
[&>h3]:truncate
[&>h3]:font-bold

[&>p]:text-sm
[&>p]:font-semibold
[&>p]:text-mbr-gray-50

md:[&>h3]:w-[172px]
md:[&>h3]:font-xl
md:[&>p]:text-base

landscape:lg:[&>h3]:w-[160px]
landscape:lg:[&>h3]:font-lg
landscape:lg:[&>p]:text-sm

landscape:xl:[&>h3]:w-[190px]
landscape:xl:[&>h3]:font-xl
landscape:xl:[&>p]:text-base
`;